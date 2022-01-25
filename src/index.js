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
  

  let speed = 38000; //default

  //click LEFT-SWITCH
  d3.selectAll(".left-switch")
    .selectAll("button")
    .on("click", async (e) => {
      activateButton("left", e);

      if (e.currentTarget.innerText === "< 5 parsecs") {
        if (data0.length) {
          populateNames(data0);
        } else {
          data0 = await loadPlanets(NEAR, true);
        }
      } else if (e.currentTarget.innerText === "5-10 parsecs") {
        if (data1.length) {
          populateNames(data1);
        } else {
          data1 = await loadPlanets(MID, true);
        }
      } else if (e.currentTarget.innerText === "10+ parsecs") {
        if (data2.length) {
          populateNames(data2);
        } else {
          data2 = await loadPlanets(FAR, true);
        }
      }
    });

  //if click RIGHT-SWITCH
  d3.selectAll(".right-switch")
    .selectAll("button")
    .on("click", (e) => {
      let ele = e.currentTarget.parentElement.classList[0];
      d3.select("." + ele)
        .selectAll("button")
        .style("background-color", "red")
        .style("box-shadow", "0 2px 2px 0px rgb(0 0 0)");
      e.currentTarget.style.backgroundColor = "rgb(90 250 13)";
      e.currentTarget.style.boxShadow = "inset 0 1px 3px 1px rgb(0 0 0)";
      e.currentTarget.style.outline = "none";

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

      //check what speed chosen
      let humanData = document.getElementsByClassName("other-data")[0].children;

      if (humanData.length === 3 && e.currentTarget.innerText === "Voyager 1") {
        let list = document.getElementsByClassName("planets-list")[0].children;

        //get distance && gerenrate data
        let distance =
          document.getElementsByClassName("planet-data")[0].children[1]
            .children[0].children[0]["__data__"];

        let lightYearDistInMiles = 6000000000000; //miles
        let speedOfLight = 671000000; //mph
        let voyagerSpeed = 38000; //mph
        let day = 24; //hrs
        let yearLength = 365; //days

        let totalMilesToDestination = lightYearDistInMiles * distance;
        let yearsToReach =
          totalMilesToDestination / (voyagerSpeed * day * yearLength);
        let humanGenerations = yearsToReach / 30; // 30 years between generations
        let humanData = [yearsToReach, humanGenerations];

        for (let item of list) {
          if (item.style.backgroundColor === "rgb(255, 140, 0)") {
            ///NOT DRY! refactor

            let switches =
              document.getElementsByClassName("left-switch")[0].children;
            for (let i = 1; i < switches.length; i++) {
              if (
                switches[i].style.backgroundColor === "rgb(90, 250, 13)" &&
                switches[i].innerText === "< 5 parsecs"
              ) {
                data0.forEach((planet) => {
                  //development
                  if (item.innerText === planet.pl_name) {
                    // showPlanetStats(planet, speed)
                    showHumanStats(humanData, speed);
                  }
                });
              } else if (
                switches[i].style.backgroundColor === "rgb(90, 250, 13)" &&
                switches[i].innerText === "5-10 parsecs"
              ) {
                data1.forEach((planet) => {
                  if (item.innerText === planet.pl_name) {
                    // showPlanetStats(planet, speed)
                    showHumanStats(humanData, speed);
                  }
                });
              } else {
                data2.forEach((planet) => {
                  if (item.innerText === planet.pl_name) {
                    // showPlanetStats(planet, speed)
                    showHumanStats(humanData, speed);
                  }
                });
              }
            }
          }
        }
      } else if (humanData.length === 3) {
        //refactor TOO MANY repetitions
        let distance =
          document.getElementsByClassName("planet-data")[0].children[1]
            .children[0].children[0]["__data__"];

        showHumanStats(distance, speed);
      }
    });

  const planetsList = document.getElementsByClassName("planets-list");
  if (planetsList.length) {
    planetsList[0].addEventListener("click", (e) => {
      const list = document.getElementsByClassName("planets-list")[0].children;
      d3.selectAll(list).classed("selected-pl", false);
      e.target.classList.toggle("selected-pl");

      const switches = document.getElementsByClassName("left-switch")[0].children;
      const plName = e.target.innerText;
      for (let i = 1; i < switches.length; i++) {
        let pl;
        if (switches[i].classList.contains("selected-btn")) {
          if (switches[i].innerText === "< 5 parsecs") {
            pl = data0.filter((planet) => plName === planet.pl_name)
          } else if (switches[i].innerText === "5-10 parsecs") {
            pl = data1.filter((planet) => plName === planet.pl_name);
          } else if (switches[i].innerText === "10+ parsecs") {
            pl = data2.filter((planet) => plName === planet.pl_name);
          }

          newTextTransition();
          pl[0] && showPlanetStats(pl[0], speed);
        }
      }
    });
  }
}

