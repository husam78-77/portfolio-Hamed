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


/*ABOUT SECTION*/
const animatedElements = document.querySelectorAll('.reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.3
});

animatedElements.forEach(el => observer.observe(el));

/*ABOUT SECTION*/


/*Chapter section */
function Chapter() {
    const items = document.querySelectorAll('.chapter-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
            } else {
                e.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.15 });

    items.forEach(item => observer.observe(item));
}
Chapter(selected);

/*Chapter section */

/*overlay section */

const overlay = document.getElementById("chapterOverlay");
const overlayClose = document.getElementById("overlayClose");
const overlayTitle = document.getElementById("overlayTitle");
const overlayMainImg = document.getElementById("overlayMainImage");
const overlayGallery = document.getElementById("overlayGallery");
const overlayDesc = document.getElementById("overlayDescription");
const galleryCount = document.getElementById("galleryCount");

const chapterData = {
    "Metal": {
        main: "images/look1.jpg",
        description: "Cold precision meets raw beauty. A study in reflective surfaces and industrial tension.",
        gallery: [
            "images/look1.jpg",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70",
            "https://images.unsplash.com/photo-1541960071727-c531398e7b79?w=400&q=70",
            "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&q=70",
        ]
    },
    "Bloom": {
        main: "https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=1200&q=80",
        description: "Softness rendered sharp. The paradox of fragile things that endure seasons.",
        gallery: [
            "https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=400&q=70",
            "https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=400&q=70",
            "https://images.unsplash.com/photo-1487530811015-780a25fa0f65?w=400&q=70",
            "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=400&q=70",
        ]
    },
    "Shadow": {
        main: "https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=1200&q=80",
        description: "What exists between light and dark is not nothing — it is everything left unseen.",
        gallery: [
            "https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=400&q=70",
            "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&q=70",
            "https://images.unsplash.com/photo-1520052205864-92d242b3a76b?w=400&q=70",
            "https://images.unsplash.com/photo-1541694769-90b4e50b73db?w=400&q=70",
        ]
    },
    "Edge": {
        main: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80",
        description: "The boundary is not a limit. It is the beginning of the next form.",
        gallery: [
            "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=70",
            "https://images.unsplash.com/photo-1519810755548-39cd217da494?w=400&q=70",
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=70",
            "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=70",
        ]
    }
};

let currentData = null;

function openOverlay(title) {
    const data = chapterData[title];
    if (!data) return;
    currentData = data;

    overlayTitle.textContent = title;
    overlayMainImg.src = data.main;
    overlayMainImg.alt = title;
    overlayDesc.textContent = data.description;

    overlayGallery.innerHTML = "";

    data.gallery.forEach((src, i) => {
        const thumb = document.createElement("div");
        thumb.className = "gallery-thumb" + (i === 0 ? " active" : "");

        const img = document.createElement("img");
        img.src = src;
        img.alt = `${title} ${i + 1}`;
        thumb.appendChild(img);

        thumb.addEventListener("click", () => {
            // Swap main image
            overlayMainImg.style.transition = "opacity 0.3s ease";
            overlayMainImg.style.opacity = "0";
            setTimeout(() => {
                overlayMainImg.src = src;
                overlayMainImg.style.opacity = "1";
            }, 300);

            // Update active state
            overlayGallery.querySelectorAll(".gallery-thumb").forEach(t => t.classList.remove("active"));
            thumb.classList.add("active");
        });

        overlayGallery.appendChild(thumb);
    });

    galleryCount.textContent = `${data.gallery.length} looks`;

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    overlayClose.focus();
}

function closeOverlay() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
}

// Trigger from chapter buttons
document.querySelectorAll('.chapter-cta').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();

        const titleElement = this.closest('.chapter-item')
            .querySelector('.chapter-title');

        const title = titleElement.childNodes[0].nodeValue.trim();

        openOverlay(title);
    });
});

// Close button
overlayClose.addEventListener("click", closeOverlay);

// Click backdrop to close
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay();
});

// Keyboard: Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
        closeOverlay();
    }
    // Arrow keys to cycle gallery
    if (overlay.classList.contains("active")) {
        const thumbs = [...overlayGallery.querySelectorAll(".gallery-thumb")];
        const activeIdx = thumbs.findIndex(t => t.classList.contains("active"));
        if (e.key === "ArrowRight" && activeIdx < thumbs.length - 1) thumbs[activeIdx + 1].click();
        if (e.key === "ArrowLeft" && activeIdx > 0) thumbs[activeIdx - 1].click();
    }
});

/*overlay section */
