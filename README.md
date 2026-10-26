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

## Branding assets

- `static/images/cttir-logo.png` — CTTIR v5 artwork-only hex for the landing page.
- `static/images/favicon-16.png` and `favicon-32.png` — native-size CTTIR v5 favicon exports.
- `static/images/favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, and `icon-512.png` — CTTIR v5 browser and device icons, referenced by the icon configuration and `static/site.webmanifest`.
- `static/images/hex/qupflowR.svg` — CTTIR v5 qupflowR artwork for its software card.

Software-card artwork is configured in `data/software.yaml`. The CTTIR identity
and its reproducible R source are maintained in
[CTTIR/.github](https://github.com/CTTIR/.github/tree/main/tools/branding).

## Repository network

The About page includes a repository/tag graph below Scope. Its Hugo shortcode
reads `data/software.yaml` (public CTTIR repositories only), project membership
from `data/projects.yaml`, and proposed workflow membership from
`data/workflows.yaml`. Add cross-cutting topics in `data/repository_tags.yaml`.
Update the catalogue when public repositories are added; private repositories
and private project identifiers must not be included. All repositories remain
visible by default, including those without project or workflow assignments.

Checkboxes choose which tag families form graph groups. Separate facet filters
use OR within each family and AND across families; search also matches tags and
descriptions. The matching list provides keyboard access to repository details,
and a server-rendered list remains available without JavaScript. Planned workflow
membership describes editorial scope, not a tested package dependency.

The graph uses a locally served copy of vis-network 9.1.9, matching the tutorials
network, with its MIT license in `static/js/vendor/`. It makes no runtime GitHub
API or graph CDN requests. Rendering and behaviour live in
`layouts/shortcodes/repository-network.html`, `assets/js/repository-network.js`
and `assets/css/custom.css`.

Before publishing, build with `hugo --minify`; check the complete inventory,
search, each grouping family, combined filters, empty results, reset, repository
links, zoom, keyboard access, and narrow-screen layout.

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

Local software setup: vLLM with Python/PyTorch, plus R and RStudio.
