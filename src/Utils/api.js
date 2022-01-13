const axios = require("axios");
import { populateNames } from "./functions";

export const loadPlanets = async (distance) => {
  distance =
    distance === "near"
      ? "sy_dist+<+5"
      : distance === "mid"
      ? "sy_dist+>+5+and+sy_dist+<+10"
      : "sy_dist+>+11+and+sy_dist+<+20";
      
  const resp = await axios
    .get("/loadPlanets", { params: { distance: distance } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  populateNames(resp);
  return resp;
};
