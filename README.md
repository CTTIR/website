# CTTIR — Computational Trauma and Tissue Injury Research

Source for the CTTIR group website, published at <https://cttir.github.io/website/>.

Built with [Hugo](https://gohugo.io/) (extended) and the [Coder](https://github.com/luizdepra/hugo-coder) theme loaded as a Hugo Module. Deployed to GitHub Pages by GitHub Actions on every push to `main`.

## Local development

```bash
hugo mod verify
hugo server -D
```

Use Hugo extended 0.150.0 and the Go version in `go.mod` (currently 1.26.1),
matching CI. Builds resolve the theme from committed `go.mod` / `go.sum`;
they do not upgrade it. Then open <http://localhost:1313/website/>.

For a production check:

```bash
python3 -m unittest discover -s tests -v
hugo --gc --minify
hugo mod verify
git diff --exit-code -- go.mod go.sum
python3 tools/check_site.py public
```

The link check validates local HTML navigation, fragments and referenced assets
under the configured `/website/` site path. Links to other sites or sibling
GitHub Pages projects are outside this offline check. Pass `--base-url` to the
checker if changing the deployment URL, and update `hugo.toml` consistently.

Theme upgrades are deliberate changes: run
`hugo mod get github.com/luizdepra/hugo-coder@<version>`, review and commit both
module files, then run the production checks. Do not use `hugo mod get -u` as
part of a normal build.

## Deployment

GitHub Actions workflow `.github/workflows/hugo.yml` validates pull requests with
read-only repository permissions and builds the site from pinned modules. Only
`main` builds can upload the Pages artifact and deploy. The daily metadata refresh
remains enabled for publication builds; pull requests use the committed snapshot.
The site base URL comes from `hugo.toml`. After first push to `main`, in the GitHub repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Branding assets

- `static/images/cttir-mark.svg` and `cttir-mark-dark.svg` — the CTTIR institution mark on the landing page, switched with the site theme by `layouts/_partials/home/avatar.html`.
- `static/images/favicon.svg`, `favicon-16.png` and `favicon-32.png` — favicons from the dark institution mark.
- `static/images/apple-touch-icon.png`, `icon-192.png`, and `icon-512.png` — device icons, referenced by the icon configuration and `static/site.webmanifest`.
- `static/images/hex/qupflowR.svg` — CTTIR v5 qupflowR artwork for its software card.

The institution files are copied from `assets/branding/institution/` in
[CTTIR/.github](https://github.com/CTTIR/.github/tree/main/assets/branding/institution),
where `tools/branding/institution.R` renders them. Packages keep their hex logos.

Software-card artwork is configured in `data/software.yaml`. The CTTIR identity
and its reproducible R source are maintained in
[CTTIR/.github](https://github.com/CTTIR/.github/tree/main/tools/branding).

## Projects & Workflows

Each tile on the Projects & Workflows page links to a page in
`content/projects/<slug>/`: an overview for a project and an executed
walkthrough for a workflow. Walkthroughs are R Markdown sources in
`tools/walkthroughs/src/`, knitted by `tools/walkthroughs/render.R` on bundled
or synthetic data; see `tools/walkthroughs/README.md`. Tiles marked
`hidden: true` in `data/projects.yaml` or `data/workflows.yaml` are kept but
not shown.

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
processors and NVIDIA GPUs. Self-hosted use also includes models that were
further trained (fine-tuned) or weight-edited in-house for specific tasks.
All self-hosted models ran locally, with no data sent to third parties.

All scientific claims, methodological choices, analyses, interpretations and
conclusions remain the authors' own. Where applicable, LLM-generated material
must be reviewed and revised before inclusion, and references must be verified
against their DOI, arXiv ID or ISBN.

Local software setup: vLLM with Python/PyTorch, plus R and RStudio.
