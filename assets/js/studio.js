/* IronBench Labs — studio theme behaviour. No dependencies. */
(function () {
    'use strict';

    var root = document.documentElement;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Email addresses are assembled here so they never appear in the raw HTML.
    document.querySelectorAll('.ibl-email').forEach(function (el) {
        var user = el.getAttribute('data-user');
        var domain = el.getAttribute('data-domain');
        if (!user || !domain) return;
        var addr = user + '@' + domain;
        if (el.tagName === 'A') el.setAttribute('href', 'mailto:' + addr);
        el.textContent = addr;
    });

    // Lights switch. The initial theme is set inline in <head> to avoid a flash.
    var lights = document.getElementById('theme-toggle');
    if (lights) {
        lights.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('ibl-theme', next); } catch (e) { /* private mode: fine */ }
        });
    }

    // Mobile menu.
    var menuBtn = document.getElementById('menu-btn');
    var nav = document.getElementById('nav');
    function setMenu(open) {
        root.classList.toggle('nav-open', open);
        if (menuBtn) {
            menuBtn.setAttribute('aria-expanded', String(open));
            menuBtn.textContent = open ? 'Close' : 'Menu';
        }
    }
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function () { setMenu(!root.classList.contains('nav-open')); });
        nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    }

    // Ticker: duplicate the set once so the -50% loop is seamless.
    document.querySelectorAll('.ticker-track').forEach(function (track) {
        var set = track.querySelector('.ticker-set');
        if (!set) return;
        var clone = set.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    // Scroll reveal.
    var revealEls = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || reduced) {
        revealEls.forEach(function (el) { el.classList.add('is-in'); });
    } else {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-in');
                io.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        revealEls.forEach(function (el) { io.observe(el); });
    }

    // Scroll progress bar.
    var bar = document.querySelector('.progress');
    if (bar) {
        var ticking = false;
        var update = function () {
            var max = root.scrollHeight - window.innerHeight;
            bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
            ticking = false;
        };
        window.addEventListener('scroll', function () {
            if (!ticking) { ticking = true; requestAnimationFrame(update); }
        }, { passive: true });
        update();
    }

    if (finePointer && !reduced) {
        // Hero stickers drift a little with the pointer.
        var hero = document.querySelector('.hero');
        var shelf = document.querySelector('.shelf');
        if (hero && shelf) {
            hero.addEventListener('pointermove', function (e) {
                var r = hero.getBoundingClientRect();
                shelf.style.setProperty('--px', (((e.clientX - r.left) / r.width) - 0.5) * 14);
                shelf.style.setProperty('--py', (((e.clientY - r.top) / r.height) - 0.5) * 10);
            });
            hero.addEventListener('pointerleave', function () {
                shelf.style.setProperty('--px', 0);
                shelf.style.setProperty('--py', 0);
            });
        }

        // Work tiles tilt toward the pointer.
        document.querySelectorAll('.tile').forEach(function (tile) {
            tile.addEventListener('pointermove', function (e) {
                var r = tile.getBoundingClientRect();
                var x = (e.clientX - r.left) / r.width - 0.5;
                var y = (e.clientY - r.top) / r.height - 0.5;
                tile.style.setProperty('--ry', (x * 7).toFixed(2) + 'deg');
                tile.style.setProperty('--rx', (-y * 7).toFixed(2) + 'deg');
            });
            tile.addEventListener('pointerleave', function () {
                tile.style.setProperty('--rx', '0deg');
                tile.style.setProperty('--ry', '0deg');
            });
        });
    }

    // For the curious.
    if (window.console && console.log) {
        console.log('%cIronBench Labs', 'font: 800 22px system-ui; color: #FF4B1F;');
        console.log('Reading the console? We like you already. Say hello: ironbench.org/contact-me.html');
    }
})();
