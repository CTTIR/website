# Workflows page generation log

- `docs: recon notes for workflows page` — wrote PLAN.md recon and seeded log.
- `feat(menu): add Workflows top-level header between Projects and Tutorials` — inserted Workflows at weight=3, shifted Tutorials/Ressources/Impressum to 4/5/6.
- `feat(workflows): add section landing page` — `content/workflows/_index.md`, empty `data/workflows.yaml`, `layouts/workflows/list.html` mirroring Projects card grid with extra fields (research_question, featured_packages, learn, status, workflow_url, repo_url) and weight-sorted ordering.
- `feat(workflows): add single-cell tissue atlas placeholder` — weight 10, packages cellreportR/scimagR/segmantR/bambamR/songR; TODO URLs.
- `feat(workflows): add HSI tissue characterization placeholder` — weight 20, packages hyperspectR/libscanR/songR/reflowR; TODO URLs.
