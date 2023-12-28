import { useMachine } from "@xstate/react";
import { machine } from "./machine";
import { formatMilliseconds } from "./utils";
import { Play, Pause, Square } from "lucide-react";
import { TransportButton } from "./Buttons";

export default function App() {
  const [state, send] = useMachine(machine);

  return (
    <div className="flex-y gap8">
      {state.matches("initial") && (
        <div>
          <button
            className="event-button"
            onClick={() => send({ type: "start" })}
          >
            <Play />
          </button>
        </div>
      )}

      <div className="flex gap4">
        {state.matches("running") && (
          <div>
            <TransportButton onClick={() => send({ type: "pause" })}>
              <Pause />
            </TransportButton>
          </div>
        )}
        {state.matches("paused") && (
          <TransportButton onClick={() => send({ type: "start" })}>
            <Play />
          </TransportButton>
        )}
        <TransportButton onClick={() => send({ type: "reset" })}>
          <Square />
        </TransportButton>
      </div>
      <div className="clock">
        <div className="ghost">88:88:88</div>
        {formatMilliseconds(state.context.elapsedTime)}
      </div>
    </div>
  );
}
