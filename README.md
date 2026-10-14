# CTTIR — Computational Trauma and Tissue Injury Research

Source for the CTTIR group website, published at <https://cttir.github.io/website/>.

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

## Use of LLM tools

Where applicable, LLM tools were used for narrowly defined, non-authorial tasks:
copyediting, prose refinement, Markdown/LaTeX formatting, boilerplate scaffolding
(such as CI configurations and build scripts), and code refactoring. Tools included
[Chat AI](https://kisski.gwdg.de/leistungen/2-02-llm-service/), the KISSKI
(GWDG) service, and self-hosted **Mistral Small (24B, Apache-2.0)** served through
a local **vLLM architecture** on an Ubuntu Linux workstation with Intel
processors and NVIDIA GPUs. The self-hosted model ran locally, with no data sent
to third parties.

All scientific claims, methodological choices, analyses, interpretations and
conclusions remain the authors' own. Where applicable, LLM-generated material
must be reviewed and revised before inclusion, and references must be verified
against their DOI, arXiv ID or ISBN.

Workstation software snapshot (14 October 2026): local, OpenAI-compatible vLLM
serving with **vLLM 0.28.1rc1.dev534+g613ab20f7**, **Python 3.12.13** and
**PyTorch 2.13.0**; **R 4.6.1** and **RStudio 2026.06.0+242**. These are
workstation versions, not per-project dependency or validation requirements.
