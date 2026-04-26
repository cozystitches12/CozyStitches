/* ============================================================
   COZY STITCHES — app.js
   Fetches posts and gallery items directly from GitHub
   (_posts/*.md and _gallery/*.md files created by Pages CMS)
   Falls back to content.js defaults if no files found.
   ============================================================ */

// ── GITHUB SETTINGS ──────────────────────────────────────────
// Your GitHub username and repository name
const GITHUB_USER = 'cozystitches12';
const GITHUB_REPO = 'cozystitches';
const GITHUB_BRANCH = 'main';

// GitHub API base URL
const API = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents`;
const RAW = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

// ── MARKDOWN PARSER ───────────────────────────────────────────
// Parses the frontmatter (---) from Pages CMS markdown files
function parseFrontmatter(text) {
  const result = { fields: {}, body: '' };
  const match  = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    result.body = text;
    return result;
  }
  // Parse each field line
  match[1].split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    result.fields[key] = val;
  });
  result.body = match[2].trim();
  return result;
}

// ── FETCH FILES FROM GITHUB ───────────────────────────────────
// Gets a list of files from a GitHub folder
async function fetchFileList(folder) {
  try {
    const res = await fetch(`${API}/${folder}?ref=${GITHUB_BRANCH}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });
    if (!res.ok) return [];
    const files = await res.json();
    return files.filter(f => f.name.endsWith('.md'));
  } catch(e) {
    return [];
  }
}

// Gets the content of a single file from GitHub
async function fetchFile(path) {
  try {
    const res = await fetch(`${RAW}/${path}`);
    if (!res.ok) return null;
    return await res.text();
  } catch(e) {
    return null;
  }
}

// ── LOAD ALL POSTS ────────────────────────────────────────────
async function loadPosts() {
  const files = await fetchFileList('_posts');
  if (!files.length) {
    // Fall back to content.js defaults
    return typeof POSTS !== 'undefined' ? POSTS : [];
  }

  const posts = await Promise.all(files.map(async file => {
    const text = await fetchFile(`_posts/${file.name}`);
    if (!text) return null;
    const { fields, body } = parseFrontmatter(text);
    return {
      id:       file.name.replace('.md', ''),
      title:    fields.title    || 'Untitled',
      date:     fields.date     || '',
      category: fields.category || 'wip',
      excerpt:  fields.excerpt  || '',
      body:     body            || fields.excerpt || '',
      image:    fields.image    ? `${RAW}${fields.image.startsWith('/') ? '' : '/'}${fields.image}` : '',
      color:    fields.color    || randomGradient(),
    };
  }));

  // Filter out nulls and sort newest first by date
  return posts
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ── LOAD ALL GALLERY PROJECTS ─────────────────────────────────
async function loadProjects() {
  const files = await fetchFileList('_gallery');
  if (!files.length) {
    return typeof PROJECTS !== 'undefined' ? PROJECTS : [];
  }

  const projects = await Promise.all(files.map(async file => {
    const text = await fetchFile(`_gallery/${file.name}`);
    if (!text) return null;
    const { fields, body } = parseFrontmatter(text);
    return {
      id:       file.name.replace('.md', ''),
      title:    fields.title    || 'Untitled',
      date:     fields.date     || '',
      category: fields.category || 'wip',
      desc:     fields.desc     || body || '',
      image:    fields.image    ? `${RAW}${fields.image.startsWith('/') ? '' : '/'}${fields.image}` : '',
      color:    fields.color    || randomGradient(),
    };
  }));

  return projects
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ── HELPERS ───────────────────────────────────────────────────
function tagClass(cat) {
  const map = {
    amigurumi:'tag-amigurumi', blankets:'tag-blankets',
    tutorials:'tag-tutorials', hauls:'tag-hauls',
    accessories:'tag-accessories', home:'tag-home', wip:'tag-wip'
  };
  return map[cat] || 'tag-wip';
}

function catLabel(cat) {
  return cat === 'hauls' ? 'yarn hauls' : (cat || '');
}

function formatDate(d) {
  if (!d) return '';
  try {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', {
      day:'numeric', month:'long', year:'numeric'
    });
  } catch(e) { return d; }
}

function imgTag(image, color, alt) {
  if (image) return `<img src="${image}" alt="${alt}" style="width:100%;height:100%;object-fit:cover;"/>`;
  return `<div class="img-placeholder" style="background:${color||'linear-gradient(135deg,#B8C5E8,#D8D0F0)'};">📷</div>`;
}

