import "../css/reset.css";
import "../css/main.css";
import regeneratorRuntime from "regenerator-runtime";
import * as d3 from "d3";
import { selectAll } from "d3";
const axios = require("axios");

document.addEventListener("DOMContentLoaded", () => {
  d3.select("body")
    .transition()
    .duration(2000)
    .ease(d3.easeCubic)
    .style("background-color", "black");

  d3.select("h1")
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .style("color", "white");

  // continueButton();
  loadDefaultData()         //  development
});

function continueButton() {
  const main = document.getElementsByClassName("main-div");
  main[0].classList.add("hidden");

  const intro = document.getElementsByClassName("intro");
  intro[0].classList.remove("hidden");
  startType();

  let button = intro[0].lastElementChild;
  button.addEventListener("click", () => {
    intro[0].classList.add("shrink");

    setTimeout(() => {
      main[0].classList.remove("hidden");
      main[0].classList.add("grow");
      intro[0].classList.add("hidden");
    }, 4000);

    mainPageTransition();
    loadDefaultData();
  });
}

let arrNumCount = 0;
let charCount = 0;
let arr = [
  "There are roughly 30 years between generations. So 2000 years equals approximately 56 generations.",
  "A global average human life expectancy is 72.6 years.",
  "The earth's orbital period is 365 days.",
  "Distance: 1 parsec = 4.24 light years.",
  "Voyager 1 speed = 38,000 mph.",
  "The speed of light 671,000,000 mph.",
  "The fastest human spaceflight reached a top speed of 24,791 mph. That's 1/27,000 the speed of light and the fastest any human beings have ever traveled.",
  "This app gives you a prospective on what it takes to reach another planet that is outside of our solar system.",
  "😳",
];

function startType() {
  if (arrNumCount < arr.length) {
    let li = document.createElement("li");
    document.getElementById("rel-info").appendChild(li);
    actualType();
  }
}

function actualType() {
  if (charCount < arr[arrNumCount].length) {
    let letter = arr[arrNumCount].charAt(charCount);
    document.getElementById("rel-info").lastChild.textContent += letter;
    charCount++;
    setTimeout(actualType, 20);
  } else if (charCount === arr[arrNumCount].length) {
    arrNumCount++;
    charCount = 0;
    startType();
  }
}

function mainPageTransition() {
  d3.select("rect")
    .transition()
    .ease(d3.easeLinear)
    .duration(3000)
    .attr("fill", "blue");
}

