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
master. cttiR is recoloured black, white and gold in its own repository
(`tools/branding/identity_colours.csv` there); `overrides/cttiR/` holds its
renders, copied from `Rscript tools/branding/render.R <dir>` in cttiR. The
site's main icon uses cttiR: the home-page avatar is its named light hex, and
the favicons and app icons use its dark artwork.
