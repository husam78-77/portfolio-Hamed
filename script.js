const transitions = [
    "center",
    "left",
    "right",
    "top",
    "bottom",
    "random"
];
function getRandomTransition() {
    return transitions[Math.floor(Math.random() * transitions.length)];
}

const selected = getRandomTransition();

function applyTransition(type) {
    const slides = document.querySelectorAll('.slide');

    slides.forEach(slide => {
        switch (type) {
            case "center":
                slide.style.setProperty('--x', '50%');
                slide.style.setProperty('--y', '50%');
                break;

            case "left":
                slide.style.setProperty('--x', '0%');
                slide.style.setProperty('--y', '50%');
                break;

            case "right":
                slide.style.setProperty('--x', '100%');
                slide.style.setProperty('--y', '50%');
                break;

            case "top":
                slide.style.setProperty('--x', '50%');
                slide.style.setProperty('--y', '0%');
                break;

            case "bottom":
                slide.style.setProperty('--x', '50%');
                slide.style.setProperty('--y', '100%');
                break;

            case "random":
                const x = Math.random() * 100 + "%";
                const y = Math.random() * 100 + "%";
                slide.style.setProperty('--x', x);
                slide.style.setProperty('--y', y);
                break;
        }
    });
}
applyTransition(selected);

const slides = document.querySelectorAll('.slide');
let current = 0;

setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
}, 5000);

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.position = "fixed";
        header.style.background = "rgba(15, 15, 15, 0.9)";
        header.style.backdropFilter = "blur(10px)";
    } else {
        header.style.position = "absolute";
        header.style.background = "transparent";
        header.style.backdropFilter = "none";
    }
});