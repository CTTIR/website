# Copy approved v5 artwork to a review directory or registered destinations.
args <- commandArgs(trailingOnly = FALSE)
script <- sub("^--file=", "", args[grepl("^--file=", args)])
if (length(script) != 1L) stop("Run this file with Rscript.")
branding <- dirname(normalizePath(script, winslash = "/", mustWork = TRUE))
repository <- normalizePath(file.path(branding, "..", ".."), winslash = "/")
params <- commandArgs(trailingOnly = TRUE)
if (length(params) != 1L || !nzchar(params)) {
  stop("Supply a review directory or --apply.")
}
if (!requireNamespace("hexmakR", quietly = TRUE) ||
    utils::packageVersion("hexmakR") < "0.2.0") {
  stop("Install hexmakR >= 0.2.0 for the approved v5 artwork library.")
}
map <- utils::read.csv(file.path(branding, "assets.csv"),
                      stringsAsFactors = FALSE)
if (!all(c("identity", "rendered", "destination") %in% names(map)) ||
    anyNA(map) || anyDuplicated(map$destination)) stop("Invalid asset map.")
master_file <- function(identity, rendered) {
  if (grepl("^icon-(32|48|64|128|256)[.]png$", rendered)) {
    size <- as.integer(sub("^icon-([0-9]+)[.]png$", "\\1", rendered))
    return(hexmakR::hex_asset(identity, layout = "icon", format = "png",
                             size = size))
  }
  if (!grepl("^(hex|lockup)(-dark|-mono)?[.](svg|png|pdf)$", rendered)) {
    stop("Unknown v5 master: ", rendered)
  }
  mode <- if (grepl("-dark[.]", rendered)) "dark" else
    if (grepl("-mono[.]", rendered)) "mono" else "light"
  layout <- if (startsWith(rendered, "lockup")) "lockup" else "hex"
  format <- sub(".*[.]", "", rendered)
  hexmakR::hex_asset(identity, mode, layout, format)
}
sources <- mapply(master_file, map$identity, map$rendered, USE.NAMES = FALSE)
apply <- identical(params, "--apply")
root <- if (apply) repository else params
if (!apply) dir.create(root, recursive = TRUE, showWarnings = FALSE)
root <- normalizePath(root, winslash = "/", mustWork = TRUE)
paths <- if (apply) map$destination else file.path(
  ifelse(map$identity == "CTTIR", "CTTIR-brand", map$identity), map$rendered
)
for (i in seq_along(paths)) {
  relative <- paths[i]
  if (grepl("^[A-Za-z]:|^/|\\\\", relative) ||
      any(strsplit(relative, "/", fixed = TRUE)[[1]] %in% c("", ".", ".."))) {
    stop("Invalid destination: ", relative)
  }
  target <- file.path(root, relative)
  ancestor <- target
  while (!file.exists(ancestor) && !dir.exists(ancestor)) {
    link <- Sys.readlink(ancestor)
    if (!is.na(link) && nzchar(link)) stop("Dangling destination symlink.")
    ancestor <- dirname(ancestor)
  }
  resolved <- normalizePath(ancestor, winslash = "/", mustWork = TRUE)
  if (resolved != root && !startsWith(resolved, paste0(root, "/"))) {
    stop("Destination escapes the output directory.")
  }
  if (dir.exists(target)) stop("Destination is a directory.")
  dir.create(dirname(target), recursive = TRUE, showWarnings = FALSE)
  if (!file.copy(sources[i], target, overwrite = TRUE)) {
    stop("Could not copy ", relative)
  }
}
message("Copied ", length(paths), " approved v5 assets.")
