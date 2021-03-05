import '../css/reset.css'
import '../css/main.css';
import regeneratorRuntime from "regenerator-runtime";
import * as d3 from 'd3';



document.addEventListener('DOMContentLoaded', () => {
  d3.select('body')
    .transition()
    .duration(2000)
    .ease(d3.easeCubic)
    .style('background-color', 'black')

  d3.select('h1')
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .style('color', 'white')
  
  continueButton()
  // loadDefaultData() // remove after development
})

function continueButton(){  
  const main = document.getElementsByClassName('main-div')
  main[0].classList.add('hidden')

  const intro = document.getElementsByClassName('intro')
  intro[0].classList.remove('hidden')

  let button = intro[0].lastElementChild
  button.addEventListener('click', () => {
    main[0].classList.remove('hidden')
    intro[0].classList.add('hidden')
    
    mainPageTransition()
    loadDefaultData()
  })
}

function mainPageTransition() {
  d3.select('rect').transition()
    .ease(d3.easeLinear)
    .duration(3000)
    .attr("fill", "blue")
}

async function loadDefaultData(){
  
  //load Default data
  let arr = await d3.csv('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&where=st_dist<5&order=st_dist') // default nasa api
  // let arr = await d3.csv('https://api.le-systeme-solaire.net/rest/bodies/') // solar system api
  d3.select(".planets-list")
    .selectAll("p")
    .data(arr)
    .enter().append("p")
    .text(function(d) { return d.pl_name });


  //all btns
  d3.select(".left-switch")
    .selectAll('button')
    .style('background-color', 'red')
  d3.select(".right-switch")
    .selectAll('button')
    .style('background-color', 'red')

  //default btn green
  d3.select(".left-switch")
    .select('button')
    .style('background-color', 'rgb(90 250 13)')
  d3.select(".right-switch")
    .select('button')
    .style('background-color', 'rgb(90 250 13)')
     
  //store data from api request
  let data;

  //selecting distance
  d3.selectAll('button')
    .on('click', async (e) => { 
      let ele = e.currentTarget.parentElement.classList[0]
      d3.select('.' + ele)
        .selectAll('button')
        .style('background-color', 'red')
      e.currentTarget.style.backgroundColor = 'rgb(90 250 13)'

      if (e.currentTarget.innerText === "< 5 parsecs") {
        data = await loadNear() 
      } else if (e.currentTarget.innerText === "5-10 parsecs") {
        data = await loadMedium()
      } else if (e.currentTarget.innerText === "10+ parsecs") {
        data = await loadFar()
      }
    })


  const planetsList = document.getElementsByClassName('planets-list')
  if (planetsList.length) {
    planetsList[0].addEventListener('click', e => {
      data.forEach(planet => {
        if (e.target.innerText === planet.pl_name) {
          showPlanetStats(planet)
        }
      })
    })
  }
  
}



async function loadNear(){
  let arr = await d3.csv('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&where=st_dist<5&order=st_dist') // default nasa api
  populateNames(arr)
  return arr
}

async function loadMedium(){
  let arr = await d3.csv('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&where=st_dist>5 and st_dist<10&order=st_dist') // default nasa api
  populateNames(arr)
  return arr
}

async function loadFar(){
  let arr = await d3.csv('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&where=st_dist>11 and st_dist<13&order=st_dist') // default nasa api
  populateNames(arr)
  return arr
}

async function populateNames(arr){
  //clear the list
   d3.select(".planets-list")
    .selectAll("p").remove()
  //append new items
  d3.select(".planets-list")
    .selectAll("p")
    .data(arr)
    .enter().append("p")
    .text(function(d) { return d.pl_name });
}


function showPlanetStats(planet){
  
  d3.select(".planet-data")
    .selectAll("svg").remove()

  let data = [planet.st_dist, planet.pl_pnum, planet.pl_orbper]

  let width = 500
  let height = 350
  let scaleFactor = 10
  let barHeight = 20;

  let graph = d3.select(".planet-data")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

  let bar = graph.selectAll("g")
                  .data(data)
                  .enter()
                  .append("g")
                  .attr("transform", function(d, i) {
                        return "translate(0," + i * barHeight + ")";
                  });
  
  bar.append("rect")
      .attr("width", function(d) {
              return d * scaleFactor;
      })
      .attr("height", barHeight - 1)
      .attr("fill", 'red')
}

