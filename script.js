// ─── HERO SLIDER ────────────────────────────────────────────────────────────

const slides = document.querySelectorAll('.slide');
let current = 0;
let autoplayTimer;

const ORIGINS = [
    { x: '50%', y: '50%' },
    { x: '0%', y: '50%' },
    { x: '100%', y: '50%' },
    { x: '50%', y: '0%' },
    { x: '50%', y: '100%' },
];

/**
 * Assign a unique reveal origin to every slide at load time.
 * Consecutive slides will always differ.
 */
function assignOrigins() {
    let lastIdx = -1;
    slides.forEach(slide => {
        let idx;
        do { idx = Math.floor(Math.random() * ORIGINS.length); }
        while (idx === lastIdx && ORIGINS.length > 1);
        lastIdx = idx;

        const { x, y } = ORIGINS[idx];
        slide.style.setProperty('--x', x);
        slide.style.setProperty('--y', y);
    });
}
assignOrigins();

// ─── Progress dots ───────────────────────────────────────────────────────────

const dotsContainer = document.getElementById('heroDots');

function buildDots() {
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });
}
buildDots();

function updateDots() {
    dotsContainer.querySelectorAll('.hero-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
    });
}

// ─── Slide navigation ────────────────────────────────────────────────────────

function goTo(index) {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    updateDots();
    resetAutoplay();
}

function next() {
    goTo(current + 1);
}

function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(next, 5000);
}

resetAutoplay();

// ─── Cursor-tracking hero title parallax ─────────────────────────────────────

const heroSection = document.querySelector('.hero');
const heroTitle = document.querySelector('.hero-title');

heroSection.addEventListener('mousemove', (e) => {
    const { clientWidth: w, clientHeight: h } = heroSection;
    const dx = (e.clientX / w - 0.5) * 18;
    const dy = (e.clientY / h - 0.5) * 10;
    heroTitle.style.transform = `translate(${dx}px, ${dy}px)`;
});

heroSection.addEventListener('mouseleave', () => {
    heroTitle.style.transform = 'translate(0, 0)';
});

// ─── HEADER SCROLL BEHAVIOUR ──────────────────────────────────────────────────

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── MOBILE HAMBURGER MENU ───────────────────────────────────────────────────

const navHamburger = document.getElementById('navHamburger');
const navMobileMenu = document.getElementById('navMobileMenu');

if (navHamburger && navMobileMenu) {
    navHamburger.addEventListener('click', () => {
        const isOpen = navMobileMenu.classList.toggle('open');
        navHamburger.classList.toggle('open', isOpen);
        navHamburger.setAttribute('aria-expanded', isOpen);
    });

    navMobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMobileMenu.classList.remove('open');
            navHamburger.classList.remove('open');
            navHamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// ─── INTERSECTION OBSERVER — reveal animations ────────────────────────────────

const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle('active', entry.isIntersecting);
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -40px 0px',
});

revealEls.forEach(el => revealObserver.observe(el));

// ─── CHAPTER SECTION ─────────────────────────────────────────────────────────

function initChapters() {
    const items = document.querySelectorAll('.chapter-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            e.target.classList.toggle('visible', e.isIntersecting);
        });
    }, { threshold: 0.15 });

    items.forEach(item => observer.observe(item));
}
initChapters();

// ─── CHAPTER OVERLAY ─────────────────────────────────────────────────────────

const overlay = document.getElementById('chapterOverlay');
const overlayClose = document.getElementById('overlayClose');
const overlayTitle = document.getElementById('overlayTitle');
const overlayMainImg = document.getElementById('overlayMainImage');
const overlayGallery = document.getElementById('overlayGallery');
const overlayDesc = document.getElementById('overlayDescription');
const galleryCount = document.getElementById('galleryCount');

