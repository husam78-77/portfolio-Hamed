/* ================================================================
   WORK.JS — All Work Page
   ================================================================ */

'use strict';

// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────

const cursor = document.getElementById('w-cursor');
const cursorRing = document.getElementById('w-cursor-ring');
let mx = -100, my = -100;
let rx = -100, ry = -100;

window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
});

(function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .w-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ─── HEADER SCROLL ───────────────────────────────────────────────────────────

const header = document.getElementById('wHeader');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── HERO COUNTER ANIMATION ──────────────────────────────────────────────────

function animateCounters() {
    document.querySelectorAll('.w-stat-num').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1200;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out expo
            const eased = 1 - Math.pow(1 - progress, 4);
            const value = Math.round(eased * target);
            el.textContent = String(value).padStart(2, '0');
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    });
}

// Trigger counters when hero stats become visible
const statsEl = document.querySelector('.w-hero-stats');
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
    }
}, { threshold: 0.5 });
if (statsEl) statsObserver.observe(statsEl);

// ─── PROJECT DATA ─────────────────────────────────────────────────────────────

const projects = {
    metal: {
        title: 'Metal',
        eyebrow: 'Collection · Editorial — Chapter I',
        description: 'Cold precision meets raw beauty. Reflective surfaces and industrial tension studied through the lens of wearable sculpture. Armour as identity — the body re-imagined as architecture.',
        images: [
            'images/look1.jpg',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
            'https://images.unsplash.com/photo-1541960071727-c531398e7b79?w=1200&q=80',
            'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&q=80',
        ],
        details: {
            Year: '2025',
            Type: 'Collection / Editorial',
            Role: 'Creative Direction · Styling',
            Looks: '6',
        }
    },
    bloom: {
        title: 'Bloom',
        eyebrow: 'Editorial · Conceptual — Chapter II',
        description: 'Softness rendered sharp. The paradox of fragile things that endure seasons — petals pressed against pavement, the feminine wielded as force.',
        images: [
            'images/look2.jpg',
            'https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=1200&q=80',
            'https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=1200&q=80',
            'https://images.unsplash.com/photo-1487530811015-780a25fa0f65?w=1200&q=80',
        ],
        details: {
            Year: '2025',
            Type: 'Editorial · Conceptual',
            Role: 'Creative Direction · Styling',
            Looks: '5',
        }
    },
    shadow: {
        title: 'Shadow',
        eyebrow: 'Conceptual · Collection — Chapter III',
        description: 'What exists between light and dark is not nothing — it is everything left unseen. Silhouettes carved from silence, presence through absence.',
        images: [
            'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=1200&q=80',
            'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1200&q=80',
            'https://images.unsplash.com/photo-1520052205864-92d242b3a76b?w=1200&q=80',
            'https://images.unsplash.com/photo-1541694769-90b4e50b73db?w=1200&q=80',
        ],
        details: {
            Year: '2025',
            Type: 'Conceptual · Collection',
            Role: 'Creative Direction · Styling',
            Looks: '4',
        }
    },
    edge: {
        title: 'Edge',
        eyebrow: 'Editorial · Commercial — Chapter IV',
        description: 'The boundary is not a limit — it is the beginning of the next form. Confidence rendered in motion, the body as blade cutting through with deliberate intention.',
        images: [
            'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80',
            'https://images.unsplash.com/photo-1519810755548-39cd217da494?w=1200&q=80',
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=80',
            'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80',
        ],
        details: {
            Year: '2024',
            Type: 'Editorial · Commercial',
            Role: 'Creative Direction · Styling',
            Looks: '7',
        }
    },
    void: {
        title: 'Void',
        eyebrow: 'Commercial · Editorial — Brand Campaign',
        description: 'A brand campaign built on absence. Negative space as the loudest statement — stripping the visual field until only intention remains.',
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
            'https://images.unsplash.com/photo-1541960071727-c531398e7b79?w=1200&q=80',
            'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80',
        ],
        details: {
            Year: '2024',
            Type: 'Commercial · Editorial',
            Role: 'Styling · Direction',
            Looks: '8',
        }
    },
    dusk: {
        title: 'Dusk',
        eyebrow: 'Conceptual · Editorial — Portrait Series',
        description: 'A portrait series shot in the final hour of light. The transitional state as a metaphor for identity — never fully one thing, always becoming.',
        images: [
            'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1200&q=80',
            'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=1200&q=80',
            'https://images.unsplash.com/photo-1487530811015-780a25fa0f65?w=1200&q=80',
        ],
        details: {
            Year: '2024',
            Type: 'Conceptual · Editorial',
            Role: 'Creative Direction · Styling',
            Looks: '6',
        }
    },
    onyx: {
        title: 'Onyx',
        eyebrow: 'Commercial · Collection — Lookbook',
        description: 'A full lookbook built around the colour of authority. Mono-chromatic depth, tactile fabrics, and the quiet power of restraint.',
        images: [
            'https://images.unsplash.com/photo-1541694769-90b4e50b73db?w=1200&q=80',
            'https://images.unsplash.com/photo-1520052205864-92d242b3a76b?w=1200&q=80',
            'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&q=80',
        ],
        details: {
            Year: '2024',
            Type: 'Commercial · Collection',
            Role: 'Styling · Direction',
            Looks: '9',
        }
    },
    silk: {
        title: 'Silk',
        eyebrow: 'Editorial · Conceptual — Movement Studies',
        description: 'Studying the language of fabric in motion. What silk reveals about the body, time, and the invisible forces that shape both.',
        images: [
            'https://images.unsplash.com/photo-1520052205864-92d242b3a76b?w=1200&q=80',
            'https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=1200&q=80',
            'https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=1200&q=80',
        ],
        details: {
            Year: '2024',
            Type: 'Editorial · Conceptual',
            Role: 'Creative Direction',
            Looks: '5',
        }
    },
    petal: {
        title: 'Petal',
        eyebrow: 'Collection · Editorial — Archive',
        description: 'An archival editorial celebrating the full collection — every look documented as a specimen, preserved like petals pressed between the pages of memory.',
        images: [
            'https://images.unsplash.com/photo-1487530811015-780a25fa0f65?w=1200&q=80',
            'https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=1200&q=80',
            'https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=1200&q=80',
        ],
        details: {
            Year: '2024',
            Type: 'Collection · Editorial',
            Role: 'Styling · Creative Direction',
            Looks: '6',
        }
    },
    terrain: {
        title: 'Terrain',
        eyebrow: 'Commercial — Campaign',
        description: 'Shot on location in the desert periphery of Riyadh. A commercial campaign that grounds luxury in landscape — earth, dust, and the human form.',
        images: [
            'https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=1200&q=80',
            'https://images.unsplash.com/photo-1519810755548-39cd217da494?w=1200&q=80',
            'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80',
        ],
        details: {
            Year: '2024',
            Type: 'Commercial',
            Role: 'Styling · Art Direction',
            Looks: '7',
        }
    },
    opaque: {
        title: 'Opaque',
        eyebrow: 'Conceptual · Editorial — Series',
        description: 'An exploration of concealment as expression. Layers that obscure but never fully hide — the garment as psychological surface.',
        images: [
            'https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=1200&q=80',
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=80',
            'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1200&q=80',
        ],
        details: {
            Year: '2024',
            Type: 'Conceptual · Editorial',
            Role: 'Creative Direction · Styling',
            Looks: '4',
        }
    },
    ritual: {
        title: 'Ritual',
        eyebrow: 'Collection · Commercial — Lookbook',
        description: 'Dressing as ceremony. A lookbook that treats the act of getting dressed as sacred — each garment a deliberate, meaningful choice.',
        images: [
            'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&q=80',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
            'https://images.unsplash.com/photo-1541694769-90b4e50b73db?w=1200&q=80',
        ],
        details: {
            Year: '2024',
            Type: 'Collection · Commercial',
            Role: 'Styling · Direction',
            Looks: '8',
        }
    }
};

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────

