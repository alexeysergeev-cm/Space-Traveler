import './styles/reset.css'
import './styles/main.css';
// import './styles/index.scss';
import * as d3 from 'd3';



document.addEventListener('DOMContentLoaded', () => {

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
    
  })

}