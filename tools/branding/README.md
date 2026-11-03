# Package artwork

The registered display logos are the approved v5 masters from hexmakR 0.2.0.
Package names sit inside the hex in all three colour modes. Favicons use the
compact artwork-only variant. No runtime dependency is added.

Install hexmakR 0.2.0 or later, then copy masters to a review directory:

```sh
Rscript tools/branding/render.R /path/to/review
```

Apply the registered variants to this repository with:

```sh
Rscript tools/branding/render.R --apply
```

`assets.csv` records each identity, original filename and destination. Master
files are copied byte-for-byte so the supplied font outlines remain intact.

A file in `overrides/<identity>/<rendered>` takes precedence over the hexmakR
master. cttiR uses the reserved core palette (its grey scale with a gold
border), recoloured in its own repository; `overrides/cttiR/` holds its
`lockup.svg` and `lockup-dark.svg`, copied from cttiR's
`man/figures/logo-with-name.svg` and `logo-with-name-dark.svg`.

hyperloom and phenoloom are the suite packages of their topics: their
overrides keep the topic colours with the CTTIR gold border, copied from
each repository's `man/figures/logo-with-name.svg` and
`logo-with-name-dark.svg`.

argus-one, attaclone-dedup, metadata-mender, pwa-quest and shinylaunchR are
not R packages and use square logos in the wine apps family; their overrides
are copied from each repository's `assets/branding/logo-with-name.svg` and
`logo-with-name-dark.svg`. lstparsR (Clinical-Pharmacy-Saarland-University)
has no hexmakR master; its overrides come from
`Rscript tools/branding/render.R <dir>` in the lstparsR repository.

songR and sorenR (dimension reduction and visualisation, deep teal) and
brainwritR and delphyR (consensus and ideation, plum) have their own
families since 3 November 2026. Their hexmakR masters are in the former
colours, so each repository recolours them and the overrides are copied from
its rendered `lockup.svg` and `lockup-dark.svg` destinations (see the
repository's `tools/branding/assets.csv`). infercalcR and infereportR are not
public yet and have no hexmakR master; their overrides are the
`man/figures/logo.svg` and `logo-dark.svg` that their `tools/branding/render.R`
draws in R.

The landing-page mark and the site icons are the CTTIR institution logo, not a
package hex, in the same reserved core palette as cttiR. They are rendered in CTTIR/.github by `tools/branding/institution.R`
and copied from its `assets/branding/institution/`: `mark.svg` and
`mark-dark.svg` to `static/images/cttir-mark*.svg`, `favicon.svg`, `icon-16.png`
and `icon-32.png` to the favicons, and `apple-touch-icon.png`, `icon-192.png`
and `icon-512.png` to the device icons.