const GRADIENTS = [
  'linear-gradient(135deg,#B8C5E8,#D8D0F0)',
  'linear-gradient(135deg,#F0AE80,#F7D5E8)',
  'linear-gradient(135deg,#F7D5E8,#F5DC90)',
  'linear-gradient(135deg,#D8D0F0,#B8C5E8)',
  'linear-gradient(135deg,#F5DC90,#F0AE80)',
];
function randomGradient() {
  return GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
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
      s[0].style.transform = s[2].style.transform = '';
      s[1].style.opacity   = '';
    }
  });
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );
}

// ── LIGHTBOX ──────────────────────────────────────────────────
function initLightbox(projects) {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const lbImg   = lb.querySelector('.lightbox-img');
  const lbTitle = lb.querySelector('.lightbox-title');
  const lbDesc  = lb.querySelector('.lightbox-desc');
  const lbTag   = lb.querySelector('.lightbox-tag');

  document.addEventListener('click', function(e) {
    const card = e.target.closest('.gal-card[data-id]');
    if (!card) return;
    const proj = projects.find(p => p.id === card.dataset.id);
    if (!proj) return;
    lbTitle.textContent = proj.title;
    lbDesc.textContent  = proj.desc || '';
    lbTag.textContent   = catLabel(proj.category);
    lbTag.className     = `tag ${tagClass(proj.category)}`;
    lbImg.innerHTML     = imgTag(proj.image, proj.color, proj.title);
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

// ── LOADING SPINNER ───────────────────────────────────────────
function showLoading(id) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = `
    <div style="text-align:center;padding:40px 20px;color:var(--grey);">
      <div style="font-size:2rem;margin-bottom:8px;">🧶</div>
      <p>Loading...</p>
    </div>`;
}

// ── BUILD HOME PAGE ───────────────────────────────────────────
async function buildHomePage() {
  if (!document.getElementById('home-hero')) return;
  const site = typeof SITE !== 'undefined' ? SITE : {homePostsCount:3, homeGalleryCount:4};

  showLoading('recent-posts');
  showLoading('gallery-preview');

  const [posts, projects] = await Promise.all([loadPosts(), loadProjects()]);
  const latest = posts[0];

  // HERO
  if (latest) {
    document.getElementById('home-hero').innerHTML = `
      <div class="container">
        <div class="hero-image">${imgTag(latest.image, latest.color, latest.title)}</div>
        <div class="hero-content">
          <div class="hero-eyebrow">✨ Latest Post</div>
          <h1>${latest.title}</h1>
          <div class="hero-meta">
            <span class="tag ${tagClass(latest.category)}">${catLabel(latest.category)}</span>
            <span class="hero-date">${formatDate(latest.date)}</span>
          </div>
          <p class="hero-excerpt">${latest.excerpt}</p>
          <a href="post.html?id=${latest.id}" class="btn btn-primary">Read the post →</a>
        </div>
      </div>`;
  }

  // RECENT POSTS
  const recent = posts.slice(1, (site.homePostsCount || 3) + 1);
  document.getElementById('recent-posts').innerHTML = recent.length
    ? recent.map(post => `
      <article class="post-card">
        <div class="post-card-img">${imgTag(post.image, post.color, post.title)}</div>
        <div class="post-card-body">
          <span class="tag ${tagClass(post.category)}">${catLabel(post.category)}</span>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <div class="post-card-footer">
            <span class="post-date">${formatDate(post.date)}</span>
            <a href="post.html?id=${post.id}" class="read-more">Read →</a>
          </div>
        </div>
      </article>`).join('')
    : '<p style="color:var(--grey);text-align:center;padding:20px;">More posts coming soon! 🧶</p>';

  // GALLERY PREVIEW
  const gallItems = projects.slice(0, site.homeGalleryCount || 4);
  document.getElementById('gallery-preview').innerHTML = gallItems.map(p => `
    <div class="gallery-item" style="${p.image ? '' : 'background:' + p.color}">
      ${p.image ? `<img src="${p.image}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;"/>` : '🧶 ' + p.title}
      <div class="gallery-overlay"><span>${p.title}</span></div>
    </div>`).join('');
}

// ── BUILD BLOG PAGE ───────────────────────────────────────────
async function buildBlogPage() {
  const el = document.getElementById('blog-list');
  if (!el) return;

  showLoading('blog-list');
  const posts = await loadPosts();

  el.innerHTML = posts.length
    ? posts.map(post => `
      <article class="blog-card" data-category="${post.category}">
        <div class="blog-card-img">${imgTag(post.image, post.color, post.title)}</div>
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <span class="tag ${tagClass(post.category)}">${catLabel(post.category)}</span>
            <span class="date">${formatDate(post.date)}</span>
          </div>
          <h2>${post.title}</h2>
          <p>${post.excerpt}</p>
          <a href="post.html?id=${post.id}" class="btn btn-primary">Read the full post →</a>
        </div>
      </article>`).join('')
    : '<p style="color:var(--grey);text-align:center;padding:40px;">No posts yet — check back soon! 🧶</p>';

  initBlogFilter();
}

// ── BUILD GALLERY PAGE ────────────────────────────────────────
async function buildGalleryPage() {
  const el = document.getElementById('gallery-grid');
  if (!el) return;

  showLoading('gallery-grid');
  const projects = await loadProjects();
  initLightbox(projects);

  const cards = projects.map(proj => `
    <div class="gal-card" data-id="${proj.id}">
      <div class="gal-card-img" style="${proj.image ? '' : 'background:' + proj.color}">
        ${proj.image ? `<img src="${proj.image}" alt="${proj.title}"/>` : '📷 Add photo'}
      </div>
      <div class="gal-card-body">
        <h3>${proj.title}</h3>
        <p class="gal-meta">${proj.date}</p>
        <span class="tag ${tagClass(proj.category)}">${catLabel(proj.category)}</span>
      </div>
    </div>`).join('');

  el.innerHTML = cards + `
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
}

// ── BUILD ABOUT PAGE ──────────────────────────────────────────
function buildAboutPage() {
  if (!document.getElementById('about-photo')) return;
  const about = typeof ABOUT !== 'undefined' ? ABOUT : {};
  document.getElementById('about-photo').innerHTML = about.photo
    ? `<img src="${about.photo}" alt="${about.name}"/>`
    : '📷 Add your photo';
  document.getElementById('about-name').textContent = `Hi, I'm ${about.name || 'Your Name'}! 👋`;
  document.getElementById('about-bio').innerHTML = (about.bio || []).map(p => `<p>${p}</p>`).join('');
  document.getElementById('about-facts').innerHTML = (about.facts || []).map(f => `
    <div class="fact-card">
      <div class="fact-emoji">${f.emoji}</div>
      <div class="fact-text"><h3>${f.title}</h3><p>${f.body}</p></div>
    </div>`).join('');
}

// ── BUILD SINGLE POST PAGE ────────────────────────────────────
async function buildPostPage() {
  const el = document.getElementById('post-content');
  if (!el) return;

  el.innerHTML = `<div style="text-align:center;padding:60px 20px;color:var(--grey);"><div style="font-size:2rem;margin-bottom:8px;">🧶</div><p>Loading post...</p></div>`;

  const id    = new URLSearchParams(window.location.search).get('id');
  const posts = await loadPosts();
  const post  = posts.find(p => p.id === id);

  if (!post) {
    el.innerHTML = `
      <div style="text-align:center;padding:60px 20px;">
        <h2>Post not found 🧶</h2>
        <p style="margin-top:12px;">
          <a href="blog.html" style="color:var(--peach);font-weight:700;">← Back to all posts</a>
        </p>
      </div>`;
    return;
  }

  document.title = `${post.title} — Cozy Stitches`;

  // Convert markdown-style line breaks to paragraphs
  const bodyHtml = (post.body || post.excerpt)
    .split('\n\n')
    .map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
    .join('');

  el.innerHTML = `
    <div class="post-hero-img">
      ${post.image
        ? `<img src="${post.image}" alt="${post.title}"/>`
        : `<div class="img-placeholder" style="background:${post.color};height:320px;">📷</div>`}
    </div>
    <div class="post-body">
      <div class="post-meta">
        <a href="blog.html" class="back-link">← All posts</a>
        <span class="tag ${tagClass(post.category)}">${catLabel(post.category)}</span>
        <span class="post-date-full">${formatDate(post.date)}</span>
      </div>
      <h1 class="post-title">${post.title}</h1>
      <div class="post-text">${bodyHtml}</div>
    </div>`;
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  initHamburger();
  initCommentForm();
  buildHomePage();
  buildBlogPage();
  buildGalleryPage();
  buildAboutPage();
  buildPostPage();
});
