# Walkthroughs

Every tile on Projects & Workflows links to a page in `content/projects/`.
Workflow tiles get an executed walkthrough; project tiles get an overview
that links to their workflows.

An executed walkthrough is an R Markdown file in `src/<slug>.Rmd`, where the
slug matches the tile in `data/workflows.yaml`. `render.R` knits it in a fresh
R session inside the page bundle `content/projects/<slug>/`, writing
`index.md` and the figures in `figures/`. The code on the page is the code
that produced its output, run on the packages' bundled example data or on
synthetic data generated in the walkthrough. Nothing is mocked, and no
patient or project data is used.

Front matter:

- `title`, `date`, `question` (the tile's research question), `data` (what
  the data is and where it comes from);
- `pipeline`: the steps shown as a flow at the top, each with a `label` and,
  for a package step, `pkg` (a name from `data/software.yaml`, whose logo is
  shown);
- `packages`: the CTTIR packages the walkthrough runs.

Each walkthrough ends with the versions and GitHub commits of the packages
it ran.

## Rendering

Install the CTTIR packages from GitHub, then render one or all walkthroughs:

```sh
Rscript -e 'pak::pak(c("CTTIR/segmantR", "CTTIR/songR"))'   # as needed
Rscript tools/walkthroughs/render.R single-cell-tissue-atlas
Rscript tools/walkthroughs/render.R
```

Commit the source, `index.md` and the figures together.
