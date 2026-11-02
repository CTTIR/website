# Render the executed walkthroughs behind the Projects & Workflows tiles.
#
#   Rscript tools/walkthroughs/render.R              # every src/*.Rmd
#   Rscript tools/walkthroughs/render.R <slug> ...   # selected walkthroughs
#
# Each tools/walkthroughs/src/<slug>.Rmd is knitted in a fresh R session with
# its working directory set to the page bundle content/projects/<slug>/, so
# the code runs exactly as shown and its figures land in the bundle's
# figures/ folder. The front matter is copied unchanged into index.md.
# Install the CTTIR packages first (see README.md); nothing is mocked.
args <- commandArgs(trailingOnly = TRUE)
script <- sub("^--file=", "", grep("^--file=", commandArgs(FALSE), value = TRUE))
if (length(script) != 1L) stop("Run this file with Rscript.")
here <- dirname(normalizePath(script, mustWork = TRUE))
site <- dirname(dirname(here))
sources <- list.files(file.path(here, "src"), pattern = "[.]Rmd$", full.names = TRUE)
slugs <- sub("[.]Rmd$", "", basename(sources))
if (length(args)) {
  unknown <- setdiff(args, slugs)
  if (length(unknown)) stop("No walkthrough source for: ", paste(unknown, collapse = ", "))
  sources <- sources[slugs %in% args]; slugs <- slugs[slugs %in% args]
}
if (!length(sources)) stop("No walkthrough sources in ", file.path(here, "src"))

knit_one <- function(src, bundle) {
  code <- sprintf('
    setwd(%s)
    unlink("figures", recursive = TRUE)
    knitr::opts_knit$set(base.dir = getwd())
    knitr::opts_chunk$set(fig.path = "figures/", dev = "png", dpi = 144,
      fig.width = 7.5, fig.height = 4.6, fig.align = "center", comment = "#>",
      message = FALSE, out.width = "100%%")
    set.seed(2026)
    knitr::knit(%s, output = "index.md", quiet = TRUE, envir = new.env())
  ', deparse(bundle), deparse(src))
  status <- system2(file.path(R.home("bin"), "Rscript"), c("-e", shQuote(code)))
  if (!identical(status, 0L)) stop("Rendering failed: ", basename(src))
}

for (i in seq_along(sources)) {
  bundle <- file.path(site, "content", "projects", slugs[i])
  dir.create(bundle, recursive = TRUE, showWarnings = FALSE)
  message("Rendering ", slugs[i])
  knit_one(normalizePath(sources[i]), normalizePath(bundle))
}
message("Rendered ", length(sources), " walkthrough(s).")
