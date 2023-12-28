import { interval, animationFrameScheduler } from "rxjs";
import { createActorContext } from "@xstate/react";
import { assign, createMachine, fromObservable } from "xstate";
import { formatMilliseconds } from "./utils";

export const stopwatchMachine = createMachine(
  {
    id: "stopwatch",
    initial: "stopped",
    context: {
      startTime: undefined,
      currentTime: "00:00:00",
    },
    states: {
      stopped: {
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
            actions: assign(({ context }) => {
              if (!context.startTime) return;
              const currentTime = formatMilliseconds(
                (Date.now() - context.startTime) / 1000
              );
              return {
                currentTime,
              };
            }),
          },
        },
        on: {
          pause: {
            target: "stopped",
            actions: assign(({ context }) => {
              context.startTime = Date.now();
              return {
                startTime: Date.now(),
              };
            }),
          },
          reset: {
            target: "stopped",
          },
        },
      },
    },
    types: {
      events: {} as { type: "pause" } | { type: "reset" } | { type: "start" },
    },
  },
  {
    actors: {
      tickerActor: fromObservable(() => interval(0, animationFrameScheduler)),
    },
  }
);

export const StopwatchContext = createActorContext(stopwatchMachine);
