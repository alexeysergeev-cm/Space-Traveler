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
}

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
}

export const activateDefaultButtons = () => {
  d3.select(".left-switch, .right-switch")
    .selectAll("button")
    .style("background-color", "red");

  d3.select(".left-switch, .right-switch")
    .select("button")
    .style("background-color", "rgb(90 250 13)")
    .style("box-shadow", "inset 0 1px 3px 1px rgb(0 0 0)");
}

export const displaySourceDescription = (text) => {
  const ourSolarDiv = document.querySelector(".our-solar");
  const pEle = document.createElement("p");
  d3.select(".our-solar").selectAll("p").remove();
  ourSolarDiv.appendChild(pEle).textContent = text;
}

export const newTextTransition = () => {
  d3.select(".our-solar").transition().duration(250).style("height", "0px");
  d3.select(".our-solar")
    .transition()
    .delay(750)
    .duration(1000)
    .style("height", "470px");
}