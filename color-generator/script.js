const generateBtn = document.getElementById("generateBtn");
const paletteContainer = document.querySelector(".paletteContainer");

generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", e => {
  if (e.target.classList.contains("copyBtn")) {
    const hexValue = e.target.previousElementSibling.textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySucces(e.target))
      .catch(error => console.error(error));
  } else if (e.target.classList.contains("color")) {
    const hexValue =
      e.target.nextElementSibling.querySelector(".hexValue").textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() =>
        showCopySucces(e.target.nextElementSibling.querySelector(".copyBtn")),
      )
      .catch(error => console.error(error));
  }
});
function showCopySucces(element) {
  element.classList.remove("fa-solid", "fa-copy");
  element.classList.add("fa-solid", "fa-check");
  element.style.color = "lightgreen";

  setTimeout(() => {
    element.classList.remove("fa-solid", "fa-check");
    element.classList.add("fa-solid", "fa-copy");
    element.style.color = "";
  }, 1500);
}

function generatePalette() {
  const colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }
  updatePaletteColor(colors);
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updatePaletteColor(colors) {
  const colorBoxes = document.querySelectorAll(".colorBox");
  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hexValue");
    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;
  });
}
generatePalette();
