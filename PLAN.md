# Workflows page — recon

## Repo summary
- Hugo site, theme `github.com/luizdepra/hugo-coder` via Hugo Modules.
- Config: `hugo.toml` (single TOML, root).
- Menu defined under `[menu] [[menu.main]]` with integer `weight` and string `url`.

## Projects pattern (canonical pattern to mirror)
- `content/projects/_index.md`: minimal TOML front matter + intro paragraph.
- `data/projects.yaml`: list of cards.
- `layouts/projects/list.html`: custom list template; loops categories, renders `.cttir-card` per item.
- `assets/css/custom.css`: defines card styles.

---

# Projects→Software rename + new Projects page — recon

## Workflows merge status
- Confirmed merged on `main` at commit `4679bd4`. `content/workflows/_index.md`, `data/workflows.yaml` (8 entries weight 10..80), `layouts/workflows/list.html` all present. Safe to proceed.

## References to `projects` section in repo (full grep)
- `hugo.toml` lines 45,47 — menu entry name + url.
- `content/projects/_index.md` — section landing.
- `data/projects.yaml` — card data.
- `layouts/projects/list.html` — list template (`.Site.Data.projects` lookup).
- `layouts/_partials/footer.html` line 5 — footer nav link to `projects/`.
- `assets/css/custom.css` — `.cttir-projects` grid class (CSS class name only, not a path; **leave unchanged** — `cttir-projects` is the grid utility used by both Projects and Workflows; renaming would force CSS+template churn for no semantic gain).
- `WORKFLOWS_GENERATION_LOG.md`, `PLAN.md` — historical references; leave.
- `content/about.md` — no direct link to /projects/, only external GitHub links.

## Workflow slug/route pattern — critical finding
- **Workflows are a single page at `/workflows/`**; per-workflow entries live in `data/workflows.yaml` and are rendered as cards on that one landing page.
- **No per-workflow Hugo routes exist** (e.g. `/workflows/single-cell-tissue-atlas/` 404s).
- Each entry has a `slug` field (e.g. `single-cell-tissue-atlas`) but it is data, not a route.

## Software (formerly Projects) anchor pattern — critical finding
- `layouts/projects/list.html` renders `<h3 class="cttir-card__name">` with no `id` attribute. **Per-package anchors do not currently exist.**

## Decision: minimal layout addition to enable cross-links
- Per spec ("cross-links must resolve to actual existing routes"), the cleanest fix is to add `id="<name>"` / `id="<slug>"` to the card heading in **our own** layouts (`layouts/projects/list.html` → renamed `layouts/software/list.html`, and `layouts/workflows/list.html`). These are repo-local layouts, not theme files. This is a small, justified layout change.
- Project cards then link to:
  - Software: `/software/#<packageName>` (e.g. `/software/#songR`)
  - Workflows: `/workflows/#<slug>` (e.g. `/workflows/#single-cell-tissue-atlas`)
- No new per-page routes are invented; everything lands on the existing single-page sections, scrolled to the right card.

## Spelling
- Org GitHub: `CTTIR`. Body copy: `CTIR`. Same as before.
