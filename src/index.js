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
  //store data from api request
  let data0 = [];
  let data1 = [];
  let data2 = [];

  //load Default data
  data0 = await loadNear()
  
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
     
  
    //development dummy variable

//   let data = [{dec: "-62.679485", dec_str: "-62d40m46.1s", gaia_gmag: "8.954", gaia_gmagerr: "", gaia_gmaglim: "0", pl_bmassj: "0.00400", pl_bmassjerr1: "0.00060",
//   pl_bmassjerr2: "-0.00053",pl_bmassjlim: "0",pl_bmassn: "1",pl_bmassprov: "Msini",pl_controvflag: "0",pl_dens: "",pl_denserr1: "",pl_denserr2: "",pl_denslim: "",
// pl_densn: "0",pl_discmethod: "Radial Velocity",pl_facility: "European Southern Observatory",pl_hostname: "Proxima Cen",pl_k2flag: "0",pl_kepflag: "0",pl_letter: "b",
// pl_name: "Proxima Cen b",pl_nnotes: "0",pl_orbeccen: "0.350000",pl_orbeccenerr1: "",pl_orbeccenerr2: "",pl_orbeccenlim: "1",pl_orbeccenn: "2",pl_orbincl: "",pl_orbinclerr1: "", 
// pl_orbinclerr2: "",pl_orbincllim: "",pl_orbincln: "0",pl_orbper: "11.18600000",pl_orbpererr1: "0.00100000",pl_orbpererr2: "-0.00200000",pl_orbperlim: "0",pl_orbpern: "2",pl_orbsmax: "0.048500",
// pl_orbsmaxerr1: "0.004100",pl_orbsmaxerr2: "-0.005100",pl_orbsmaxlim: "0",pl_orbsmaxn: "1",pl_pnum: "1",pl_radj: "",pl_radjerr1: "",pl_radjerr2: "",pl_radjlim: "",pl_radn: "0",pl_ttvflag: "0",
// ra: "217.428955",ra_str: "14h29m42.95s",rowupdate: "2016-08-25",st_decerr: "0.000004",st_dist: "1.30",st_disterr1: "0.00",st_disterr2: "-0.00",st_distlim: "0",st_distn: "3",st_mass: "0.12",st_masserr1: "0.01",
// st_masserr2: "-0.01",st_masslim: "0",st_massn: "2",st_optband: "V (Johnson)",st_optmag: "11.110",st_optmagerr: "",st_optmaglim: "0",st_posn: "4",st_rad: "0.14",st_raderr1: "0.02",
// st_raderr2: "-0.02",st_radlim: "0",st_radn: "2",st_raerr: "0.000004",st_teff: "3050.00",st_tefferr1: "100.00",st_tefferr2: "-100.00",st_tefflim: "0",st_teffn: "2"}]

  // d3.select(".planets-list")
  //   .selectAll("p")
  //   .data(data)
  //   .enter().append("p")
  //   .text(function(d) { return d.pl_name });

  //selecting distance
  d3.selectAll('button')
    .on('click', async (e) => { 
      let ele = e.currentTarget.parentElement.classList[0]
      d3.select('.' + ele)
        .selectAll('button')
        .style('background-color', 'red')
      e.currentTarget.style.backgroundColor = 'rgb(90 250 13)'

      if (e.currentTarget.innerText === "< 5 parsecs") {
        if (data0.length){
          populateNames(data0)
        } else {
          data0 = await loadNear() 
        }
      } else if (e.currentTarget.innerText === "5-10 parsecs") {
        if (data1.length){
          populateNames(data1) 
        } else {
          data1 = await loadMedium()
        }
      } else if (e.currentTarget.innerText === "10+ parsecs") {
        if (data2.length){
          populateNames(data1) 
        } else {
          data2 = await loadFar()
        }
      }
    })


  const planetsList = document.getElementsByClassName('planets-list')
  if (planetsList.length) {
    planetsList[0].addEventListener('click', e => {
      let switches = document.getElementsByClassName('left-switch')[0].children
      for (let i = 1; i < switches.length; i++ ) {
        if (switches[i].style.backgroundColor === "rgb(90, 250, 13)" && switches[i].innerText === "< 5 parsecs") {
          data0.forEach(planet => {
            if (e.target.innerText === planet.pl_name) {
              showPlanetStats(planet)
            }
          })
        } else if (switches[i].style.backgroundColor === "rgb(90, 250, 13)" && switches[i].innerText === "5-10 parsecs"){
          data1.forEach(planet => {
            if (e.target.innerText === planet.pl_name) {
              showPlanetStats(planet)
            }
          })
        } else {
          data2.forEach(planet => {
            if (e.target.innerText === planet.pl_name) {
              showPlanetStats(planet)
            }
          })
        }
      }
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

  let LightYearsInOneParsec = 3.26;

  let data = [planet.st_dist * LightYearsInOneParsec, planet.pl_pnum, planet.pl_orbper]

  let width = 500
  let height = 350
  let scaleFactor = 10
  let barHeight = 50;

  let lightYearDistInMiles = 6000000000000; //miles
  let speedOfLight = 671000000; //mph
  let voyagerSpeed = 38000; //mph
  let day = 24; //hrs
  let yearLength = 365; //days

  let totalMilesToDestination = lightYearDistInMiles * data[0]
  let yearsToReach = totalMilesToDestination / (voyagerSpeed * day * yearLength)
  let humanGenerations = yearsToReach / 30 // 30 years between generations
  let humanData = [yearsToReach, humanGenerations]

  //planet stats

  let scale1 = d3.scaleLinear()
            .domain([1, 20000])
            .range([1, 490]);

  let graph = d3.select(".planet-data")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

  let bar = graph.selectAll("g")
                  .data(data)
                  .enter()
                  .append("g")
                  .attr("transform", function(d, i) {
                      if (i === 0){
                        return "translate(0,25)";
                      } else if (i === 1) {
                        return "translate(0,90)";
                      } else if (i === 2){
                        return "translate(0,155)";
                      }
                  });
  

  bar.append("rect")
      .attr("height", barHeight - 10)
      .transition()
      .ease(d3.easeLinear)
      .duration(500)
      .attr("width", function(d) {
              return d * scaleFactor;
      })
      .attr("fill", 'red')

  bar.append("text")
      .attr("x", 3)
      .attr("y", -12 )
      .attr("dy", ".35em")
      .attr("stroke", "white")
      .attr("font-size", "18px")
      .attr("font-family", "fantasy")
      .style("fill", "darkOrange")
      .text(function (d, i) {
        if (i === 0) {
          return 'Distance (in light years)'
        } else if (i === 1) {
          return 'Planet Number'
        } else if (i === 2){
          return 'Orbital Period (in days)'
        }
      })

    bar.append("text")
      .attr("x", 5 )
      .attr("y", barHeight / 2)
      // .attr("dy", ".35em")
      .attr("stroke", "white")
      .attr("font-size", "16px")
      .attr("font-family", "fantasy")
      .style("fill", "darkOrange")
      .text(function (d, i) {
        if (i === 0) {
          return d.toFixed(2)
        } else {
          return parseInt(d) 
        }
      })

  //human-related data
  let scale = d3.scaleLinear()
            .domain([2000, 770000])
            .range([50, 490]);

  d3.select(".other-data")
    .selectAll("svg").remove()

  let otherWidth = 500;
  let otherHeight = 290;

  let graph2 = d3.select(".other-data")
                .append("svg")
                .attr("width", otherWidth)
                .attr("height", otherHeight);

  let bar2 = graph2.selectAll("g")
                  .data(humanData)
                  .enter()
                  .append("g")
                  .attr("transform", function(d, i) {
                        if (i === 0){
                        return "translate(0,25)";
                      } else if (i === 1) {
                        return "translate(0,100)";
                      } else if (i === 2){
                        return "translate(0,155)";
                      }
                  });
  
  bar2.append("rect")
      .attr("height", barHeight - 1)
      .transition()
      .ease(d3.easeLinear)
      .duration(500)
      .attr("width", function(d) {
              return scale(d);
      })
      .attr("fill", 'red')

  bar2.append("text")
      .attr("x", 3)
      .attr("y", -12 )
      .attr("dy", ".35em")
      .attr("stroke", "white")
      .attr("font-size", "18px")
      .attr("font-family", "fantasy")
      .style("fill", "darkOrange")
      .text(function (d, i) {
        if (i === 0) {
          return 'Flight Time (in human years)'
        } else if (i === 1) {
          return 'Generations amount'
        }
      })
    
  bar2.append("text")
      .attr("x", 5)
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .attr("stroke", "white")
      .attr("font-size", "16px")
      .attr("font-family", "sans-serif")
      .style("fill", "darkOrange")
      .text(function (d, i) {
        if (i === 0) {
          return parseInt(d)
        } else if (i === 1) {
          return parseInt(d)
        }
      })
}