function showPlanetStats(planet, speed) {
  d3.select(".planet-data").selectAll("svg").remove();

  const data = generateData(planet, speed);

  //planet stats
  const width = document.querySelector(".planet-data").offsetWidth - 6;
  const height = document.querySelector(".planet-data").offsetHeight - 36;
  let scaleFactor = 10;
  let barHeight = 50;

  let scale1 = d3.scaleLinear().domain([1, 100]).range([50, 500]);

  let graph = d3
    .select(".planet-data-svg")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  let bar = graph
    .selectAll("g")
    .data(data["planetData"])
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      if (i === 0) {
        return "translate(0, 25)";
      } else if (i === 1) {
        return "translate(0, 95)";
      } else if (i === 2) {
        return "translate(0, 165)";
      } else if (i === 3) {
        return "translate(0, 245)";
      }
    });

  bar
    .append("rect")
    .attr("height", barHeight - 10)
    .transition()
    .ease(d3.easeLinear)
    .duration(500)
    .attr("width", function (d) {
      return d * scaleFactor;
      // return scale1(d);
    })
    .attr("fill", "rgb(139, 0, 139)")
    .attr("filter", "drop-shadow(0px 2px 2px black)");

  bar
    .append("text")
    .attr("x", 3)
    .attr("y", -12)
    .attr("dy", ".35em")
    .attr("font-size", "18px")
    .attr("font-family", "sans-serif")
    .style("fill", "white")
    .style("letter-spacing", "1px")
    .attr("filter", "drop-shadow(0px 2px 2px black)")
    .text(function (d, i) {
      if (i === 0) {
        return "Distance to the target planet (light years)";
      } else if (i === 1) {
        return "Number of planets in the planetary system";
      } else if (i === 2) {
        return "Orbital period (days)";
      } else if (i === 3) {
        return "Planet mass estimate (measured in Earth masses)";
      }
    });

  bar
    .append("text")
    .attr("x", 5)
    .attr("y", barHeight / 2)
    .attr("font-size", "16px")
    .attr("font-family", "sans-serif")
    .style("fill", "white")
    .text(function (d, i) {
      if (i === 0 || i === 3) {
        return d.toFixed(2);
      } else {
        return parseInt(d);
      }
    });

  d3.select(".misc").selectAll("p").remove();

  let misc = d3
    .select(".misc")
    .selectAll("p")
    .data([data["lastPlanetUpdate"]])
    .enter()
    .append("p")
    .text(function (d) {
      return d;
    });

  d3.select(".facility").selectAll("p").remove();

  let facil = d3
    .select(".facility")
    .selectAll("p")
    .data([data["discoveryFacility"]])
    .enter()
    .append("p")
    .text(function (d) {
      return d;
    });

  //show human-related data
  let calcBySpeed = document.getElementsByClassName("speed")[0].innerText;
  if (calcBySpeed === "38,000 mph") {
    showHumanStats(data["humanData"], speed);
  } else {
    showHumanStats(data["planetData"][0], speed);
  }
}

