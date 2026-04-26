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
const POSTS = [

  {
    id: 'granny-blanket',
    title: 'My First Granny Square Blanket!',
    date: 'April 20, 2026',
    category: 'blankets',
    excerpt: 'I finally finished the blanket I started in January — 3 months of work but every stitch was worth it!',
    body: `I finally finished the blanket I started back in January — it took three whole months but every single stitch was worth it.\n\nI used about 12 different colours of soft cotton yarn and made over 200 individual granny squares. Joining them all together was the hardest part! I used the flat slip stitch join which keeps it flat and tidy.\n\nMy favourite part is the border — I did three rounds of single crochet in cream and it really ties all the colours together. If you want to try this pattern, let me know in the comments!`,
    image: '',
    color: 'linear-gradient(135deg, #B8C5E8, #D8D0F0)',
  },

  {
    id: 'magic-ring',
    title: 'How to Do a Magic Ring',
    date: 'April 12, 2026',
    category: 'tutorials',
    excerpt: 'The magic ring was the hardest thing to learn when I started. Here is my super simple beginner guide!',
    body: `The magic ring was honestly the most confusing thing for me when I first started crocheting. I watched so many videos and kept making a hole in the middle!\n\nFinally, after about a week of trying, I figured out a method that works every time. Here is how I do it:\n\n1. Wrap the yarn around your index finger twice\n2. Insert your hook through both loops\n3. Pull up a loop and chain 1 to secure\n4. Work your stitches into the ring\n5. Pull the tail to close the hole\n\nThe key is to keep tension on the yarn while you work. It gets so much easier with practice — I promise!`,
    image: '',
    color: 'linear-gradient(135deg, #F0AE80, #F5DC90)',
  },

  {
    id: 'yarn-haul',
    title: 'My Biggest Yarn Haul Yet! 🧶',
    date: 'April 5, 2026',
    category: 'hauls',
    excerpt: 'I went to the craft shop with my mum and I may have gone a little overboard. Here is everything I got!',
    body: `I went to the craft shop with my mum last weekend and I may have gone just a tiny bit overboard. We were only supposed to be there for 20 minutes. We were there for two hours.\n\nHere is everything I got:\n\n🧶 Drops Safran in Powder Pink — for my next amigurumi\n🧶 Paintbox Cotton DK in Seafoam — for a summer top\n🧶 Rico Design Essentials in Lilac — for a cosy blanket\n🧶 Scheepjes Catona in Buttercup — for some sunflower coasters\n🧶 A new 3.5mm Clover hook because mine finally broke!\n\nI am so excited to get started on all of these. The pink is especially dreamy — it is the softest yarn I have ever touched!`,
    image: '',
    color: 'linear-gradient(135deg, #D8D0F0, #F7D5E8)',
  },

  {
    id: 'gerald-frog',
    title: 'Meet Gerald the Frog 🐸',
    date: 'March 28, 2026',
    category: 'amigurumi',
    excerpt: 'My very first amigurumi frog! He took a whole weekend and I may have unravelled his eyes seven times.',
    body: `Meet Gerald! He is my very first amigurumi and I am so proud of him even though he gave me a lot of trouble.\n\nI used the Hooked by Robin frog pattern which is free on Ravelry — highly recommend it for beginners! The body is made with Drops Safran in Leaf Green and the belly is in cream.\n\nThe hardest part was definitely the safety eyes. I unravelled them seven times because I kept putting them in the wrong position. Eventually I used stitch markers to plan the positions before sewing anything.\n\nGerald now lives on my windowsill and my cat is obsessed with him which is slightly concerning. 🐱`,
    image: '',
    color: 'linear-gradient(135deg, #B8C5E8, #EEF2FC)',
  },

];


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

  {
    id: 'rosie-bunny',
    title: 'Rosie the Bunny 🐰',
    date: 'April 2026',
    category: 'amigurumi',
    desc: 'My very first amigurumi! Rosie is a little pink bunny made with soft cotton yarn and a 3.5mm hook. She took three attempts to get right but I love her so much.',
    image: '',
    color: 'linear-gradient(135deg, #F7D5E8, #F0AE80)',
  },

  {
    id: 'granny-blanket',
    title: 'Granny Square Blanket 🌸',
    date: 'March 2026',
    category: 'blankets',
    desc: 'A rainbow of granny squares joined together into a full blanket! This took me 3 months and about 200 individual squares. I am so proud of this one.',
    image: '',
    color: 'linear-gradient(135deg, #F0AE80, #F5DC90)',
  },

  {
    id: 'pink-beanie',
    title: 'Pink Beanie 🧶',
    date: 'February 2026',
    category: 'accessories',
    desc: 'A cosy ribbed beanie in my favourite pastel pink yarn. Made as a gift for my mum! It took about 4 hours from start to finish.',
    image: '',
    color: 'linear-gradient(135deg, #D8D0F0, #B8C5E8)',
  },

  {
    id: 'sunflower-coaster',
    title: 'Sunflower Coaster ☀️',
    date: 'January 2026',
    category: 'home',
    desc: 'A bright yellow sunflower coaster! This was a great beginner project — only took an afternoon and such a satisfying result.',
    image: '',
    color: 'linear-gradient(135deg, #F5DC90, #F0AE80)',
  },

  {
    id: 'mini-frog',
    title: 'Mini Frog 🐸',
    date: 'January 2026',
    category: 'amigurumi',
    desc: 'A tiny little frog made with leftover green yarn. He is only about 4cm tall! His eyes are the cutest part.',
    image: '',
    color: 'linear-gradient(135deg, #B8C5E8, #D8D0F0)',
  },

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
