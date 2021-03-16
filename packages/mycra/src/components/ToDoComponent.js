/**
 * useFetch
 * Basic Usage Auto-Managed State
 * This fetch is run onMount/componentDidMount.
 * The last argument [] means it will run onMount.
 * If you pass it a variable like [someVariable],
 * it will run onMount and again whenever
 * someVariable changes values (aka onUpdate).
 * If no method is specified, GET is the default.
 *
 * That means it works with SSR (server side rendering).
 *
 */

import useFetch from "./hooks/useFetch";

function Todos() {
  const options = {}; // these options accept all native `fetch` options
  // the last argument below [] means it will fire onMount (GET by default)
  const { loading, error, data = [] } = useFetch(
    "https://example.com/todos",
    options,
    []
  );
  return (
    <>
      {error && "Error!"}

      {loading && "Loading..."}
      {data.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </>
  );
}
