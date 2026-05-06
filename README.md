# CTIR — Computational Trauma and Tissue Injury Research

Source for the CTIR group website, published at <https://cttir.github.io/website/>.

Built with [Hugo](https://gohugo.io/) (extended) and the [Coder](https://github.com/luizdepra/hugo-coder) theme loaded as a Hugo Module. Deployed to GitHub Pages by GitHub Actions on every push to `main`.

## Local development

```bash
hugo mod get -u
hugo server -D
```

Then open <http://localhost:1313/website/>.

## Deployment

GitHub Actions workflow `.github/workflows/hugo.yml` builds and publishes the site. After first push to `main`, in the GitHub repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Assets to add

- `static/images/cttir-logo.png` — 2×2 black tile with white "C T / I R" lettering. Used as landing-hero logo and favicon source.
- `static/images/favicon.ico` (optional, generated from the logo).

## Open TODOs

Every placeholder is marked with `TODO:` in the source. Search the repo with `grep -rn "TODO:"` to walk through them. Areas that need content:

- `content/about.md` — mission, scope, people, affiliation, contact.
- `content/projects/_index.md` + `data/projects.yaml` — verbatim GitHub `About` descriptions for `cellreportR`, `pressR`, `scimagR`, plus any further repos.
- `content/tutorials/_index.md` — items pulled from `CTTIR/tutorials` and `CTTIR/courses`.
- `content/ressources/_index.md` — entries pulled from `CTTIR/ressources` per category.
- `content/impressum.md` — all legal-notice fields (§ 5 TMG, § 18 MStV).
- `content/datenschutz.md` — privacy-policy fields.

## License

MIT — see [LICENSE](LICENSE).
