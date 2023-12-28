import { useMachine } from "@xstate/react";
import { machine } from "./machine";
import { formatMilliseconds } from "./utils";

export default function App() {
  const [state, send] = useMachine(machine);

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
                onClick={() => send({ type: "start" })}
              >
                START
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
                onClick={() => send({ type: "pause" })}
              >
                PAUSE
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
                onClick={() => send({ type: "start" })}
              >
                START
              </button>
              <button
                className="event-button"
                onClick={() => send({ type: "reset" })}
              >
                RESET
              </button>
            </div>
          </div>
        )}
        <div className="clock">
          <div className="ghost">88:88:88</div>
          {formatMilliseconds(state.context.elapsedTime)}
        </div>
      </div>
    </div>
  );
}
