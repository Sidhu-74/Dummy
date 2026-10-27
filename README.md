# Sidharth — Portfolio

A responsive personal portfolio for a product designer, built with plain HTML, CSS and a little JavaScript.

## Pages
- `index.html` — intro and featured work
- `work.html` — case-study cards
- `about.html` — bio, skills, experience
- `contact.html` — contact form, email and LinkedIn

## Run locally
Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Customise
- **Email / LinkedIn** — replace `hello@sidharth.design` and `https://www.linkedin.com/in/sidharth` in the HTML files (also the form's `data-to` attribute in `contact.html`).
- **Images** — swap the placeholders in `images/` (4:3 works best) and the `.portrait` block on the About page.
- **Case studies** — card links currently point to `#`; add case-study pages and update the `href`s.
- **Contact form** — validates in the browser, then opens the visitor's email app. To receive submissions directly, point the form at a service such as Formspree or Netlify Forms.
- **Colours & fonts** — tokens live at the top of `css/styles.css`.
