# Space-Traveler

![S](https://github.com/alexeysergeev-cm/Space-Traveler/blob/main/assets/intro.gif)

### [Space-Traveler](https://alexeysergeev-cm.github.io/Space-Traveler/)

## Motivation:
I am as space fan could not miss an opportunity to make something space related. I love everything about space: science, facts, sci-fi movies, books, video-games etc. As the final human frontier, space and colonization of other planets is our future. I believe that we have to understand and explore the planets beyond our own. Space travel is going to be the most challenging thing the human can encounter. It seems to be a fantasy to travel to other stars, but one day it will be no different than traveling from one country to another. Good to mention that fantasy has a property of becoming a reality.

## Background and Overview
The Space Traveler is data visualization tool that show the time, distance & generations amount it takes to reach a chosen exoplanet.

![S](https://github.com/alexeysergeev-cm/Space-Traveler/blob/main/assets/proj_overview.gif)


## Functionality & MVP
* Intro page with important information: such as distance units, avg human lifespan, orbital period of the earth. This gives users a general picture when using the app.
* List of possible planets. Fetching data using API calls then store it to improve performance. 
* Choosing the distance and spacecraft to compare and calculate the data.
* Show planet data & other relevant data.

## Wireframes
These are initial wireframes that were designed in the beginning of the project. I decided to not update them to what you see now on the screen for future reference if I need to improve this project. Initially I was planning to get a galaxy map where users could zoom-in and zoom-out and click on the planets that will show releveant information. I definetely will be on look out for these kind of maps or consider building one myself.

![s](https://github.com/alexeysergeev-cm/Space-Traveler/blob/main/wireframes/intro.jpg)

![s](https://github.com/alexeysergeev-cm/Space-Traveler/blob/main/wireframes/main.jpg)

## Architecture and technologies

* `Vanilla JS` for main logic & functionality.
* `D3 library` for data visualization.
* `Webpack` to banel scripts into single source.

The following code snippet is a representation of asynchronous JavaScript. It makes sure that it fetches data before it start populating the list of the planets. Without `asnyc - await` data in the `arr` will be stored as a promise which would not produce a desired result in the `populateNames(arr)`.

```javascript
async function loadNear(){
  let arr = await d3.csv('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&where=st_dist<5&order=st_dist') 
  populateNames(arr)
  return arr
}

async function populateNames(arr){
  d3.select(".planets-list")
  .selectAll("p").remove()

  d3.select(".planets-list")
    .selectAll("p")
    .data(arr)
    .enter().append("p")
    .text(function(d) { return d.pl_name });
}
```

The next code snippet show the utilization of `D3.js` library to visualize the data. The `transition(), ease(), duration()` are used to add animation for a better UX.

```javascript
bar.append("rect")
  .attr("height", barHeight - 10)
  .transition()
  .ease(d3.easeLinear)
  .duration(500)
  .attr("width", function(d) {
          // return d * scaleFactor;
          return scale1(d)
  })
  .attr("fill", 'rgb(139, 0, 139)')
  .attr('filter', 'drop-shadow(0px 2px 2px black)')

bar.append("text")
  .attr("x", 3)
  .attr("y", -12 )
  .attr("dy", ".35em")
  .attr("font-size", "18px")
  .attr("font-family", "sans-serif")
  .style("fill", "white")
  .style("letter-spacing", "1px")
  .attr('filter', 'drop-shadow(0px 2px 2px black)')
  .text(function (d, i) {
    if (i === 0) {
      return 'Distance (Light Years)'
    } else if (i === 1) {
      return 'Planet Number'
    } else if (i === 2){
      return 'Orbital Period (Days)'
    }
  })

bar.append("text")
  .attr("x", 5 )
  .attr("y", barHeight / 2)
  .attr("font-size", "16px")
  .attr("font-family", "sans-serif")
  .style("fill", "white")
  .text(function (d, i) {
    if (i === 0) {
      return d.toFixed(2)
    } else {
      return parseInt(d) 
    }
  })

```

This last code snippet is shown to represent basic `DOM` manipulation. The `button.addEventListener()` is listening for a 'button click' to perform the next sets of instructions.

```javascript
function continueButton(){  
  const main = document.getElementsByClassName('main-div')
  main[0].classList.add('hidden')

  const intro = document.getElementsByClassName('intro')
  intro[0].classList.remove('hidden')

  startType()

  let button = intro[0].lastElementChild
  button.addEventListener('click', () => {
    main[0].classList.remove('hidden')
    intro[0].classList.add('hidden')
    
    mainPageTransition()
    loadDefaultData()
  })
}
```
