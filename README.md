# Space-Traveler

Space-traveler is a data visualization tool that shows the flight time, distance, and human generations required to reach an exoplanet.

![S](https://github.com/alexeysergeev-cm/Space-Traveler/blob/main/assets/intro.gif)

### [Try live](https://alexeysergeev-cm.github.io/Space-Traveler/)

## Motivation:

I, as a space fan, could not miss an opportunity to write a space-related app. I truly believe that space exploration and planets’ colonization is our future. Therefore, space traveling will be one of the most challenging things humans can encounter. Today it is some sort of fantasy to travel to other stars but one day it will be no different than traveling from one country to another. Good to mention that fantasy has the property of becoming a reality.

![S](https://github.com/alexeysergeev-cm/Space-Traveler/blob/main/assets/proj_overview.gif)

## Functionality & MVP

- Intro page with important information about distance units, average human lifespan, Earth orbital period, etc.
- Main page where users can filter planets by distance, choose spacecraft, and choose planets to get relevant information about resources it might take to get there.

## Wireframes

These are initial wireframes that were designed in the beginning of the project. Some of the stuff is not implemented but I still decided to keep them for future reference. Here is a galaxy map (not implemented) that could be used to show users the distance to the exoplanet.

![s](https://github.com/alexeysergeev-cm/Space-Traveler/blob/main/wireframes/intro.jpg)

![s](https://github.com/alexeysergeev-cm/Space-Traveler/blob/main/wireframes/main.jpg)

## Architecture and technologies

- `Vanilla JS` for main logic and functionality.
- `D3 library` for data visualization.
- `Webpack` to banel scripts into single source.
- `GitHub Pages` as a hosting service
- `Node.js, Express, Axios` is implemented and has been used to make external Api calls to fetch data.

## Code examples

The following code snippet initiates the intro page, queries DOM elements, and adds button event listener. Once the button is clicked the transition to the main page begins.

```javascript
function initiateIntro() {
  const main = document.querySelector(".main-div");
  const intro = document.querySelector(".intro");
  const button = document.querySelector(".continue-btn");
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
```

The next code snippet shows the utilization of `D3.js` library to visualize the data. The `transition(), ease(), and duration()` are used to add animation to the bar chart.

```javascript
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
```

This function reads from a `json` file that has been previously created and stored by calling an external Api. The function fetches information about planetary systems, removes the parenthesis and text within, and displays data to a user.

```javascript
export const getWebsiteText = async ({ link, plName }) => {
  const data = await fetch(pathToFile)
    .then((response) => response.json())
    .then((jsonResponse) => jsonResponse);

  const desc = data.planetarySysDescrip[plName] || "No data, sorry";
  const result = desc.replace(/ \([\s\S]*?\)/g, "");
  displaySourceDescription(result);
};
```
