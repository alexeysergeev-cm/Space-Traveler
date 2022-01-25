const axios = require("axios");
import { populateNames, displaySourceDescription } from "./d3functions";
const pathToFile = "./data/planetSystemDescription.json";

export const loadPlanets = async (distance, toPopulate) => {
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

  if (!resp) return;
  const filteredPlanets = handleDups(resp);
  window.localStorage.setItem(distance, JSON.stringify(filteredPlanets));
  console.log(filteredPlanets);
  toPopulate && populateNames(filteredPlanets);
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

export const getWebsiteText = async ({ link, plName }) => {
  const data = await fetch(pathToFile)
    .then((response) => response.json())
    .then((jsonResponse) => jsonResponse);

  const json = JSON.stringify(data.planetarySysDescrip);
  window.localStorage.setItem("planetarySysDescrip", json);
  //  debugger;

  // const resp = await axios
  //   .get("/getWebsiteText", { params: { link: link, plName: plName } })
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // const result = resp.replace(/ \([\s\S]*?\)/g, "");
  // displaySourceDescription(result);
};
