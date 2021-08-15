import countriesWithBorders from "./countries-with-borders.json";

const questions = countriesWithBorders.map((el) => {
  return {
    question: `What countries border ${el.country}?`,
    answer: el.neighbors.map((n) => n.country)
  };
});

export default questions;
