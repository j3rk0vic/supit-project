const text = "Budi izvrstan u onom što voliš.";
const textElement = document.getElementById("animated-text");
let index = 0;

function typeWriter() {
    if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 170);
    }
}

window.onload = () => {
    textElement.textContent = "";
    typeWriter();
};


// ne valja!
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger-btn");
  const nav = document.getElementById("main-nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    // Zatvori kad klikneš na link
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });

    // Zatvori na scroll
    window.addEventListener("scroll", () => {
      nav.classList.remove("active");
    });
  }
});