---
title: "Spatial Biology"
date: 2026-11-02
question: "Which cells are in a tissue section, and how are they arranged?"
pipeline:
  - label: "Install the suite"
    pkg: phenoloom
  - label: "Segment nuclei and cells"
    pkg: segmantR
  - label: "Validated cell table"
    pkg: cellspecR
  - label: "Gate cell populations"
    pkg: gatekeepR
  - label: "Spatial neighbourhoods"
    pkg: phenoscapR
pipeline_caption: "The phenoloom suite: from a multiplex image to cells, cell types and their spatial arrangement."
---

Spatial biology keeps cells in their tissue context. CTTIR's spatial packages
take a multiplex image to cell neighbourhoods, and `phenoloom` installs them
together as one suite.

- **`segmantR`** finds nuclei and cells, measures them and checks the
  segmentation against reference masks.
- **`cellspecR`** turns those measurements into a validated, checksummed cell
  table that the other packages share.
- **`gatekeepR`** declares the marker panel and phenotype hierarchy,
  estimates marker cut-offs and assigns cell types, and reports markers that
  cannot be called.
- **`phenoscapR`** asks how cell types are arranged: neighbour enrichment,
  distances between cell types and cellular neighbourhoods.

## Walkthrough

[Spatial Tissue Phenotyping](../spatial-tissue-phenotyping/) runs the suite
end to end on a synthetic seven-channel immunofluorescence section, checking
each step against the cells that were drawn. Every figure on that page comes
from running the code shown.

Related spatial packages, such as cell-level reports (`cellreportR`) and
single-frame super-resolution (`mssrscopR`), are listed under
[Spatial biology](../../software/) on the Software page.