//on speed click
function showHumanStats(distance, speed) {
  let scaleFactor = 10;
  let barHeight = 50;

  if (distance.length > 1) {
    let scale = d3.scaleLinear().domain([2000, 770000]).range([50, 490]);

    d3.select(".other-data").selectAll("svg").remove();

    let otherWidth = 500;
    let otherHeight = 155;

    let graph2 = d3
      .select(".human-data-svg")
      .append("svg")
      .attr("width", otherWidth)
      .attr("height", otherHeight);

    let bar2 = graph2
      .selectAll("g")
      .data(distance)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        if (i === 0) {
          return "translate(0,25)";
        } else if (i === 1) {
          return "translate(0,100)";
        } else if (i === 2) {
          return "translate(0,155)";
        }
      });

    bar2
      .append("rect")
      .attr("height", barHeight - 1)
      .transition()
      .ease(d3.easeLinear)
      .duration(500)
      .attr("width", function (d) {
        return scale(d);
      })
      .attr("fill", "darkmagenta")
      .attr("filter", "drop-shadow(0px 2px 2px black)");

    bar2
      .append("text")
      .attr("x", 3)
      .attr("y", -12)
      .attr("dy", ".35em")
      .attr("font-size", "18px")
      .attr("font-family", "sans-serif")
      .style("fill", "white")
      .style("letter-spacing", "1px")
      .attr("filter", "drop-shadow(0px 2px 2px black)")
      .text(function (d, i) {
        if (i === 0) {
          return "Flight time to the target planet (years)";
        } else if (i === 1) {
          return "Generations amount to the target planet";
        }
      });

    bar2
      .append("text")
      .attr("x", 5)
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .attr("font-size", "16px")
      .attr("font-family", "sans-serif")
      .style("fill", "white")
      .text(function (d, i) {
        if (i === 0) {
          return parseInt(d).toLocaleString();
        } else if (i === 1) {
          return parseInt(d).toLocaleString();
        }
      });
  } else if (speed > 40000) {
    let genAmount = distance / 30;

    let scale = d3.scaleLinear().domain([10, 100]).range([50, 490]);

    d3.select(".other-data").selectAll("svg").remove();

    let otherWidth = 500;
    let otherHeight = 155;

    let graph2 = d3
      .select(".human-data-svg")
      .append("svg")
      .attr("width", otherWidth)
      .attr("height", otherHeight);

    let bar2 = graph2
      .selectAll("g")
      .data([distance, genAmount])
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        if (i === 0) {
          return "translate(0,25)";
        } else if (i === 1) {
          return "translate(0,100)";
        } else if (i === 2) {
          return "translate(0,155)";
        }
      });

    bar2
      .append("rect")
      .attr("height", barHeight - 1)
      .transition()
      .ease(d3.easeLinear)
      .duration(500)
      .attr("width", function (d) {
        return scale(d);
      })
      .attr("fill", "darkmagenta")
      .attr("filter", "drop-shadow(0px 2px 2px black)");

    bar2
      .append("text")
      .attr("x", 3)
      .attr("y", -12)
      .attr("dy", ".35em")
      .attr("font-size", "18px")
      .attr("font-family", "sans-serif")
      .style("fill", "white")
      .style("letter-spacing", "1px")
      .attr("filter", "drop-shadow(0px 2px 2px black)")
      .text(function (d, i) {
        if (i === 0) {
          return "Flight time to the target planet (years)";
        } else if (i === 1) {
          return "Generations amount to the target planet";
        }
      });

    bar2
      .append("text")
      .attr("x", 5)
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .attr("font-size", "16px")
      .attr("font-family", "sans-serif")
      .style("fill", "white")
      .text(function (d, i) {
        if (i === 0) {
          return d.toFixed(2);
        } else if (i === 1) {
          return parseInt(d).toLocaleString();
        }
      });
  } else if (speed === 27) {
    let newDistance = (distance / 27) * 12;

    let genAmount;
    if (newDistance < 30) {
      genAmount = 0;
    } else {
      genAmount = newDistance / 30;
    }

    let scale = d3.scaleLinear().domain([0, 10]).range([10, 100]);

    d3.select(".other-data").selectAll("svg").remove();

    let otherWidth = 500;
    let otherHeight = 155;

    let graph2 = d3
      .select(".human-data-svg")
      .append("svg")
      .attr("width", otherWidth)
      .attr("height", otherHeight);

    let bar2 = graph2
      .selectAll("g")
      .data([newDistance, genAmount])
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        if (i === 0) {
          return "translate(0,25)";
        } else if (i === 1) {
          return "translate(0,100)";
        } else if (i === 2) {
          return "translate(0,155)";
        }
      });

    bar2
      .append("rect")
      .attr("height", barHeight - 1)
      .transition()
      .ease(d3.easeLinear)
      .duration(500)
      .attr("width", function (d) {
        return scale(d);
      })
      .attr("fill", "darkmagenta")
      .attr("filter", "drop-shadow(0px 2px 2px black)");

    bar2
      .append("text")
      .attr("x", 3)
      .attr("y", -12)
      .attr("dy", ".35em")
      .attr("font-size", "18px")
      .attr("font-family", "sans-serif")
      .style("fill", "white")
      .style("letter-spacing", "1px")
      .attr("filter", "drop-shadow(0px 2px 2px black)")
      .text(function (d, i) {
        if (i === 0) {
          return "Flight time to the target planet (months)";
        } else if (i === 1) {
          return "Generations amount to the target planet";
        }
      });

    bar2
      .append("text")
      .attr("x", 5)
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .attr("font-size", "16px")
      .attr("font-family", "sans-serif")
      .style("fill", "white")
      .text(function (d, i) {
        if (i === 0) {
          return d.toFixed(2);
        } else if (i === 1) {
          return parseInt(d).toLocaleString();
        }
      });
  }
}
