+++
title = "About"
description = "A coordinated suite for reproducible computational biomedical research"
+++

## Computational Trauma and Tissue Injury Research (CTTIR)

CTTIR develops open-source computational tools, reproducible analysis pipelines
and teaching material at the interface of trauma, tissue-injury biology and
quantitative biomedicine. The suite connects heterogeneous biological and
clinical data with transparent methods, reusable workflows and reproducible
reports.

### A coordinated software suite

[cttiR](https://github.com/CTTIR/cttiR) provides the project and workflow
orchestration layer. It translates a research question into a structured
project, selects an available workflow and connects its stages to approved
package interfaces. Versioned package specifications, analysis guidance and
recorded dependencies make the choices traceable.

The intended workflow is **research question → cttiR project and method planning
→ approved analysis stages → reproducible results and reporting**. Specialist
packages contribute parsers, measurement methods, statistical procedures and
visualisations; [reflowR](https://github.com/CTTIR/reflowR) supplies the reporting
structure. The [software catalogue](../software/) covers the wider suite.

The default planner is deterministic. Experimental, explicitly enabled support
from a **locally hosted pretrained language model** can assist planning alongside
the versioned package knowledge and analysis guidelines. Proposed methods remain
subject to human review and recorded approval. Specialist integration is
progressive: unavailable adapters are identified as gaps. Dedicated model
training on CTTIR resources and independent model qualification remain development
work; a released CTTIR-trained model is not implied.

### Scope

- **Project orchestration and reproducibility.** [cttiR](https://github.com/CTTIR/cttiR)
  coordinates project creation, workflow routing, versioned knowledge and checks;
  [reflowR](https://github.com/CTTIR/reflowR) and
  [themakR](https://github.com/CTTIR/themakR) support consistent research reports
  and package documentation.
- **Biological and imaging methods.** The suite includes dimensionality reduction
  ([songR](https://github.com/CTTIR/songR)), RNA-seq workflows
  ([bambamR](https://github.com/CTTIR/bambamR)), single-cell spatial analysis
  ([phenoscapR](https://github.com/CTTIR/phenoscapR)), molecular pathology
  ([molpathR](https://github.com/CTTIR/molpathR)) and hyperspectral analysis
  ([hyperspectR](https://github.com/CTTIR/hyperspectR)).
- **Inference and simulation.** [inferguidR](https://github.com/CTTIR/inferguidR)
  supports guided statistical analysis; [sandtablR](https://github.com/CTTIR/sandtablR)
  explores synthetic patient flows; [shieldR](https://github.com/CTTIR/shieldR)
  studies abstract logistics chains with changing item specifications and
  dynamic disruptions.
- **Data access and research services.** Parsers such as
  [qviewparsR](https://github.com/CTTIR/qviewparsR) turn specialised data into
  reusable R objects. [researchR](https://github.com/CTTIR/researchR) and
  [researchd](https://github.com/CTTIR/researchd) provide client/server tooling
  for academic literature surveillance.
- **Teaching and shared resources.** A four-course biostatistics curriculum,
  practical tutorials and curated method references support the use and critical
  appraisal of these tools. Explore [Tutorials & Courses](../tutorials/) and
  [Ressources](../ressources/).
