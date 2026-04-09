/* ============================================================
   AMINE MOURABIT – PORTFOLIO JAVASCRIPT
   Matrix animation · Typewriter · Skill bars · Scroll effects
   ============================================================ */

'use strict';

// ── MATRIX RAIN ───────────────────────────────────────────────
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\#@';
  let drops = [];
  const fontSize = 13;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -50));
  }

  function draw() {
    ctx.fillStyle = 'rgba(5, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ffe7';
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
})();


// ── TYPEWRITER ────────────────────────────────────────────────
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  const phrases = [
    'Recherche d\'une alternance en Cybersécurité/Réseaux - 2 ans ',
    'Étudiant en L3 Informatique, Réseaux et Télécommunications',
    'Futur Master Réseaux et Télécommunications à l\'Université de Toulouse',
    'Cybersecurity Enthusiast',
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 45 : 80);
  }

  setTimeout(type, 600);
})();


// ── NAVBAR – SCROLL STATE + HAMBURGER ─────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 50
      ? '0 2px 40px rgba(0, 255, 231, 0.08)'
      : 'none';
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ── TRYHACKME DROPDOWN ── clic (mobile) + hover géré en CSS ──
  const dropdown = document.getElementById('nav-dropdown-thm');
  const toggleBtn = document.getElementById('nav-thm-toggle');

  if (dropdown && toggleBtn) {
    // Clic : ouvre/ferme (utile sur mobile et pour le clavier)
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Clic en dehors : ferme
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Échap : ferme
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();


// ── ACTIVE NAV LINK ON SCROLL ─────────────────────────────────
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();


// ── SCROLL ANIMATIONS (fade‑up) ───────────────────────────────
(function initFadeUp() {
  // Add class to animatable elements (programmatic)
  const autoTargets = document.querySelectorAll(
    '.stat-card, .skill-card, .net-node, .homelab-terminal, .thm-card, .lp-card, .about-text p, .contact-item'
  );
  autoTargets.forEach(el => el.classList.add('fade-up'));

  // Also observe elements that already have fade-up in HTML (e.g. timeline-item)
  const allTargets = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${(i % 4) * 80}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  allTargets.forEach(el => observer.observe(el));
})();


// ── SKILL BARS ────────────────────────────────────────────────
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const w = entry.target.getAttribute('data-width');
        entry.target.style.width = `${w}%`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
})();


// ── HOME LAB – NODE INTERACTIONS ──────────────────────────────
(function initHomeLab() {
  const diagram = document.getElementById('homelab-diagram');
  const body = document.getElementById('terminal-body');
  if (!diagram || !body) return;

  const nodeData = {
    pfsense: {
      title: 'pfSense',
      ip: '10.0.0.0/24',
      desc: 'Routeur et pare-feu central. Assure le <strong>cloisonnement strict des VLANs</strong> (DMZ, LAN, Management, Attaquant) et agit comme point de collecte réseau de premier niveau.',
      tags: ['Firewall', 'Routage', 'VLANs', 'Syslog']
    },
    dmz: {
      title: 'DMZ Web',
      ip: '10.0.3.0/24',
      desc: 'Zone exposée hébergeant une application vulnérable (<strong>DVWA</strong>). Sert de cible pour l\'investigation, la collecte d\'<strong>IoC</strong> et la future implémentation de règles de défense (WAF).',
      tags: ['DVWA', 'Apache', 'WAF', 'IoC']
    },
    siem: {
      title: 'SIEM (Splunk)',
      ip: '10.0.4.0/24',
      desc: 'Serveur de centralisation et d\'analyse. Ingère les <strong>journaux des serveurs Windows</strong>, les logs <strong>Syslog</strong> et <strong>Apache</strong> pour la détection d\'anomalies.',
      tags: ['Splunk', 'Log Analysis', 'Syslog', 'Détection']
    },
    attaquant: {
      title: 'Attaquant (Kali Linux)',
      ip: '10.0.66.0/24',
      desc: 'Environnement offensif isolé. Utilisé pour exécuter des <strong>tests de pénétration</strong> ciblés (compromission Active Directory, exploitation de failles Web sur DVWA) et générer le trafic malveillant à analyser.',
      tags: ['Kali Linux', 'Pentest', 'AD Attack', 'Red Team']
    },
    lan: {
      title: 'LAN Corporate',
      ip: '10.0.2.0/24',
      desc: 'Environnement d\'entreprise simulé (<strong>Windows Server AD</strong>, Client Win10). Déploiement d\'agents de collecte (<strong>Universal Forwarder</strong>) pour le monitoring des événements système.',
      tags: ['AD DS', 'Windows 10', 'Forwarder', 'Monitoring']
    },
    management: {
      title: 'Management (Ubuntu)',
      ip: '10.0.1.0/24',
      desc: 'Serveur de rebond administratif. Utilisé exclusivement pour accéder de manière sécurisée aux <strong>interfaces web d\'administration</strong> de l\'infrastructure (Splunk, console pfSense).',
      tags: ['Ubuntu', 'Administration', 'SSH', 'Rebond']
    }
  };

  diagram.addEventListener('click', (e) => {
    const node = e.target.closest('.net-node');
    if (!node) return;

    const key = node.dataset.node;
    const data = nodeData[key];
    if (!data) return;

    // Toggle active state
    diagram.querySelectorAll('.net-node').forEach(n => n.classList.remove('active'));
    node.classList.add('active');

    // Build terminal content
    const tagsHtml = data.tags
      .map(t => `<span class="tag">${t}</span>`)
      .join('');

    body.innerHTML = `
      <p class="terminal-title"><span class="accent">&gt;</span> ${data.title}</p>
      <span class="terminal-ip">${data.ip}</span>
      <p class="terminal-desc">${data.desc}</p>
      <div class="terminal-tags">${tagsHtml}</div>
      <span class="terminal-cursor"></span>
    `;

    // Smooth scroll to terminal on mobile
    if (window.innerWidth <= 1024) {
      document.getElementById('homelab-terminal').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  });
})();


// ── GLITCH EFFECT ON HERO NAME ────────────────────────────────
(function initGlitch() {
  const name = document.querySelector('.hero-name');
  if (!name) return;

  function glitch() {
    name.classList.add('glitching');
    setTimeout(() => name.classList.remove('glitching'), 300);
  }

  // Random glitch every 5-12 seconds
  function schedule() {
    const delay = 5000 + Math.random() * 7000;
    setTimeout(() => { glitch(); schedule(); }, delay);
  }
  schedule();
})();


// ── CONTACT FORM ──────────────────────────────────────────────
async function handleSubmit(event) {
  // Empêche le rechargement classique de la page
  event.preventDefault();

  const form = event.target;
  const status = document.getElementById("form-status");
  const data = new FormData(form);
  const submitButton = document.getElementById("form-submit");

  // Change le texte du bouton pendant l'envoi pour faire patienter l'utilisateur
  submitButton.innerText = "Envoi en cours...";

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      status.innerHTML = "Message envoyé avec succès ! Je vous réponds très vite.";
      status.style.color = "var(--accent)"; // Utilise le beau cyan de ton CSS
      form.reset(); // Vide le formulaire
    } else {
      status.innerHTML = "Oops ! Un problème est survenu lors de l'envoi.";
      status.style.color = "var(--accent3)"; // Utilise le rouge/rose de ton CSS
    }
  } catch (error) {
    status.innerHTML = "Oops ! Impossible de joindre le serveur.";
    status.style.color = "var(--accent3)";
  } finally {
    // Remet le texte du bouton à la normale
    submitButton.innerText = "Envoyer le message";
  }
}


