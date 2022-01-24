const text = [
  "There are roughly 30 years between generations. So 2000 years equals approximately 56 generations.",
  "A global average human life expectancy is 72.6 years.",
  "The earth's orbital period is 365 days.",
  "Distance: 1 parsec = 4.24 light years.",
  "Voyager 1 speed = 38,000 mph.",
  "The speed of light 671,000,000 mph.",
  "The fastest human spaceflight reached a top speed of 24,791 mph. That's 1/27,000 the speed of light and the fastest any human beings have ever traveled.",
  "This app gives you a prospective on what it takes to reach another planet that is outside of our solar system.",
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