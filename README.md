# Muhammad Usman Imran — Portfolio

Single-page portfolio built with React 19 and Vite, deployed to GitHub Pages.

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve dist/ locally
npm run lint     # eslint
npm run deploy   # build + publish dist/ to the gh-pages branch
```

## Where the content lives

| File | Contents |
| --- | --- |
| `src/data/data.json` | Name, title, social links, profile summary, experience, skills, education, certifications |
| `src/data/projects.json` | Every project, in one list |
| `public/assets/media/projects/<project-id>/` | Screenshots for that project, one folder per project |
| `public/assets/media/_unused/` | Images not shown anywhere, kept for later |
| `public/assets/Muhammad_Usman_Imran_CV.pdf` | Resume linked from the header button |

## Adding a project

1. Append an object to `src/data/projects.json` (leave `images` empty):

```json
{
  "id": "my-project",
  "name": "My Project — Short Tagline",
  "categories": ["fullstack", "mobile"],
  "featured": false,
  "description": "One or two sentences shown on the card.",
  "techStack": ["Next.js", "Node.js"],
  "images": [],
  "liveLink": "https://example.com",
  "details": {
    "description": "Longer paragraph shown in the detail modal.",
    "points": [
      "Lead Phrase: Supporting sentence rendered as a bullet.",
      "Another Lead: More detail."
    ]
  }
}
```

2. Create `public/assets/media/projects/my-project/` (the folder name must equal the `id`) and drop the screenshots in, prefixed to set the order:

```
01-overview.png
02-dashboard.png
03-mobile_checkout.png
```

3. Run `npm run sync-images`. It fills in every project's `images` array from its folder, sorted by filename, and warns about folders that match no project.

Notes:

- `id` must be unique. Keep it lowercase with hyphens.
- `categories` may contain any of `ai`, `fullstack`, `mobile`, `desktop`, `cms`. A project can sit in several tabs. The tab list is defined in `src/lib/projects.js`.
- `featured: true` puts the project on the home page grid (currently six projects).
- The first image is the card thumbnail (cropped to 16:9 from the top). Later images only appear in the modal carousel.
- Export screenshots around 1730 × 1000 px and under 300 KB. Three to five per project is plenty.
- Captions come from the filename: the order prefix is dropped and underscores become spaces, so `03-mobile_checkout.png` shows as "Mobile Checkout".
- A project with no folder or an empty folder shows a monogram placeholder.
- `liveLink` can be `null`. When set, a "Live site" link appears on the card and in the modal.
- Bullet points split on the first `": "` so the lead phrase renders in bold.

## Layout notes

- Design tokens (colours, fonts, gutter) are in `src/index.css` under `:root`. Teal is the primary accent; orange is reserved for the resume button and the active nav marker.
- Section grid spans are also in `src/index.css`. Experience and Projects sit side by side above 1024px and stack below it.
- The right-hand dot navigator shows above 1024px; the bottom bar shows at 768px and below. Both are driven by `src/hooks/usePageNav.js`.
