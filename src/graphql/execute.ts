import type { ExecutionResult } from "graphql";
import type { TypedDocumentString } from "./generated/graphql";

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const res = await fetch(`${process.env.API}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    throw new Error(`Bad Network Response: ${res.status}`);
  }

  return res.json() as ExecutionResult<TResult>;
}
