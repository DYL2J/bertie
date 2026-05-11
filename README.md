# Bertie

Bertie is a simple GitHub Pages site for a personal journal.

It uses plain HTML and CSS, so there is no build step. Push to GitHub and GitHub Pages serves the files directly.

## Structure

```text
.
├── assets/
│   └── css/
│       └── site.css
├── posts/
│   ├── _templates/
│   │   └── article.html
│   └── what-ive-learned-at-university.html
├── uni_images/
├── index.html
├── about.html
├── CNAME
└── .nojekyll
```

## Add a new post

1. Copy `posts/_templates/article.html`.
2. Rename the copy inside `posts/`, for example `posts/my-new-essay.html`.
3. Edit the title, date, description, article text, and image paths.
4. Add a new `.post-card` entry to `index.html`.
5. Commit and push.

## Images

Put article-specific images in a folder named for the article, such as:

```text
posts/my-new-essay-images/
```

or keep using a clear top-level folder such as:

```text
uni_images/
```

Use JPG, PNG, or WebP for browser reliability. HEIC files may not display consistently on GitHub Pages.

## Publish

This repo includes a `CNAME` file for:

```text
bertie.com
```

In GitHub, go to **Settings** → **Pages** and make sure the custom domain is `bertie.com`.

At your DNS provider, point `bertie.com` to GitHub Pages and point `www` to `dyl2j.github.io`.
