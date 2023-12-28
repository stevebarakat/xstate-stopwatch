import { useMachine } from "@xstate/react";
import { stopwatchMachine } from "./machine";

export default function App() {
  const [state, send] = useMachine(stopwatchMachine);

  console.log("state.context", state.context);

  return (
    <div className="App">
      <div>
        {state.matches("stopped") && (
          <div>
            <div className="state-key">stopped</div>

            <div>
              <button
                className="event-button"
                onClick={() => send({ type: "start" })}
              >
                start
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
                pause
              </button>
              <button
                className="event-button"
                onClick={() => send({ type: "reset" })}
              >
                reset
              </button>
            </div>
            {state.context.currentTime}
          </div>
        )}
      </div>
    </div>
  );
}
