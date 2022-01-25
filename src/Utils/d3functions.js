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
