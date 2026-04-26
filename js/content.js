/* ============================================================
   COZY STITCHES — content.js
   
   ⭐ THIS IS THE ONLY FILE YOU NEED TO EDIT! ⭐
   
   HOW IT WORKS:
   This file stores all your blog posts and gallery projects
   as simple data. The website reads this file and automatically
   builds all your pages — no HTML editing needed!
   
   HOW TO ADD A NEW BLOG POST:
   1. Copy one of the existing post objects below
   2. Paste it at the TOP of the POSTS array (newest first)
   3. Fill in your title, date, category, excerpt, and image
   4. Save the file — done! ✅
   
   HOW TO ADD A GALLERY PROJECT:
   1. Copy one of the existing project objects
   2. Paste it at the TOP of the PROJECTS array
   3. Fill in the details
   4. Save the file — done! ✅
   
   CATEGORIES you can use for posts:
   amigurumi | blankets | tutorials | hauls | accessories | home | wip
   ============================================================ */


/* ── SITE SETTINGS ───────────────────────────────────────────
   Change these to personalise your website
   ─────────────────────────────────────────────────────────── */
const SITE = {
  name:     'Cozy Stitches',          // Your website name
  tagline:  'made with love 🧶',       // Shown in the footer
  year:     '2026',                    // Copyright year
  author:   'Your Name',              // Your name for the About page
  // How many posts to show on the Home page
  homePostsCount:   3,
  // How many gallery items to show on the Home page
  homeGalleryCount: 4,
};


/* ── BLOG POSTS ──────────────────────────────────────────────
   Add your blog posts here. Newest post goes FIRST.
   
   Each post needs:
     title    — the post heading
     date     — when you published it (any format you like)
     category — one of the categories listed above
     excerpt  — a short 1-2 sentence preview
     body     — the full post text (use \n\n for paragraphs)
     image    — path to your photo (put photos in the images/ folder)
               — leave as "" if you don't have a photo yet
     color    — a fallback gradient if no image (CSS gradient string)
   ─────────────────────────────────────────────────────────── */
const POSTS = [];


/* ── GALLERY PROJECTS ────────────────────────────────────────
   Add your finished projects here. Newest project goes FIRST.
   
   Each project needs:
     title    — project name
     date     — when you finished it
     category — amigurumi | blankets | accessories | home | wip
     desc     — a description shown when the photo is clicked
     image    — path to your photo (put photos in images/ folder)
               — leave as "" if no photo yet
     color    — fallback gradient if no image
   ─────────────────────────────────────────────────────────── */
const PROJECTS = [

 ];


/* ── ABOUT PAGE ──────────────────────────────────────────────
   Update this with your own details!
   ─────────────────────────────────────────────────────────── */
const ABOUT = {
  name:  'Your Name',         // Replace with your name or nickname
  photo: '',                  // e.g. 'images/me.jpg'
  bio: [
    // Each string is a separate paragraph. Add or remove as you like.
    "I'm 12 years old and I've been crocheting since I was 10. It all started when my nan taught me a simple chain stitch — and I was completely hooked! 🪝",
    "Since then I've made everything from tiny amigurumi animals to cosy blankets. Cozy Stitches is my little corner of the internet where I share everything I make, all the patterns I try, and every mistake I learn from along the way!",
    "I hope my projects inspire you to pick up a hook and give it a try too. Crocheting is for everyone! 🌙",
  ],
  facts: [
    { emoji: '🧶', title: 'Favourite yarn',          body: 'Soft pastel cotton — especially in pink and lavender!' },
    { emoji: '🪝', title: 'Favourite hook size',      body: '3.5mm — perfect for amigurumi and neat tight stitches.' },
    { emoji: '🐰', title: 'Favourite project ever',   body: 'Rosie the bunny — my very first amigurumi. Three attempts but so worth it!' },
    { emoji: '🌙', title: 'Why I love crocheting',    body: "It's calming, creative, and I love making handmade gifts for people I love!" },
  ],
};
