const constants = {
  API_THIS: "foo",
  API_THAT: "bar",
};

export const renderObject = (obj, markup) => {
  const accumulator = [];
  for (const [key, value] of Object.entries(process.env)) {
    accumulator.push(markup);
  }
  return accumulator;
};

export default constants;
