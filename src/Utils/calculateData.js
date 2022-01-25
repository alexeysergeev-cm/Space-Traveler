import { getWebsiteText } from "./api";
import { displaySourceDescription } from "./d3functions";

export const generateData = (planet, speed) => {
  const data = {};

  const LightYearsInOneParsec = 3.262;
  const earthMassToJup = 0.00314;
  const lightYearDistInMiles = 6 * 10e11;
  const speedOfLightInMiles = 671 * 10e5;
  const voyagerSpeedInMiles = 38e3;
  const hoursInDay = 24;
  const daysInYear = 365;
  const yearsBetweenGenerations = 30;

  const lastPlanetUpdate = planet.rowupdate;
  const discoveryFacility = planet.disc_facility;
  const planetData = [
    planet.sy_dist * LightYearsInOneParsec,
    planet.sy_pnum,
    planet.pl_orbper,
    planet.pl_bmassj / earthMassToJup,
  ];
  const totalMilesToDestination = lightYearDistInMiles * planetData[0];
  const humanYearsToReachDest =
    totalMilesToDestination / (voyagerSpeedInMiles * hoursInDay * daysInYear);
  const humanGenerations = humanYearsToReachDest / yearsBetweenGenerations;
  const humanData = [humanYearsToReachDest, humanGenerations];

  data["planetData"] = planetData;
  data["humanData"] = humanData;
  data["lastPlanetUpdate"] = lastPlanetUpdate;
  data["discoveryFacility"] = discoveryFacility;
  data["plSystemDescription"] = getPlanetDescription(planet);
  return data;
};

function getPlanetDescription(planet) {
  extractText(planet);
  // if (!data["plSystemDescription"]) {
  //   data["plSystemDescription"] = extractText(planet.pl_refname);
  // } else {
  //   displaySourceDescription(data["plSystemDescription"]);
  // }
}

function extractText(planet) {
  const ref = planet.pl_refname;
  const start = ref.indexOf("https");
  const end = ref.indexOf("abstract") + 8;
  const link = ref.slice(start, end);
  const plName = planet.pl_name;
  getWebsiteText({ link, plName });
}


export const spinFetchAndCache = (arr) => {
  arr.forEach(pl => extractText(pl))
  console.log("DANZO")
}