const lightbox = document.getElementById('wLightbox');
const lbBackdrop = document.getElementById('wLbBackdrop');
const lbClose = document.getElementById('wLbClose');
const lbMainImg = document.getElementById('wLbMainImg');
const lbThumbs = document.getElementById('wLbThumbs');
const lbTitle = document.getElementById('wLbTitle');
const lbEyebrow = document.getElementById('wLbEyebrow');
const lbDesc = document.getElementById('wLbDesc');
const lbDetails = document.getElementById('wLbDetails');
const lbCounter = document.getElementById('wLbCounter');
const lbPrev = document.getElementById('wLbPrev');
const lbNext = document.getElementById('wLbNext');

let lbImages = [];
let lbCurrent = 0;

function openLightbox(key) {
    const data = projects[key];
    if (!data) return;

    lbImages = data.images;
    lbCurrent = 0;

    // Populate info
    lbTitle.textContent = data.title;
    lbEyebrow.textContent = data.eyebrow;
    lbDesc.textContent = data.description;

    // Build detail rows
    lbDetails.innerHTML = Object.entries(data.details).map(([label, val]) =>
        `<div class="w-lb-detail-row">
            <span class="w-lb-detail-label">${label}</span>
            <span class="w-lb-detail-val">${val}</span>
        </div>`
    ).join('');

    // Build thumbnails
    lbThumbs.innerHTML = '';
    lbImages.forEach((src, i) => {
        const thumb = document.createElement('div');
        thumb.className = 'w-lb-thumb' + (i === 0 ? ' active' : '');
        thumb.innerHTML = `<img src="${src}" alt="${data.title} ${i + 1}" loading="lazy">`;
        thumb.addEventListener('click', () => setLbImage(i));
        lbThumbs.appendChild(thumb);
    });

    // Set main image
    lbMainImg.src = lbImages[0];
    lbMainImg.alt = data.title;

    updateLbCounter();

    // Show
    lightbox.removeAttribute('hidden');
    requestAnimationFrame(() => {
        lightbox.classList.add('active');
        lbBackdrop.classList.add('active');
    });
    document.body.style.overflow = 'hidden';
    lbClose.focus();
}

