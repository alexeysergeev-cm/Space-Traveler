const text = [
  "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
  "The earth's orbital period around the Sun is 365 days.",
  "A global average human life expectancy is 72.6 years.",
  "There are roughly 30 years between generations. 2000 years equals to approximately 56 generations.",
  "The parsec is a unit of length used to measure the large distances to astronomical objects outside the Solar System.",
  "1 parsec equals to approximately 3.26 light years.",
  "Spacecraft 'Voyager 1' has a speed of 38,000 mph.",
  "The speed of light is 671,000,000 mph.",
  "The fastest human spaceflight reached a top speed of 24,791 mph. That's 1/27,000 the speed of light and the fastest any human beings have ever traveled.",
  "This app gives you a prospective on what it takes to reach a planet outside our Solar System.",
  "😳",
];

let paragraphCount = 0;
let charCount = 0;

export const startTyping = () => {
  if (paragraphCount < text.length) {
    const li = document.createElement("li");
    document.getElementById("rel-info").appendChild(li);
    actualType();
  }
};

function actualType() {
  if (charCount < text[paragraphCount].length) {
    const letter = text[paragraphCount].charAt(charCount);
    document.getElementById("rel-info").lastChild.textContent += letter;
    charCount++;
    setTimeout(actualType, 20);
  } else if (charCount === text[paragraphCount].length) {
    paragraphCount++;
    charCount = 0;
    startTyping();
  }
}