const chapterData = {
    Metal: {
        main: 'images/look1.jpg',
        description: 'Cold precision meets raw beauty. A study in reflective surfaces and industrial tension.',
        gallery: [
            'images/look1.jpg',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70',
            'https://images.unsplash.com/photo-1541960071727-c531398e7b79?w=400&q=70',
            'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&q=70',
        ]
    },
    Bloom: {
        main: 'https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=1200&q=80',
        description: 'Softness rendered sharp. The paradox of fragile things that endure seasons.',
        gallery: [
            'https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=400&q=70',
            'https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=400&q=70',
            'https://images.unsplash.com/photo-1487530811015-780a25fa0f65?w=400&q=70',
            'https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=400&q=70',
        ]
    },
    Shadow: {
        main: 'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=1200&q=80',
        description: 'What exists between light and dark is not nothing — it is everything left unseen.',
        gallery: [
            'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=400&q=70',
            'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&q=70',
            'https://images.unsplash.com/photo-1520052205864-92d242b3a76b?w=400&q=70',
            'https://images.unsplash.com/photo-1541694769-90b4e50b73db?w=400&q=70',
        ]
    },
    Edge: {
        main: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80',
        description: 'The boundary is not a limit. It is the beginning of the next form.',
        gallery: [
            'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=70',
            'https://images.unsplash.com/photo-1519810755548-39cd217da494?w=400&q=70',
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=70',
            'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=70',
        ]
    }
};

function setActiveThumb(thumbEl) {
    overlayGallery.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
    thumbEl.classList.add('active');
}

function swapMainImage(src) {
    overlayMainImg.style.opacity = '0';
    setTimeout(() => {
        overlayMainImg.src = src;
        overlayMainImg.style.opacity = '1';
    }, 300);
}

function openOverlay(title) {
    const data = chapterData[title];
    if (!data) return;

    overlayTitle.textContent = title;
    overlayDesc.textContent = data.description;
    galleryCount.textContent = `${data.gallery.length} looks`;

    // Set main image immediately (no fade on open)
    overlayMainImg.src = data.main;
    overlayMainImg.alt = title;
    overlayMainImg.style.opacity = '1';

    // Build thumbnails
    overlayGallery.innerHTML = '';
    data.gallery.forEach((src, i) => {
        const thumb = document.createElement('div');
        thumb.className = 'gallery-thumb' + (i === 0 ? ' active' : '');

        const img = document.createElement('img');
        img.src = src;
        img.alt = `${title} ${i + 1}`;
        thumb.appendChild(img);

        thumb.addEventListener('click', () => {
            swapMainImage(src);
            setActiveThumb(thumb);
        });

        overlayGallery.appendChild(thumb);
    });

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    overlayClose.focus();
}

function closeOverlay() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Open overlay from chapter CTA buttons
document.querySelectorAll('.chapter-cta').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const titleEl = this.closest('.chapter-item').querySelector('.chapter-title');
        const title = [...titleEl.childNodes]
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.nodeValue.trim())
            .find(t => t.length > 0);
        openOverlay(title);
    });
});

// Close button
overlayClose.addEventListener('click', closeOverlay);

// Click backdrop to close
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeOverlay();
        return;
    }

    const thumbs = [...overlayGallery.querySelectorAll('.gallery-thumb')];
    const activeIdx = thumbs.findIndex(t => t.classList.contains('active'));

    if (e.key === 'ArrowRight' && activeIdx < thumbs.length - 1) thumbs[activeIdx + 1].click();
    if (e.key === 'ArrowLeft' && activeIdx > 0) thumbs[activeIdx - 1].click();
});


/* ── Custom Cursor (work section) ── */
const wpCursor = document.getElementById('wp-cursor');
const wpCursorRing = document.getElementById('wp-cursor-ring');

let mx = -100, my = -100;
let rx = -100, ry = -100;

window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (wpCursor) { wpCursor.style.left = mx + 'px'; wpCursor.style.top = my + 'px'; }
});

function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (wpCursorRing) { wpCursorRing.style.left = rx + 'px'; wpCursorRing.style.top = ry + 'px'; }
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .wp-project-image-wrap').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ── Scroll Reveal (work section) ── */
const wpRevealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.wp-project-item, #wpWorkOutro').forEach(el => wpRevealObs.observe(el));

/* ── Filter ── */
const wpFilterBtns = document.querySelectorAll('.wp-filter-btn');
const wpProjectItems = document.querySelectorAll('.wp-project-item');
const wpCountEl = document.getElementById('wpSectionCount');

wpFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        wpFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        let visible = 0;
        wpProjectItems.forEach((item, i) => {
            const cats = item.dataset.category || '';
            const show = filter === 'all' || cats.includes(filter);

            if (show) {
                item.classList.remove('hidden');
                item.classList.remove('visible');
                setTimeout(() => item.classList.add('visible'), i * 80);
                visible++;
            } else {
                item.classList.add('hidden');
                item.classList.remove('visible');
            }
        });

        if (wpCountEl) wpCountEl.textContent = `0${visible} Project${visible !== 1 ? 's' : ''}`;
    });
});