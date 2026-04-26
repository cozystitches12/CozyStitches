/* ============================================================
   COZY STITCHES — app.js
   Reads content from admin panel (localStorage) first,
   then falls back to content.js defaults.
   ============================================================ */

const BLOG_KEY    = 'cs_posts';
const GALLERY_KEY = 'cs_projects';

// ── GET CONTENT ───────────────────────────────────────────────
// Tries localStorage first (admin panel), falls back to content.js

function getActivePosts() {
  try {
    const stored = JSON.parse(localStorage.getItem(BLOG_KEY));
    if (stored && stored.length) return stored;
  } catch(e) {}
  return typeof POSTS !== 'undefined' ? POSTS : [];
}

function getActiveProjects() {
  try {
    const stored = JSON.parse(localStorage.getItem(GALLERY_KEY));
    if (stored && stored.length) return stored;
  } catch(e) {}
  return typeof PROJECTS !== 'undefined' ? PROJECTS : [];
}

// ── HELPERS ───────────────────────────────────────────────────
function tagClass(cat) {
  const map = {amigurumi:'tag-amigurumi',blankets:'tag-blankets',tutorials:'tag-tutorials',
    hauls:'tag-hauls',accessories:'tag-accessories',home:'tag-home',wip:'tag-wip'};
  return map[cat] || 'tag-wip';
}

function catLabel(cat) {
  return cat === 'hauls' ? 'yarn hauls' : cat;
}

function imgOrPlaceholder(image, color, alt) {
  if (image) return `<img src="${image}" alt="${alt}" style="width:100%;height:100%;object-fit:cover;"/>`;
  return `<div class="img-placeholder" style="background:${color||'linear-gradient(135deg,#B8C5E8,#D8D0F0)'};">📷</div>`;
}

