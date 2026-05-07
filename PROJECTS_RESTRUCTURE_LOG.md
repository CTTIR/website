# Projects→Software restructure + new Projects page log

- `refactor: rename Projects content directory to Software (history preserved via git mv)` — git mv on content/projects→content/software, data/projects.yaml→data/software.yaml, layouts/projects→layouts/software; updated `_index.md` title/description/alias and template `.Site.Data.projects`→`.Site.Data.software`; added `id` attr to `cttir-card__name` heading for anchorable cross-links.
- `docs: recon notes for Projects→Software restructure` — confirmed Workflows merged; documented that workflows have no per-page routes and Software cards have no anchor ids; chose to add `id` attrs to card headings in repo-local layouts so cross-links resolve as `/software/#<pkg>` and `/workflows/#<slug>`.
