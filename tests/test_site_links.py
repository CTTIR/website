import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('check_site', Path(__file__).parents[1] / 'tools/check_site.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class SiteLinks(unittest.TestCase):
    def test_realistic_subpath_navigation_and_assets(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / 'about').mkdir()
            (root / 'image name.svg').write_text('<svg/>')
            (root / 'index.html').write_text('<a href="/website/about/#scope">About</a><img src="image%20name.svg"><a href="https://cttir.github.io/tutorials/">Sibling</a>')
            (root / 'about/index.html').write_text('<h1 id="scope">Scope</h1><a href="../">Home</a><a href="/website">Root alias</a><a href="#scope">Here</a><img src="data:image/png;base64,AA==">')
            self.assertEqual(module.check_site(root, 'https://cttir.github.io/website/'), [])

    def test_missing_page_asset_and_fragment_fail(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / 'index.html').write_text('<a href="absent/">Missing page</a><img src="absent.svg"><a href="#missing">Missing section</a>')
            errors = module.check_site(root, 'https://cttir.github.io/website/')
            self.assertEqual(len(errors), 3)
            self.assertTrue(any('missing fragment' in e for e in errors))
            self.assertTrue(any('absent.svg' in e for e in errors))

    def test_empty_build_cannot_pass(self):
        with tempfile.TemporaryDirectory() as folder:
            self.assertEqual(module.check_site(Path(folder), 'https://cttir.github.io/website/'), ['No rendered HTML pages found.'])


if __name__ == '__main__':
    unittest.main()
