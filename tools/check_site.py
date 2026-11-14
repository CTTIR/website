#!/usr/bin/env python3
"""Check rendered local HTML links and assets without requesting external URLs."""
from __future__ import annotations

import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class Page(HTMLParser):
    def __init__(self, source: str):
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()
        self.links: list[str] = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'a' and attrs.get('name'):
            self.ids.add(attrs['name'])
        for key in ('href', 'src'):
            if attrs.get(key):
                self.links.append(attrs[key])


def check_site(root: Path, base_url: str) -> list[str]:
    root = root.resolve()
    base = urlsplit(base_url.rstrip('/') + '/')
    pages = {p: Page(p.read_text(encoding='utf-8')) for p in root.rglob('*.html')}
    if not pages:
        return ['No rendered HTML pages found.']
    errors = []
    for path, page in sorted(pages.items()):
        relative = path.relative_to(root).as_posix()
        page_url = urljoin(base.geturl(), relative)
        for link in page.links:
            target = urlsplit(urljoin(page_url, link))
            # Sibling Pages projects on the same host are external to this site.
            if target.scheme not in ('http', 'https') or target.netloc != base.netloc:
                continue
            target_path = unquote(target.path)
            if target_path == base.path.rstrip('/'):
                target_path = base.path
            if not target_path.startswith(base.path):
                continue
            local = (root / target_path[len(base.path):]).resolve()
            try:
                local.relative_to(root)
            except ValueError:
                errors.append(f'{relative}: link escapes output directory: {link}')
                continue
            if local.is_dir():
                local /= 'index.html'
            if not local.is_file():
                errors.append(f'{relative}: missing local target: {link}')
            elif target.fragment and local in pages:
                anchor = unquote(target.fragment)
                if anchor not in pages[local].ids:
                    errors.append(f'{relative}: missing fragment: {link}')
    return sorted(set(errors))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', type=Path)
    parser.add_argument('--base-url', default='https://cttir.github.io/website/')
    args = parser.parse_args()
    errors = check_site(args.directory, args.base_url)
    for error in errors:
        print(error)
    if errors:
        raise SystemExit(1)
    print('Rendered local HTML links, fragments and referenced assets passed.')


if __name__ == '__main__':
    main()