// ── HAMBURGER ─────────────────────────────────────────────────
function initHamburger() {
  const btn  = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function() {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    const s = btn.querySelectorAll('span');
    if (open) {
      s[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      s[1].style.opacity   = '0';
      s[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      s[0].style.transform = s[1].style.opacity = s[2].style.transform = '';
    }
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// ── LIGHTBOX ──────────────────────────────────────────────────
function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const lbImg   = lb.querySelector('.lightbox-img');
  const lbTitle = lb.querySelector('.lightbox-title');
  const lbDesc  = lb.querySelector('.lightbox-desc');
  const lbTag   = lb.querySelector('.lightbox-tag');

  document.addEventListener('click', function(e) {
    const card = e.target.closest('.gal-card[data-id]');
    if (!card) return;
    const proj = getActiveProjects().find(p => p.id === card.dataset.id);
    if (!proj) return;
    lbTitle.textContent = proj.title;
    lbDesc.textContent  = proj.desc || '';
    lbTag.textContent   = catLabel(proj.category);
    lbTag.className     = `tag ${tagClass(proj.category)}`;
    lbImg.innerHTML     = proj.image
      ? `<img src="${proj.image}" alt="${proj.title}" style="width:100%;height:100%;object-fit:cover;"/>`
      : `<div class="img-placeholder" style="background:${proj.color||'linear-gradient(135deg,#B8C5E8,#D8D0F0)'};height:100%;">📷</div>`;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// ── BLOG FILTER ───────────────────────────────────────────────
function initBlogFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  if (!btns.length) return;
  btns.forEach(btn => btn.addEventListener('click', function() {
    btns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const f = this.dataset.filter;
    document.querySelectorAll('.blog-card').forEach(card => {
      card.style.display = (f === 'all' || card.dataset.category === f) ? '' : 'none';
    });
  }));
}

// ── COMMENT FORM ──────────────────────────────────────────────
function initCommentForm() {
  const form = document.getElementById('comment-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name    = form.querySelector('#comment-name').value.trim();
    const comment = form.querySelector('#comment-text').value.trim();
    if (!name || !comment) { alert('Please fill in both fields! 🧶'); return; }
    const div = document.createElement('div');
    div.style.cssText = 'background:#EEF2FC;border-radius:12px;padding:14px 18px;color:#1E2D7A;font-weight:600;margin-top:14px;font-family:Nunito,sans-serif;';
    div.textContent = `Thanks ${name}! 🌙 Your comment is waiting for approval.`;
    form.appendChild(div);
    form.reset();
    setTimeout(() => div.remove(), 5000);
  });
}

// ── BUILD HOME ────────────────────────────────────────────────
function buildHomePage() {
  if (!document.getElementById('home-hero')) return;
  const posts    = getActivePosts();
  const projects = getActiveProjects();
  const site     = typeof SITE !== 'undefined' ? SITE : {homePostsCount:3, homeGalleryCount:4};
  const latest   = posts[0];

  if (latest) {
    document.getElementById('home-hero').innerHTML = `
      <div class="container">
        <div class="hero-image">${imgOrPlaceholder(latest.image, latest.color, latest.title)}</div>
        <div class="hero-content">
          <div class="hero-eyebrow">✨ Latest Post</div>
          <h1>${latest.title}</h1>
          <div class="hero-meta">
            <span class="tag ${tagClass(latest.category)}">${catLabel(latest.category)}</span>
            <span class="hero-date">${formatDisplayDate(latest.date)}</span>
          </div>
          <p class="hero-excerpt">${latest.excerpt}</p>
          <a href="post.html?id=${latest.id}" class="btn btn-primary">Read the post →</a>
        </div>
      </div>`;
  }

  const recent = posts.slice(1, (site.homePostsCount || 3) + 1);
  document.getElementById('recent-posts').innerHTML = recent.length ? recent.map(post => `
    <article class="post-card">
      <div class="post-card-img">${imgOrPlaceholder(post.image, post.color, post.title)}</div>
      <div class="post-card-body">
        <span class="tag ${tagClass(post.category)}">${catLabel(post.category)}</span>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <div class="post-card-footer">
          <span class="post-date">${formatDisplayDate(post.date)}</span>
          <a href="post.html?id=${post.id}" class="read-more">Read →</a>
        </div>
      </div>
    </article>`).join('') : '<p style="color:var(--grey);text-align:center;padding:20px;">More posts coming soon! 🧶</p>';

  const gallItems = projects.slice(0, site.homeGalleryCount || 4);
  document.getElementById('gallery-preview').innerHTML = gallItems.map(p => `
    <div class="gallery-item" style="${p.image ? '' : 'background:' + (p.color||'linear-gradient(135deg,#B8C5E8,#D8D0F0)')}">
      ${p.image ? `<img src="${p.image}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;"/>` : '🧶 ' + p.title}
      <div class="gallery-overlay"><span>${p.title}</span></div>
    </div>`).join('');
}

// ── BUILD BLOG ────────────────────────────────────────────────
function buildBlogPage() {
  const el = document.getElementById('blog-list');
  if (!el) return;
  const posts = getActivePosts();
  el.innerHTML = posts.length ? posts.map(post => `
    <article class="blog-card" data-category="${post.category}">
      <div class="blog-card-img">${imgOrPlaceholder(post.image, post.color, post.title)}</div>
      <div class="blog-card-content">
        <div class="blog-card-meta">
          <span class="tag ${tagClass(post.category)}">${catLabel(post.category)}</span>
          <span class="date">${formatDisplayDate(post.date)}</span>
        </div>
        <h2>${post.title}</h2>
        <p>${post.excerpt}</p>
        <a href="post.html?id=${post.id}" class="btn btn-primary">Read the full post →</a>
      </div>
    </article>`).join('')
    : '<p style="color:var(--grey);text-align:center;padding:40px;">No posts yet — check back soon! 🧶</p>';
}

// ── BUILD GALLERY ─────────────────────────────────────────────
function buildGalleryPage() {
  const el = document.getElementById('gallery-grid');
  if (!el) return;
  const projects = getActiveProjects();

  const cards = projects.map(proj => `
    <div class="gal-card" data-id="${proj.id}">
      <div class="gal-card-img" style="${proj.image ? '' : 'background:' + (proj.color||'linear-gradient(135deg,#B8C5E8,#D8D0F0)')}">
        ${proj.image ? `<img src="${proj.image}" alt="${proj.title}"/>` : '📷 Add photo'}
      </div>
      <div class="gal-card-body">
        <h3>${proj.title}</h3>
        <p class="gal-meta">${proj.date}</p>
        <span class="tag ${tagClass(proj.category)}">${catLabel(proj.category)}</span>
      </div>
    </div>`).join('');

  const comingSoon = `
    <div class="gal-card coming-soon">
      <div class="gal-card-img" style="background:var(--cloud);flex-direction:column;gap:10px;">
        <span style="font-size:2rem;">🧶</span>
        <span style="color:var(--grey);font-size:0.85rem;">More coming soon!</span>
      </div>
      <div class="gal-card-body">
        <h3 style="color:var(--grey);">Next project...</h3>
        <p class="gal-meta">Coming soon</p>
      </div>
    </div>`;

  el.innerHTML = cards + comingSoon;
}

// ── BUILD ABOUT ───────────────────────────────────────────────
function buildAboutPage() {
  if (!document.getElementById('about-photo')) return;
  const about = typeof ABOUT !== 'undefined' ? ABOUT : {};
  document.getElementById('about-photo').innerHTML = about.photo
    ? `<img src="${about.photo}" alt="${about.name}"/>`
    : '📷 Add your photo in admin';
  document.getElementById('about-name').textContent = `Hi, I'm ${about.name || 'Your Name'}! 👋`;
  document.getElementById('about-bio').innerHTML = (about.bio || []).map(p => `<p>${p}</p>`).join('');
  document.getElementById('about-facts').innerHTML = (about.facts || []).map(f => `
    <div class="fact-card">
      <div class="fact-emoji">${f.emoji}</div>
      <div class="fact-text"><h3>${f.title}</h3><p>${f.body}</p></div>
    </div>`).join('');
}

// ── BUILD POST PAGE ───────────────────────────────────────────
function buildPostPage() {
  const el = document.getElementById('post-content');
  if (!el) return;
  const id   = new URLSearchParams(window.location.search).get('id');
  const post = getActivePosts().find(p => p.id === id);

  if (!post) {
    el.innerHTML = `<div style="text-align:center;padding:60px 20px;"><h2>Post not found 🧶</h2><p style="margin-top:12px;"><a href="blog.html" style="color:var(--peach);font-weight:700;">← Back to all posts</a></p></div>`;
    return;
  }

  document.title = `${post.title} — Cozy Stitches`;

  const bodyHtml = (post.body || post.excerpt)
    .split('\n\n').map(p => `<p>${p.replace(/\n/g,'<br/>')}</p>`).join('');

  el.innerHTML = `
    <div class="post-hero-img">
      ${post.image ? `<img src="${post.image}" alt="${post.title}"/>` : `<div class="img-placeholder" style="background:${post.color||'linear-gradient(135deg,#B8C5E8,#D8D0F0)'};height:320px;">📷</div>`}
    </div>
    <div class="post-body">
      <div class="post-meta">
        <a href="blog.html" class="back-link">← All posts</a>
        <span class="tag ${tagClass(post.category)}">${catLabel(post.category)}</span>
        <span class="post-date-full">${formatDisplayDate(post.date)}</span>
      </div>
      <h1 class="post-title">${post.title}</h1>
      <div class="post-text">${bodyHtml}</div>
    </div>`;
}

// ── DATE FORMATTING ───────────────────────────────────────────
function formatDisplayDate(d) {
  if (!d) return '';
  try {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'});
  } catch(e) { return d; }
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  initHamburger();
  initLightbox();
  initBlogFilter();
  initCommentForm();
  buildHomePage();
  buildBlogPage();
  buildGalleryPage();
  buildAboutPage();
  buildPostPage();
});
