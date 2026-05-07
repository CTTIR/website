# Workflows page — recon

## Repo summary
- Hugo site, theme `github.com/luizdepra/hugo-coder` via Hugo Modules.
- Config: `hugo.toml` (single TOML, root).
- Menu defined under `[menu] [[menu.main]]` with integer `weight` and string `url`.
  - About=1, Projects=2, Tutorials & Courses=3, Ressources=4, Impressum=5.
- Plausible analytics injected via `layouts/_partials/head/extensions.html`.

## Projects pattern (canonical pattern to mirror)
- `content/projects/_index.md`: minimal TOML front matter (`title`, `description`) + tiny intro paragraph.
- `data/projects.yaml`: list of cards (`name`, `category`, `description`, `github`, `docs`, `logo`).
- `layouts/projects/list.html`: custom list template that:
  - Renders `.Title` and `.Content`.
  - Loops over fixed category order (`R Packages`, `Others`).
  - Renders `.cttir-card` for each entry; logo URL or inline SVG placeholder if `logo` empty.
  - Cards link to `github` and `docs`.
- `assets/css/custom.css`: defines `.cttir-projects`, `.cttir-card*`, `.cttir-section-title`.

## Tutorials pattern
- Plain markdown landing page using HTML tables (`table.cttir-toc`). Different pattern from Projects — content-driven, not data-driven. Not relevant for Workflows.

## Decisions for Workflows
- Mirror **Projects** pattern: `data/workflows.yaml` + `layouts/workflows/list.html` + `content/workflows/_index.md`.
- Order: ascending integer `weight` (10, 20, ..., 80) — sort cards by `weight` in template (Projects relies on yaml order; we'll explicitly sort by weight to be safe and match the spec's order requirement).
- Per-card extended fields beyond Projects: `research_question`, `featured_packages` (list), `learn` (list), `status`, `workflow_url` (workflowr site), `repo_url` (source repo). Logo intentionally omitted — placeholder hex SVG (already in projects template) reused.
- Menu: insert `Workflows` weight=3, bump Tutorials→4, Ressources→5, Impressum→6.
- All workflow URLs and repos are TODO placeholders — `https://example.com/TODO-...` and `https://github.com/CTTIR/TODO-...-workflow`.

## Spelling
- Org GitHub: `CTTIR`. Body copy: `CTIR`. `hugo.toml` uses `CTIR` for title/author and `CTTIR` for repo URLs. Will follow same convention.
