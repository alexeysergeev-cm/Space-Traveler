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

  //all btns
  d3.select(".left-switch")
    .selectAll('button')
    .style('background-color', 'red')
  d3.select(".right-switch")
    .selectAll('button')
    .style('background-color', 'red')

  //default
  d3.select(".left-switch")
    .select('button')
    .style('background-color', 'rgb(90 250 13)')
  d3.select(".right-switch")
    .select('button')
    .style('background-color', 'rgb(90 250 13)')
  
  // let arr = []
  // d3.csv('/data/exoplanetsFiltered.csv', function(data){
  //   console.log(data)
  // })
  // let arr = await d3.csv('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&where=st_dist<5') // default nasa api
  // let arr = await d3.csv('https://api.le-systeme-solaire.net/rest/bodies/') // solar system api
  
  // debugger
  d3.select(".planets-list")
    .selectAll("p")
    .data(arr)
    .enter().append("p")
    .text(function(d) { return d.pl_name });
 
}

// document.getElementsByClassName('left-switch').addEventListener('click', function(){
//   debugger
//   console.log(this)
// })


d3.selectAll(".left-switch").style('background-color', 'red')
  // .on('click', function(){
  //   debugger
  //   console.log(this)
  //   d3.select('.left-switch')
  //     .style('background-color', 'green')

  // })