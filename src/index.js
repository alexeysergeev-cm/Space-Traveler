import "../css/reset.css";
import "../css/main.css";
import regeneratorRuntime from "regenerator-runtime";
import * as d3 from "d3";
import { startTyping } from "./Utils/startTyping";
import {
  initiateApp,
  populateNames,
  activateButton,
  newTextTransition,
  showTheSpeed,
  displayHumanStats,
  displayPlanetStats,
} from "./Utils/d3functions";
import { getPlanets } from "./Utils/devDummyData";
import { loadPlanets } from "./Utils/api";
import { generateData, spinFetchAndCache } from "./Utils/calculateData";

const NEAR = "near";
const MID = "mid";
const FAR = "far";

document.addEventListener("DOMContentLoaded", () => {
  initiateApp();
  // initiateIntro();

  //  development
  developmentMode();

  // spinFetchAndCache(JSON.parse(window.localStorage.getItem(FAR)));
});

function developmentMode() {
  initiateMain();
  const main = document.querySelector(".main-div");
  const intro = document.querySelector(".intro");
  intro.classList.add("hidden");
  main.classList.remove("hidden");
}

function initiateIntro() {
  const main = document.querySelector(".main-div");
  const intro = document.querySelector(".intro");
  const button = intro.lastElementChild;
  startTyping();
  button.addEventListener("click", () => {
    intro.classList.add("shrink");
    setTimeout(() => {
      intro.classList.add("hidden");
      main.classList.remove("hidden");
      main.classList.add("grow");
    }, 4000);
    initiateMain();
  });
}

async function initiateMain() {
  const data0 = getPlanets(NEAR);
  const data1 = getPlanets(MID);
  const data2 = getPlanets(FAR);
  populateNames(data0);

  let speed = 38000;
  let curPlanet = undefined;

  //click LEFT-SWITCH
  d3.selectAll(".left-switch")
    .selectAll("button")
    .on("click", async (e) => {
      activateButton("left", e);

      if (e.currentTarget.innerText === "< 5 parsecs") {
        data0.length && populateNames(data0);
      } else if (e.currentTarget.innerText === "5-10 parsecs") {
        data1.length && populateNames(data1);
      } else if (e.currentTarget.innerText === "10+ parsecs") {
        data2.length && populateNames(data2);
      }
    });

  //if click RIGHT-SWITCH
  d3.selectAll(".right-switch")
    .selectAll("button")
    .on("click", (e) => {
      activateButton("right", e);

      if (e.currentTarget.innerText === "The Speed of Light") {
        speed = 671000000;
        showTheSpeed(speed);
      } else if (e.currentTarget.innerText === "Voyager 1") {
        speed = 38000;
        showTheSpeed(speed);
      } else {
        speed = 27;
        showTheSpeed(speed);
      }

      if (!curPlanet || !speed) return;
      showHumanStats(curPlanet.sy_dist, speed);
    });

  const planetsList = document.getElementsByClassName("planets-list");
  if (planetsList.length) {
    planetsList[0].addEventListener("click", (e) => {
      const list = document.getElementsByClassName("planets-list")[0].children;
      d3.selectAll(list).classed("selected-pl", false);
      e.target.classList.toggle("selected-pl");

      const switches =
        document.getElementsByClassName("left-switch")[0].children;
      const plName = e.target.innerText;
      for (let i = 1; i < switches.length; i++) {
        let pl;
        if (switches[i].classList.contains("selected-btn")) {
          if (switches[i].innerText === "< 5 parsecs") {
            pl = data0.filter((planet) => plName === planet.pl_name);
          } else if (switches[i].innerText === "5-10 parsecs") {
            pl = data1.filter((planet) => plName === planet.pl_name);
          } else if (switches[i].innerText === "10+ parsecs") {
            pl = data2.filter((planet) => plName === planet.pl_name);
          }

          if (!pl[0]) return;
          newTextTransition();
          showPlanetStats(pl[0], speed);
          curPlanet = pl[0];
        }
      }
    });
  }
}

function showPlanetStats(planet, speed) {
  const data = generateData(planet, speed);
  displayPlanetStats(data);
  showHumanStats(planet.sy_dist, speed);
}

function showHumanStats(parsecDistance, speed) {
  const LightYearsInOneParsec = 3.262;
  const lightYearDistInMiles = 6 * 10e11;
  const hoursInDay = 24;
  const daysInYear = 365;
  const yearsBetweenGenerations = 30;
  const lightDistToTargetPl = parsecDistance * LightYearsInOneParsec;
  const totalMilesToDestination = lightYearDistInMiles * lightDistToTargetPl;

  let data;
  if (speed === 38000) {
    const humanYearsToReachDest =
      totalMilesToDestination / (speed * hoursInDay * daysInYear);
    const humanGenerations = humanYearsToReachDest / yearsBetweenGenerations;
    data = [humanYearsToReachDest, humanGenerations];
  } else if (speed === 27) {
    const dist = (lightDistToTargetPl / 27) * 12;
    const genAmount = dist < 30 ? 0 : dist / 30;
    data = [dist, genAmount];
  } else {
    data = [lightDistToTargetPl, lightDistToTargetPl / yearsBetweenGenerations];
  }

  displayHumanStats(data, speed);
}
