const axios = require("axios");
import { populateNames } from "./d3functions";

export const loadPlanets = async (distance) => {
  const queryDistance =
    distance === "near"
      ? "sy_dist+<+5"
      : distance === "mid"
      ? "sy_dist+>+5+and+sy_dist+<+10"
      : "sy_dist+>+11+and+sy_dist+<+20";

  const resp = await axios
    .get("/loadPlanets", { params: { distance: queryDistance } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  const filteredPlanets = handleDups(resp);
  // console.log(filteredPlanets);
  populateNames(filteredPlanets);
  return filteredPlanets;
};

function handleDups(data) {
  const filteredPlanets = {};
  data.forEach((item) => {
    const validValuesLen = countValidValues(item);
    if (!filteredPlanets[item.pl_name]) {
      filteredPlanets[item.pl_name] = item;
    } else if (
      validValuesLen > countValidValues(filteredPlanets[item.pl_name])
    ) {
      filteredPlanets[item.pl_name] = item;
    }
  });
  return Object.values(filteredPlanets);
}

function countValidValues(obj) {
  return Object.values(obj).filter((el) => el !== null).length;
}

export const getWebsiteText = async (link) => {
  const resp = await axios
    .get("/getWebsiteText", { params: { link: link } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

    // debugger
};
