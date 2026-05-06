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

## License

MIT — see [LICENSE](LICENSE).
