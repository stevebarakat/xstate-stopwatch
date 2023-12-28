import { interval, animationFrameScheduler } from "rxjs";
import { createMachine, assign, fromObservable } from "xstate";
import { formatMilliseconds } from "./utils";

export const machine = createMachine(
  {
    context: {
      elapsedTime: 0,
      laps: [],
    },
    id: "stopWatch",
    initial: "initial",
    states: {
      initial: {
        on: {
          PRESS_START: {
            target: "running",
          },
        },
      },
      running: {
        invoke: {
          src: "tickerActor",
          id: "start.ticker",
          onSnapshot: {
            actions: assign({
              elapsedTime: ({ context }) => {
                return (context.elapsedTime += 20);
              },
              laps: ({ context }) => {
                const laps = context.laps;
                const latestLap = laps[laps.length - 1] ?? {
                  startTime: 0,
                  elapsedTime: 0,
                };
                if (laps.length === 0) {
                  laps.push(latestLap);
                }
                latestLap.elapsedTime =
                  context.elapsedTime - latestLap.startTime;
                return laps;
              },
            }),
          },
        },
        on: {
          PRESS_STOP: {
            target: "paused",
          },
          TICK: {
            actions: assign({
              elapsedTime: ({ context }) => {
                return (context.elapsedTime += 20);
              },
              laps: ({ context }) => {
                const laps = context.laps;
                const latestLap = laps[laps.length - 1] ?? {
                  startTime: 0,
                  elapsedTime: 0,
                };
                if (laps.length === 0) {
                  laps.push(latestLap);
                }
                latestLap.elapsedTime =
                  context.elapsedTime - latestLap.startTime;
                return laps;
              },
            }),
          },
          PRESS_LAP: {
            actions: assign({
              laps: ({ context }) => {
                const laps = context.laps;
                const newLap = {
                  startTime: context.elapsedTime,
                  elapsedTime: 0,
                };
                laps.push(newLap);
                return laps;
              },
            }),
          },
        },
      },
      paused: {
        on: {
          PRESS_START: {
            target: "running",
          },
          PRESS_RESET: {
            target: "initial",
            actions: assign({
              elapsedTime: ({ context }) => {
                return (context.elapsedTime = 0);
              },
              laps: ({ context }) => {
                return (context.laps = []);
              },
            }),
          },
        },
      },
    },
    types: {
      events: {} as
        | { type: "PRESS_START" }
        | { type: "PRESS_STOP" }
        | { type: "TICK" }
        | { type: "PRESS_LAP" }
        | { type: "PRESS_RESET" },
      context: {} as { elapsedTime: number; laps: unknown[] },
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