function setLbImage(index) {
    lbCurrent = (index + lbImages.length) % lbImages.length;

    lbMainImg.style.opacity = '0';
    setTimeout(() => {
        lbMainImg.src = lbImages[lbCurrent];
        lbMainImg.style.opacity = '1';
    }, 260);

    lbThumbs.querySelectorAll('.w-lb-thumb').forEach((t, i) => {
        t.classList.toggle('active', i === lbCurrent);
    });

    updateLbCounter();
}

function updateLbCounter() {
    lbCounter.textContent = `${lbCurrent + 1} / ${lbImages.length}`;
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lbBackdrop.classList.remove('active');
    setTimeout(() => {
        lightbox.setAttribute('hidden', '');
    }, 500);
    document.body.style.overflow = '';
}

lbClose.addEventListener('click', closeLightbox);
lbBackdrop.addEventListener('click', closeLightbox);

lbPrev.addEventListener('click', () => setLbImage(lbCurrent - 1));
lbNext.addEventListener('click', () => setLbImage(lbCurrent + 1));

document.querySelectorAll('.w-item-cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(btn.dataset.project);
    });
});

// Click entire card to open
document.querySelectorAll('.w-item').forEach(item => {
    item.addEventListener('click', () => {
        const btn = item.querySelector('.w-item-cta');
        if (btn) openLightbox(btn.dataset.project);
    });
});

// Keyboard navigation
document.addEventListener('keydown', e => {
    if (lightbox.hasAttribute('hidden')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') setLbImage(lbCurrent + 1);
    if (e.key === 'ArrowLeft') setLbImage(lbCurrent - 1);
});

// ─── FILTER ──────────────────────────────────────────────────────────────────

const filterBtns = document.querySelectorAll('.w-filter-btn');
const items = document.querySelectorAll('.w-item');
const countEl = document.getElementById('wFilterCount');
const emptyEl = document.getElementById('wEmpty');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        let visible = 0;

        items.forEach((item, i) => {
            const cats = item.dataset.category || '';
            const show = filter === 'all' || cats.includes(filter);

            if (show) {
                item.classList.remove('w-hidden');
                // Re-trigger animation
                item.classList.remove('visible');
                setTimeout(() => item.classList.add('visible'), i * 55);
                visible++;
            } else {
                item.classList.add('w-hidden');
                item.classList.remove('visible');
            }
        });

        countEl.textContent = `${visible} Project${visible !== 1 ? 's' : ''}`;
        emptyEl.hidden = visible > 0;
    });
});

// ─── INTERSECTION OBSERVER — Grid reveal ─────────────────────────────────────

const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
});

items.forEach(el => gridObserver.observe(el));

// ─── SCROLL-BASED PARALLAX ON HERO BG TEXT ───────────────────────────────────

const heroBgText = document.querySelector('.w-hero-bg-text');

if (heroBgText) {
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        heroBgText.style.transform = `translateY(${y * 0.18}px)`;
    }, { passive: true });
}
