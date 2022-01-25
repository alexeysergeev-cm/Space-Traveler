import * as d3 from "d3";

export const initiateApp = () => {
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
};

export const populateNames = (data) => {
  d3.select(".planets-list").selectAll("p").remove();

  d3.select(".planets-list")
    .selectAll("p")
    .data(data)
    .enter()
    .append("p")
    .text(function (d) {
      return d.pl_name;
    });
};

export const activateButton = (side, e) => {
  d3.selectAll(`.${side}-switch`)
    .selectAll("button")
    .classed("selected-btn", false);

  e.currentTarget.classList.toggle("selected-btn");
};

export const displaySourceDescription = (text) => {
  const ourSolarDiv = document.querySelector(".our-solar");
  const pEle = document.createElement("p");
  d3.select(".our-solar").selectAll("p").remove();
  ourSolarDiv.appendChild(pEle).textContent = text;
};

export const newTextTransition = () => {
  d3.select(".our-solar").transition().duration(250).style("height", "0px");
  d3.select(".our-solar")
    .transition()
    .delay(750)
    .duration(1000)
    .style("height", "470px");
};

export const showTheSpeed = (speed) => {
  d3.select(".speed").selectAll("h1").remove();
  d3.select(".speed")
    .selectAll("h1")
    .data([speed])
    .enter()
    .append("h1")
    .style("color", "rgb(255 140 0)")
    .text(function (d) {
      return speed === 27
        ? d + " x The Speed of Light"
        : d.toLocaleString() + " mph";
    });
};

export const displayHumanStats = (data, speed) => {
  const barHeight = 50;
  const otherWidth = 500;
  const otherHeight = 155;
  const flightTimeUnits = speed === 27 ? "months" : "years";
  const domain =
    speed === 27 ? [0, 10] : speed === 38000 ? [2000, 770000] : [10, 100];
  const range = speed === 27 ? [10, 100] : [50, 490];

  d3.select(".other-data").selectAll("svg").remove();
  const scale = d3.scaleLinear().domain(domain).range(range);

  const graph2 = d3
    .select(".human-data-svg")
    .append("svg")
    .attr("width", otherWidth)
    .attr("height", otherHeight);

  const bar2 = graph2
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      if (i === 0) {
        return "translate(0,25)";
      } else if (i === 1) {
        return "translate(0,100)";
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
        return `Flight time to the target planet (${flightTimeUnits})`;
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
        return speed === 38000 ? parseInt(d).toLocaleString() : d.toFixed(2);
      } else if (i === 1) {
        return parseInt(d).toLocaleString();
      }
    });
};

export const displayPlanetStats = (data) => {
  const width = document.querySelector(".planet-data").offsetWidth - 6;
  const height = document.querySelector(".planet-data").offsetHeight - 36;
  const scaleFactor = 10;
  const barHeight = 50;

  d3.select(".planet-data").selectAll("svg").remove();
  d3.select(".misc").selectAll("p").remove();
  d3.select(".facility").selectAll("p").remove();

  const graph = d3
    .select(".planet-data-svg")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const bar = graph
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

  d3.select(".misc")
    .selectAll("p")
    .data([data["lastPlanetUpdate"]])
    .enter()
    .append("p")
    .text(function (d) {
      return d;
    });

  d3.select(".facility")
    .selectAll("p")
    .data([data["discoveryFacility"]])
    .enter()
    .append("p")
    .text(function (d) {
      return d;
    });
};
