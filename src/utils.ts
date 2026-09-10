import { Effect, Option } from "effect";

import { OpencodeClientService } from "./opencode.js";

export const log = (level: "info" | "warn" | "error", message: string) =>
  Effect.gen(function* () {
    const opencode = yield* Effect.serviceOption(OpencodeClientService);

    if (Option.isNone(opencode)) {
      console[level](message);
      return;
    }

    yield* Effect.tryPromise(() =>
      opencode.value.app.log({
        body: { service: "langfuse", level, message },
      }),
    );
  });
