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
  
  // d3.select("li").style("color", "green"); test
  
  const intro = document.getElementsByClassName('intro')
  intro[0].classList.remove('hidden')
  // debugger
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
  // let arr = []
  // d3.csv('/data/exoplanetsFiltered.csv', function(data){
  //   console.log(data)
  // })
  let arr = await d3.csv('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&where=st_dist<5') // default nasa api
  // let arr = await d3.csv('https://api.le-systeme-solaire.net/rest/bodies/') // solar system api
  
  // debugger
  d3.select(".planets-list")
    .selectAll("p")
    .data(arr)
    .enter().append("p")
    .text(function(d) { return d.pl_name });
 
}

// test , it works insie of contBTN()

let mainSVG = d3.select('#mainSVG')
let data = [
  [150, 150],
  [500,500]
]

let linGenerator = d3.line()
mainSVG.append('path')
  .attr('d', linGenerator(data))
  .style('stroke', 'green')
  .style('fill', 'blue')