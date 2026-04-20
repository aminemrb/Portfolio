'use strict';

(function initSiteHeader() {
  const mount = document.querySelector('[data-site-header]');
  if (!mount) return;

  const page = mount.dataset.page || 'index';

  const headers = {
    index: `
      <nav id="navbar">
        <div class="nav-logo">AMINE<span class="accent">_</span></div>
        <ul class="nav-links">
          <li><a href="#about" id="nav-about">À propos</a></li>
          <li><a href="#formation" id="nav-formation">Formation</a></li>
          <li><a href="homelab.html" id="nav-homelab">Home Lab</a></li>
          <li><a href="tryhackme.html">TryHackMe</a></li>
          <li><a href="#contact" id="nav-contact">Contact</a></li>
        </ul>
        <button class="hamburger" id="hamburger" aria-label="Menu">&#9776;</button>
      </nav>
    `,
    homelab: `
      <nav id="navbar" style="top:0">
        <div class="nav-logo"><a href="index.html" style="color:inherit">AMINE<span class="accent">_</span></a></div>
        <ul class="nav-links">
          <li><a href="index.html#about">À propos</a></li>
          <li><a href="index.html#formation">Formation</a></li>
          <li><a href="homelab.html" class="active" id="nav-homelab" aria-current="page">Home Lab</a></li>
          <li><a href="tryhackme.html">TryHackMe</a></li>
          <li><a href="index.html#contact">Contact</a></li>
        </ul>
        <button class="hamburger" id="hamburger" aria-label="Menu">&#9776;</button>
      </nav>
    `,
    tryhackme: `
      <nav id="navbar" style="top:0">
        <div class="nav-logo"><a href="index.html" style="color:inherit">AMINE<span class="accent">_</span></a></div>
        <ul class="nav-links">
          <li><a href="index.html#about">À propos</a></li>
          <li><a href="index.html#formation">Formation</a></li>
          <li><a href="homelab.html">Home Lab</a></li>
          <li><a href="tryhackme.html" class="active" id="nav-thm" aria-current="page">TryHackMe</a></li>
          <li><a href="index.html#contact">Contact</a></li>
        </ul>
        <button class="hamburger" id="hamburger" aria-label="Menu">&#9776;</button>
      </nav>
    `,
    writeup: `
      <nav id="navbar" style="top:0">
        <div class="nav-logo"><a href="../index.html" style="color:inherit">AM<span class="accent">_</span></a></div>
        <ul class="nav-links">
          <li><a href="../index.html#about">À propos</a></li>
          <li><a href="../index.html#formation">Formation</a></li>
          <li><a href="../homelab.html">Home Lab</a></li>
          <li><a href="../tryhackme.html" class="active" id="nav-thm" aria-current="page">TryHackMe</a></li>
          <li><a href="../index.html#contact">Contact</a></li>
        </ul>
        <button class="hamburger" id="hamburger" aria-label="Menu">&#9776;</button>
      </nav>
    `,
  };

  mount.outerHTML = headers[page] || headers.index;
})();