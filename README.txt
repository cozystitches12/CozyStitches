╔══════════════════════════════════════════════════════════════╗
║           🌙 COZY STITCHES — Your Website                   ║
╚══════════════════════════════════════════════════════════════╝

⭐ THE ONLY FILE YOU NEED TO EDIT IS: js/content.js ⭐

📁 YOUR FILES:
  index.html        ← Home page (built automatically)
  blog.html         ← Blog page (built automatically)
  gallery.html      ← Gallery page (built automatically)
  about.html        ← About page (built automatically)
  post.html         ← Individual post page (built automatically)
  css/style.css     ← All the colours and layout (don't touch!)
  js/content.js     ← ⭐ YOUR CONTENT — edit this file!
  js/app.js         ← Builds the pages automatically (don't touch!)
  images/           ← Put all your photos in here!

🚀 HOW TO VIEW YOUR WEBSITE:
  1. Unzip the folder
  2. Double-click index.html
  3. It opens in your browser!

➕ HOW TO ADD A NEW BLOG POST:
  1. Open js/content.js in VS Code (free text editor)
  2. Find the POSTS array at the top
  3. Copy this template and paste it ABOVE the first post:

  {
    id: 'my-new-post',           ← unique name, no spaces
    title: 'My New Post Title',
    date: 'May 1, 2026',
    category: 'amigurumi',       ← see categories below
    excerpt: 'A short preview...',
    body: `The full text of your post goes here.

    Use a blank line to start a new paragraph.`,
    image: 'images/my-photo.jpg', ← or '' if no photo yet
    color: 'linear-gradient(135deg, #F7D5E8, #F0AE80)',
  },

  4. Save content.js — done! ✅

➕ HOW TO ADD A GALLERY PROJECT:
  Same idea — find the PROJECTS array in content.js,
  copy a project block, paste at the top, fill in details.

📷 HOW TO ADD A PHOTO:
  1. Copy your photo into the images/ folder
  2. In content.js, set image: 'images/your-photo.jpg'

🎨 CATEGORIES:
  amigurumi | blankets | tutorials | hauls | accessories | home | wip

✏️ HOW TO CHANGE YOUR NAME/BIO:
  Edit the ABOUT section at the bottom of content.js

🌐 NEXT STEP — PUBLISH FOR FREE:
  Ask Claude to walk you through GitHub Pages!