async function loadDefaultData() {
  //store data from api request
  let data0 = [];
  let data1 = [];
  let data2 = [];

  // load Default data
  data0 = await loadNear();
  // debugger
  //all btns
  d3.select(".left-switch")
    .selectAll("button")
    .style("background-color", "red");
  d3.select(".right-switch")
    .selectAll("button")
    .style("background-color", "red");

  //default btn green
  d3.select(".left-switch")
    .select("button")
    .style("background-color", "rgb(90 250 13)")
    .style("box-shadow", "inset 0 1px 3px 1px rgb(0 0 0)");
  d3.select(".right-switch")
    .select("button")
    .style("background-color", "rgb(90 250 13)")
    .style("box-shadow", "inset 0 1px 3px 1px rgb(0 0 0)");

  // development dummy variable
  //   let data = [{dec: "-62.679485", dec_str: "-62d40m46.1s", gaia_gmag: "8.954", gaia_gmagerr: "", gaia_gmaglim: "0", pl_bmassj: "0.00400", pl_bmassjerr1: "0.00060",
  //   pl_bmassjerr2: "-0.00053",pl_bmassjlim: "0",pl_bmassn: "1",pl_bmassprov: "Msini",pl_controvflag: "0",pl_dens: "",pl_denserr1: "",pl_denserr2: "",pl_denslim: "",
  // pl_densn: "0",pl_discmethod: "Radial Velocity",pl_facility: "European Southern Observatory",pl_hostname: "Proxima Cen",pl_k2flag: "0",pl_kepflag: "0",pl_letter: "b",
  // pl_name: "Proxima Cen b",pl_nnotes: "0",pl_orbeccen: "0.350000",pl_orbeccenerr1: "",pl_orbeccenerr2: "",pl_orbeccenlim: "1",pl_orbeccenn: "2",pl_orbincl: "",pl_orbinclerr1: "",
  // pl_orbinclerr2: "",pl_orbincllim: "",pl_orbincln: "0",pl_orbper: "11.18600000",pl_orbpererr1: "0.00100000",pl_orbpererr2: "-0.00200000",pl_orbperlim: "0",pl_orbpern: "2",pl_orbsmax: "0.048500",
  // pl_orbsmaxerr1: "0.004100",pl_orbsmaxerr2: "-0.005100",pl_orbsmaxlim: "0",pl_orbsmaxn: "1",pl_pnum: "1",pl_radj: "",pl_radjerr1: "",pl_radjerr2: "",pl_radjlim: "",pl_radn: "0",pl_ttvflag: "0",
  // ra: "217.428955",ra_str: "14h29m42.95s",rowupdate: "2016-08-25",st_decerr: "0.000004",st_dist: "1.30",st_disterr1: "0.00",st_disterr2: "-0.00",st_distlim: "0",st_distn: "3",st_mass: "0.12",st_masserr1: "0.01",
  // st_masserr2: "-0.01",st_masslim: "0",st_massn: "2",st_optband: "V (Johnson)",st_optmag: "11.110",st_optmagerr: "",st_optmaglim: "0",st_posn: "4",st_rad: "0.14",st_raderr1: "0.02",
  // st_raderr2: "-0.02",st_radlim: "0",st_radn: "2",st_raerr: "0.000004",st_teff: "3050.00",st_tefferr1: "100.00",st_tefferr2: "-100.00",st_tefflim: "0",st_teffn: "2"}]

  //   d3.select(".planets-list")
  //     .selectAll("p")
  //     .data(data)
  //     .enter().append("p")
  //     .text(function(d) { return d.pl_name });

  //selecting distance
  let speed = 38000; //default

  //click LEFT-SWITCH
  d3.selectAll("button").on("click", async (e) => {
    let ele = e.currentTarget.parentElement.classList[0];
    d3.select("." + ele)
      .selectAll("button")
      .style("background-color", "red")
      .style("box-shadow", "0 2px 2px 0px rgb(0 0 0)");
    e.currentTarget.style.backgroundColor = "rgb(90 250 13)";
    e.currentTarget.style.boxShadow = "inset 0 1px 3px 1px rgb(0 0 0)";
    e.currentTarget.style.outline = "none";

    if (e.currentTarget.innerText === "< 5 parsecs") {
      if (data0.length) {
        populateNames(data0);
      } else {
        data0 = await loadNear();
      }
    } else if (e.currentTarget.innerText === "5-10 parsecs") {
      if (data1.length) {
        populateNames(data1);
      } else {
        data1 = await loadMedium();
      }
    } else if (e.currentTarget.innerText === "10+ parsecs") {
      if (data2.length) {
        populateNames(data1);
      } else {
        data2 = await loadFar();
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

      if (humanData.length === 2 && e.currentTarget.innerText === "Voyager 1") {
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
      } else if (humanData.length === 2) {
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
      let list = document.getElementsByClassName("planets-list")[0].children;
      for (let item of list) {
        if (item.style.backgroundColor === "rgb(255, 140, 0)") {
          item.style.backgroundColor = "";
        }
      }
      e.target.style.backgroundColor = "rgb(255, 140, 0)";

      let switches = document.getElementsByClassName("left-switch")[0].children;
      for (let i = 1; i < switches.length; i++) {
        if (
          switches[i].style.backgroundColor === "rgb(90, 250, 13)" &&
          switches[i].innerText === "< 5 parsecs"
        ) {
          data0.forEach((planet) => {
            // development
            if (e.target.innerText === planet.pl_name) {
              showPlanetStats(planet, speed);
            }
          });
        } else if (
          switches[i].style.backgroundColor === "rgb(90, 250, 13)" &&
          switches[i].innerText === "5-10 parsecs"
        ) {
          data1.forEach((planet) => {
            if (e.target.innerText === planet.pl_name) {
              showPlanetStats(planet, speed);
            }
          });
        } else {
          data2.forEach((planet) => {
            if (e.target.innerText === planet.pl_name) {
              showPlanetStats(planet, speed);
            }
          });
        }
      }
    });
  }

  const fact = document.getElementById("random-fact");
  fact.addEventListener("click", (e) => {
    e.target.style.backgroundColor = "rgb(232 111 104)";

    runFacts();
  });
}

async function loadNear() {
  // let arr = await d3.csv('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&where=st_dist<5&order=st_dist') // default nasa api
  // let arr = await d3.csv(
  //   "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+ps+where=st_dist<5+and+order=st_dist&format=csv"
  // ); // default nasa api
  // let arr = await d3.csv(
  //   "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,pl_masse,ra,dec+from+ps+where+upper(soltype)+like+'%CONF%'+and+pl_masse+between+0.5+and+2.0&format=csv"
  // ); // default nasa api
  // "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+pscomppars+where+disc_facility+like+%27%25TESS%25%27+order+by+pl_orbper+desc&format=json"

  let resp = await axios
    .get("/loadPlanets")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  populateNames(resp);
  return resp;
}

async function loadMedium() {
  let arr = await d3.csv(
    "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&where=st_dist>5 and st_dist<10&order=st_dist"
  ); // default nasa api
  populateNames(arr);
  return arr;
}

async function loadFar() {
  let arr = await d3.csv(
    "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&where=st_dist>10 and st_dist<20&order=st_dist"
  ); // default nasa api
  populateNames(arr);
  return arr;
}

async function populateNames(arr) {
  d3.select(".planets-list").selectAll("p").remove();

  d3.select(".planets-list")
    .selectAll("p")
    .data(arr)
    .enter()
    .append("p")
    .text(function (d) {
      return d.pl_name;
    });
}

function showPlanetStats(planet, speed) {
  d3.select(".planet-data").selectAll("svg").remove();

  let LightYearsInOneParsec = 3.26;
  let data = [
    planet.sy_dist * LightYearsInOneParsec,
    planet.sy_pnum,
    planet.pl_orbper,
  ];

  //generate planet stats
  let earthMassJup = 0.00314; //earth mass compared to jupiter
  let planetMass = planet.pl_bmassj / earthMassJup; //calulate planet mass
  let lastUpdate = planet.rowupdate;
  let facility = planet.pl_facility;

  //generate human stats
  let lightYearDistInMiles = 6000000000000; //miles
  let speedOfLight = 671000000; //mph
  let voyagerSpeed = 38000; //mph
  let day = 24; //hrs
  let yearLength = 365; //days

  let totalMilesToDestination = lightYearDistInMiles * data[0];
  let yearsToReach =
    totalMilesToDestination / (voyagerSpeed * day * yearLength);
  let humanGenerations = yearsToReach / 30; // 30 years between generations
  let humanData = [yearsToReach, humanGenerations];

  //planet stats
  let width = 500;
  let height = 210;
  let scaleFactor = 10;
  let barHeight = 50;

  let scale1 = d3.scaleLinear().domain([1, 100]).range([10, 1000]);

  let graph = d3
    .select(".planet-data-svg")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  let bar = graph
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      if (i === 0) {
        return "translate(0, 25)";
      } else if (i === 1) {
        return "translate(0, 95)";
      } else if (i === 2) {
        return "translate(0, 165)";
      }
    });

  bar
    .append("rect")
    .attr("height", barHeight - 10)
    .transition()
    .ease(d3.easeLinear)
    .duration(500)
    .attr("width", function (d) {
      // return d * scaleFactor;
      return scale1(d);
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
        return "Distance (Light Years)";
      } else if (i === 1) {
        return "Planet Number";
      } else if (i === 2) {
        return "Orbital Period (Days)";
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
      if (i === 0) {
        return d.toFixed(2);
      } else {
        return parseInt(d);
      }
    });

  d3.select(".planet-mass").selectAll("p").remove();

  let massBox = d3
    .select(".planet-mass")
    .selectAll("p")
    .data([planetMass])
    .enter()
    .append("p")
    .text(function (d) {
      return d.toFixed(2) + " of Earth's Mass";
    });

  d3.select(".misc").selectAll("p").remove();

  let misc = d3
    .select(".misc")
    .selectAll("p")
    .data([lastUpdate])
    .enter()
    .append("p")
    .text(function (d) {
      return d;
    });

  d3.select(".facility").selectAll("p").remove();

  let facil = d3
    .select(".facility")
    .selectAll("p")
    .data([facility])
    .enter()
    .append("p")
    .text(function (d) {
      return d;
    });

  //show human-related data
  let calcBySpeed = document.getElementsByClassName("speed")[0].innerText;
  if (calcBySpeed === "38,000 mph") {
    showHumanStats(humanData, speed);
  } else {
    showHumanStats(data[0], speed);
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
    let otherHeight = 290;

    let graph2 = d3
      .select(".other-data")
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
          return "Flight Time (Years)";
        } else if (i === 1) {
          return "Generations amount";
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
    let otherHeight = 290;

    let graph2 = d3
      .select(".other-data")
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
          return "Flight Time (Years)";
        } else if (i === 1) {
          return "Generations amount";
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
    let otherHeight = 290;

    let graph2 = d3
      .select(".other-data")
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
          return "Flight Time (Months)";
        } else if (i === 1) {
          return "Generations amount";
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

function showTheSpeed(speed) {
  if (speed === 27) {
    d3.select(".speed").selectAll("h1").remove();

    d3.select(".speed")
      .selectAll("h1")
      .data([speed])
      .enter()
      .append("h1")
      .style("color", "rgb(255 140 0)")
      .text(function (d) {
        return d + " x The Speed of Light";
      });
  } else {
    d3.select(".speed").selectAll("h1").remove();

    d3.select(".speed")
      .selectAll("h1")
      .data([speed])
      .enter()
      .append("h1")
      .style("color", "rgb(255 140 0)")
      .text(function (d) {
        return d.toLocaleString() + " mph";
      });
  }
}

function runFacts() {
  let factsArr = [
    "Earth's orbital period: 365 days.",
    "Planet number in our solar system: 8 (previously 9).",
    "Pluto is a dwarf planet, smaller than Earth's moon. Thus it was demoted from its planetary status in 2006.",
    "Exoplanet is a planet outside of our solar system.",
    "To date, more than 4,000 exoplanets have been discovered and are considered 'confirmed'.",
    "Earth is the only known planet to have bodies of liquid water on its surface.",
    "Earth is the only planet in the universe known to possess life.",
  ];

  let random = factsArr[Math.floor(Math.random() * factsArr.length)];
  let ourSolarDiv = document.getElementsByClassName("our-solar")[0];
  d3.select(".our-solar").selectAll("p").remove();

  let pEle = document.createElement("p");
  ourSolarDiv.appendChild(pEle).textContent = random;
}
