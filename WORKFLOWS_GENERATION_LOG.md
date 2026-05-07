# Workflows page generation log

- `docs: recon notes for workflows page` — wrote PLAN.md recon and seeded log.
- `feat(menu): add Workflows top-level header between Projects and Tutorials` — inserted Workflows at weight=3, shifted Tutorials/Ressources/Impressum to 4/5/6.
- `feat(workflows): add section landing page` — `content/workflows/_index.md`, empty `data/workflows.yaml`, `layouts/workflows/list.html` mirroring Projects card grid with extra fields (research_question, featured_packages, learn, status, workflow_url, repo_url) and weight-sorted ordering.
- `feat(workflows): add single-cell tissue atlas placeholder` — weight 10, packages cellreportR/scimagR/segmantR/bambamR/songR; TODO URLs.
- `feat(workflows): add HSI tissue characterization placeholder` — weight 20, packages hyperspectR/libscanR/songR/reflowR; TODO URLs.
- `feat(workflows): add multiplex protein cohort placeholder` — weight 30, packages qviewparsR/pressR/songR; TODO URLs.
- `feat(workflows): add bulk transcriptomic response placeholder` — weight 40, packages bambamR/songR/reflowR; TODO URLs.
- `feat(workflows): add molecular pathology cohort placeholder` — weight 50, packages molpathR/songR/pressR; TODO URLs.
- `feat(workflows): add multi-modal integration placeholder` — weight 60, packages hyperspectR/cellreportR/bambamR/songR/segmantR; TODO URLs.
- `feat(workflows): add method benchmarking placeholder` — weight 70, packages dynasimR/songR/bambamR/reflowR; TODO URLs.
- `feat(workflows): add CTIR site template placeholder` — weight 80, packages reflowR/hexmakR; TODO URLs.
