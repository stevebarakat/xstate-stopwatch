import { useMachine } from "@xstate/react";
import { machine } from "./machine";

export default function App() {
  const [state, send] = useMachine(machine);

  console.log("state.context.elapsedTime", state.context.elapsedTime);

  return (
    <div className="App">
      <div>
        <div className="state-key"></div>

        <div></div>

        {state.matches("initial") && (
          <div>
            <div className="state-key">initial</div>

            <div>
              <button
                className="event-button"
                onClick={() => send({ type: "PRESS_START" })}
              >
                PRESS_START
              </button>
            </div>
          </div>
        )}

        {state.matches("running") && (
          <div>
            <div className="state-key">running</div>

            <div>
              <button
                className="event-button"
                onClick={() => send({ type: "PRESS_STOP" })}
              >
                PRESS_STOP
              </button>
              <button
                className="event-button"
                onClick={() => send({ type: "TICK" })}
              >
                TICK
              </button>
              <button
                className="event-button"
                onClick={() => send({ type: "PRESS_LAP" })}
              >
                PRESS_LAP
              </button>
            </div>
          </div>
        )}

        {state.matches("paused") && (
          <div>
            <div className="state-key">paused</div>

            <div>
              <button
                className="event-button"
                onClick={() => send({ type: "PRESS_START" })}
              >
                PRESS_START
              </button>
              <button
                className="event-button"
                onClick={() => send({ type: "PRESS_RESET" })}
              >
                PRESS_RESET
              </button>
            </div>
          </div>
        )}

        <pre>{JSON.stringify(state.context, null, 2)}</pre>
      </div>
    </div>
  );
}
