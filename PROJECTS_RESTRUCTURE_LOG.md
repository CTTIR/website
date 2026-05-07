# Projects→Software restructure + new Projects page log

- `fix(projects): use relURL on full path so cross-links honor baseURL` — switched layout to `printf "software/#%s" .pkg | relURL` so links render `/website/software/#<pkg>` under the GitHub Pages subpath. Verified all 13 software anchors and 8 workflow anchors resolve.
- `feat(projects): add basic bioinformatics research theme` — weight 40; 5 software pkgs, 3 workflows.
- `feat(projects): add cross-modal integration research theme` — weight 30; 10 software pkgs, 4 workflows.
- `feat(projects): add HSI research theme` — weight 20; 4 software pkgs, 2 workflows.
- `feat(projects): add single-cell analysis research theme` — weight 10; links to 5 software pkgs and 2 workflows.
- `feat(projects): add research-themes section landing page` — content/projects/_index.md, empty data/projects.yaml, layouts/projects/list.html mirroring Software card pattern with software[]/workflows[] cross-link arrays.
- `feat(menu): add new Projects (research themes) menu entry above Software` — weights renumbered 1..7 to insert Projects=2; Software=3, Workflows=4, Tutorials=5, Ressources=6, Impressum=7. Removed `/projects/` alias from Software _index.md to free the route for the new section.
- `refactor: update internal references from projects to software` — footer nav now links both Projects (new) and Software; workflows layout adds id=slug anchors on card heading.
- `feat(menu): rename Projects menu entry to Software` — menu now: About · Software · Workflows · Tutorials & Courses · Ressources · Impressum. /software/ renders cards correctly with id anchors; /projects/ alias works.
- `refactor: rename Projects content directory to Software (history preserved via git mv)` — git mv on content/projects→content/software, data/projects.yaml→data/software.yaml, layouts/projects→layouts/software; updated `_index.md` title/description/alias and template `.Site.Data.projects`→`.Site.Data.software`; added `id` attr to `cttir-card__name` heading for anchorable cross-links.
- `docs: recon notes for Projects→Software restructure` — confirmed Workflows merged; documented that workflows have no per-page routes and Software cards have no anchor ids; chose to add `id` attrs to card headings in repo-local layouts so cross-links resolve as `/software/#<pkg>` and `/workflows/#<slug>`.