// ── CURSOR TRAIL ──────────────────────────────────────────────
(function initCursorTrail() {
  const trail = [];
  const count = 8;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.cssText = `
      position:fixed; pointer-events:none; z-index:9999;
      width:${6 - i * 0.5}px; height:${6 - i * 0.5}px;
      background:rgba(0,255,231,${0.6 - i * 0.07});
      border-radius:50%;
      transition:transform 0.05s;
      will-change:left,top;
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animate() {
    let px = mx, py = my;
    trail.forEach((t, i) => {
      t.x += (px - t.x) * (1 - i * 0.08);
      t.y += (py - t.y) * (1 - i * 0.08);
      t.el.style.left = `${t.x - 3}px`;
      t.el.style.top = `${t.y - 3}px`;
      px = t.x; py = t.y;
    });
    requestAnimationFrame(animate);
  }
  animate();
})();


// ── GLITCH CSS INJECTION ──────────────────────────────────────
(function injectGlitchStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .hero-name { position: relative; }
    .hero-name.glitching::before,
    .hero-name.glitching::after {
      content: attr(data-text);
      position: absolute;
      left: 0; top: 0;
      width: 100%; height: 100%;
      opacity: 0.8;
    }
    .hero-name.glitching::before {
      color: #ff3c6e;
      clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
      transform: translateX(-4px);
      animation: glitch1 0.3s step-end infinite;
    }
    .hero-name.glitching::after {
      color: #00ffe7;
      clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
      transform: translateX(4px);
      animation: glitch2 0.3s step-end infinite;
    }
    @keyframes glitch1 {
      0%   { transform: translateX(-4px) skew(-1deg); }
      33%  { transform: translateX(4px)  skew(1deg); }
      66%  { transform: translateX(-2px) skew(-0.5deg); }
      100% { transform: translateX(0px); }
    }
    @keyframes glitch2 {
      0%   { transform: translateX(4px) skew(1deg); }
      33%  { transform: translateX(-4px) skew(-1deg); }
      66%  { transform: translateX(2px) skew(0.5deg); }
      100% { transform: translateX(0px); }
    }
    .nav-links a.active { color: var(--accent) !important; }
    .nav-links a.active::after { width: 100% !important; }
  `;
  document.head.appendChild(style);

  // Set data-text on hero name for glitch effect
  const name = document.querySelector('.hero-name');
  if (name) name.setAttribute('data-text', name.textContent);
})();


// ── TRYHACKME – ROOM CARD FILTERS ─────────────────────────────
(function initThmFilters() {
  const filterWrap = document.getElementById('thm-filters');
  const grid = document.getElementById('thm-grid');
  if (!filterWrap || !grid) return;

  const buttons = filterWrap.querySelectorAll('.thm-filter-btn');
  const cards = grid.querySelectorAll('.thm-card');

  filterWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.thm-filter-btn');
    if (!btn) return;

    // Toggle active button
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        const categories = card.dataset.category || '';
        card.classList.toggle('hidden', !categories.includes(filter));
      }
    });
  });
})();


// ── TRYHACKME – LEARNING PATH BARS ────────────────────────────
(function initLpBars() {
  const fills = document.querySelectorAll('.lp-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const w = entry.target.getAttribute('data-width');
        entry.target.style.width = `${w}%`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
})();
