---
title: "Hyperspectral Imaging"
date: 2026-11-02
question: "Can tissue be characterised from its reflectance spectra alone?"
pipeline:
  - label: "Install the suite"
    pkg: hyperloom
  - label: "Read TIVITA recordings"
    pkg: tivis.r
  - label: "Read Cubert measurements"
    pkg: cuvis.r
  - label: "Spectral cubes, preprocessing and analysis"
    pkg: hyperspectR
  - label: "Spectral visualisation"
    pkg: hyperspectaculR
pipeline_caption: "The hyperloom suite: camera readers feed a common spectral cube, which hyperspectR analyses and hyperspectaculR visualises."
---

A hyperspectral camera records a reflectance spectrum at every pixel. CTTIR's
hyperspectral packages turn such recordings into tissue maps, and
`hyperloom` installs them together as one suite.

- **`tivis.r`** reads Diaspective Vision TIVITA recordings, their acquisition
  metadata and exported parameter images, in pure R.
- **`cuvis.r`** connects to Cubert cameras and measurements through the
  Cubert SDK.
- **`hyperspectR`** holds the spectral cube and does the analysis:
  preprocessing recipes, hemoglobin fits and band ratios, embeddings and
  classification with held-out evaluation.
- **`hyperspectaculR`** draws spectral summaries and visual compositions of a
  cube.

## Walkthrough

[Hyperspectral Tissue Characterization](../hsi-tissue-characterization/)
runs the suite end to end. It reads the TIVITA example recording, simulates
tissue scenes with known classes, preprocesses them, fits hemoglobin,
classifies whole held-out scenes and summarises the result. Every figure on
that page comes from running the code shown.

Related spectral packages, such as region annotation (`hyperannotatR`) and
modelling and validation (`hypermodR`), are listed under
[Spectral imaging](../../software/) on the Software page.
