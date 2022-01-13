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

