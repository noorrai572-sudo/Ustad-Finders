/*
  UstadFinder — Main Script
  Author: Noor-ul-huda
  DecodeLabs Full Stack Internship · Batch 2026
*/

// typewriter
const words = ['Electricians','Plumbers','AC Technicians','Painters','Carpenters'];
let wi = 0, ci = 0, deleting = false;
const el = document.getElementById('typewriter');

function type() {
  const word = words[wi];
  if (!deleting) {
    el.innerHTML = word.slice(0, ++ci) + '<span class="cursor" aria-hidden="true"></span>';
    if (ci === word.length) { deleting = true; setTimeout(type, 1600); return; }
  } else {
    el.innerHTML = word.slice(0, --ci) + '<span class="cursor" aria-hidden="true"></span>';
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// navbar scroll
const navbar = document.getElementById('navbar');
const navCta = document.getElementById('navCta');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    navCta.style.display = 'inline-flex';
  } else {
    navbar.classList.remove('scrolled');
    navCta.style.display = 'none';
  }

  /* Active nav links */
  const sections = ['hero','services','how','testimonials','contact'];
  let current = '';
  sections.forEach(id => {
    const sec = document.getElementById(id);
    if (sec && window.scrollY >= sec.offsetTop - 100) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });

  /* Scroll top btn */
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 400);
});

// mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
function closeMobileNav() {
  mobileNav.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// filter pills
function filterWorkers(cat, btn) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const cards = document.querySelectorAll('.worker-card');
  let visible = 0;
  cards.forEach(c => {
    const show = cat === 'all' || c.dataset.category === cat;
    c.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  document.getElementById('noResults').style.display = visible === 0 ? 'block' : 'none';
}

// live search
function runSearch() {
  const name = document.getElementById('workerSearch').value.toLowerCase();
  const city = document.getElementById('citySearch').value.toLowerCase();
  const cards = document.querySelectorAll('.worker-card');
  let visible = 0;
  cards.forEach(c => {
    const matchName = !name || c.dataset.name.includes(name);
    const matchCity = !city || c.dataset.city.includes(city);
    c.style.display = matchName && matchCity ? '' : 'none';
    if (matchName && matchCity) visible++;
  });
  document.getElementById('noResults').style.display = visible === 0 ? 'block' : 'none';
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  document.querySelector('.filter-pill').classList.add('active');
  document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}
document.getElementById('workerSearch').addEventListener('keydown', e => { if (e.key === 'Enter') runSearch(); });
document.getElementById('citySearch').addEventListener('keydown', e => { if (e.key === 'Enter') runSearch(); });

// hero category btns
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// steps interaction
document.querySelectorAll('.step-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.step-item').forEach(s => s.classList.remove('active'));
    item.classList.add('active');
  });
});

// counter animation
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '+';
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current).toLocaleString() + suffix;
      if (current >= target) clearInterval(timer);
    }, 20);
  });
}
let countersRun = false;

// intersection observer - fade-ins + trigger counters
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (!countersRun && entry.target.closest('#hero')) {
        countersRun = true;
        setTimeout(animateCounters, 400);
      }
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* Start hero counters after a short delay anyway */
setTimeout(() => { if (!countersRun) { countersRun = true; animateCounters(); } }, 800);

// form submit handler
document.getElementById('jobForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('fname').value.trim();
  const phone   = document.getElementById('fphone').value.trim();
  const city    = document.getElementById('fcity').value;
  const service = document.getElementById('fservice').value;
  const desc    = document.getElementById('fdesc').value.trim();
  if (!name || !phone || !city || !service || !desc) {
    alert('Please fill in all required fields.');
    return;
  }
  this.style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
});
