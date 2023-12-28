import { interval, animationFrameScheduler } from "rxjs";
import { start, Transport as t } from "tone";
import { createMachine, assign, fromObservable } from "xstate";
import { formatMilliseconds } from "./utils";

export const machine = createMachine(
  {
    context: {
      elapsedTime: 0,
    },
    id: "stopWatch",
    initial: "paused",
    states: {
      initial: {
        on: {
          start: {
            target: "running",
          },
        },
      },
      running: {
        invoke: {
          src: "tickerActor",
          id: "start.ticker",
          onSnapshot: {
            actions: assign(() => {
              const elapsedTime = t.seconds;
              return {
                elapsedTime,
              };
            }),
          },
        },
        on: {
          pause: {
            target: "paused",
            actions: () => t.pause(),
          },
          reset: {
            target: "paused",
            actions: assign(({ context }) => {
              context.elapsedTime = 0;
              t.stop();
            }),
          },
        },
      },
      paused: {
        on: {
          start: {
            target: "running",
            actions: () => t.start(),
          },
          reset: {
            target: "paused",
            actions: assign(({ context }) => {
              context.elapsedTime = 0;
              t.stop();
            }),
          },
        },
      },
    },
    types: {
      events: {} as { type: "start" } | { type: "pause" } | { type: "reset" },
      context: {} as { elapsedTime: number; startTime: number },
    },
  },
  {
    actions: {},
    actors: {
      tickerActor: fromObservable(() => interval(0, animationFrameScheduler)),
    },
    guards: {},
    delays: {},
  }
);
