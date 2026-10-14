/* Public repository/tag explorer. Graph and accessible list share one filter state. */
(() => {
  'use strict';
  const root = document.querySelector('.repo-network');
  if (!root || !window.vis) return;
  const repos = JSON.parse(root.querySelector('#rn-data').textContent);
  const families = {topics: 'Topics', projects: 'Projects', workflows: 'Workflows', types: 'Types'};
  const colours = {topics: '#0e7c86', projects: '#b2681b', workflows: '#8364ba', types: '#4275b5'};
  const filters = Object.fromEntries(Object.keys(families).map(f => [f, new Set()]));
  const tags = Object.fromEntries(Object.keys(families).map(f => [f, [...new Set(repos.flatMap(r => r.tags[f]))].sort()]));
  const byId = new Map(repos.map(r => [r.id, r]));
  const query = root.querySelector('#rn-search');
  const detail = root.querySelector('#rn-detail');
  const list = root.querySelector('#rn-list');
  const count = root.querySelector('#rn-count');
  const familyInputs = [...root.querySelectorAll('.rn-families input')];
  const filterInputs = [];
  let visible = repos;
  let selected = null;
  let graph;
  const nodes = new vis.DataSet();
  const edges = new vis.DataSet();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  function showRepo(id, focusGraph = false) {
    const repo = byId.get(id);
    if (!repo) return;
    selected = id;
    detail.replaceChildren(el('h4', repo.id), el('p', repo.description));
    const status = {cran: 'On CRAN', usable: 'Usable', draft: 'In development', idea: 'Concept'};
    detail.append(el('p', `${repo.tags.types.join(', ')} · ${status[repo.status] || repo.status}`));
    const links = el('p');
    const source = el('a', 'Repository'); source.href = repo.url; links.append(source);
    if (repo.docs && repo.docs !== `${repo.url}#readme`) {
      const docs = el('a', 'Documentation'); docs.href = repo.docs;
      links.append(document.createTextNode(' · '), docs);
    }
    detail.append(links);
    for (const [f, label] of Object.entries(families)) {
      if (repo.tags[f].length) detail.append(el('p', `${label}: ${repo.tags[f].join(' · ')}`, 'rn-tag-line'));
    }
    graph.selectNodes([`repo:${id}`]);
    if (focusGraph) graph.focus(`repo:${id}`, {scale: 1.1, animation: !reduced});
  }
  function showTag(f, tag) {
    selected = null;
    const matches = visible.filter(r => r.tags[f].includes(tag));
    detail.replaceChildren(el('h4', tag), el('p', `${families[f]} · ${matches.length} matching repositories`));
    const button = el('button', 'Filter to this group'); button.type = 'button';
    button.addEventListener('click', () => {
      filters[f].clear(); filters[f].add(tag);
      filterInputs.forEach(i => { if (i.dataset.family === f) i.checked = i.value === tag; });
      update();
    });
    detail.append(button);
  }
  for (const [f, label] of Object.entries(families)) {
    const block = el('details');
    const summary = el('summary', label); block.append(summary);
    const fieldset = el('fieldset'); fieldset.append(el('legend', `Filter by ${label.toLowerCase()}`));
    for (const tag of tags[f]) {
      const labelNode = el('label');
      const input = el('input'); input.type = 'checkbox'; input.value = tag; input.dataset.family = f;
      input.addEventListener('change', () => {
        if (input.checked) filters[f].add(tag); else filters[f].delete(tag);
        update();
      });
      filterInputs.push(input);
      labelNode.append(input, document.createTextNode(` ${tag}`)); fieldset.append(labelNode);
    }
    block.append(fieldset); root.querySelector('.rn-filters').append(block);
  }
  root.querySelector('.rn-interactive').hidden = false;
  graph = new vis.Network(root.querySelector('#rn-map'), {nodes, edges}, {
    autoResize: true,
    nodes: {shape: 'dot', size: 8, borderWidth: 1.5, font: {size: 28, face: 'sans-serif'}, chosen: true},
    edges: {width: 0.8, color: {color: '#8a9ca7', opacity: 0.32}, smooth: false},
    interaction: {hover: true, tooltipDelay: 200, zoomView: false, navigationButtons: false},
    layout: {randomSeed: 42, improvedLayout: true},
    physics: {solver: 'forceAtlas2Based', forceAtlas2Based: {gravitationalConstant: -65, centralGravity: 0.012, springLength: 115, springConstant: 0.07, avoidOverlap: 0.7}, stabilization: {enabled: true, iterations: 180}, maxVelocity: 25}
  });
  root.querySelector('.rn-fallback').hidden = true;
  function theme() {
    const style = getComputedStyle(root);
    const fg = style.getPropertyValue('--cttir-card-fg').trim() || '#0d1117';
    const bg = style.getPropertyValue('--cttir-card-bg').trim() || '#ffffff';
    graph.setOptions({nodes: {font: {color: fg, strokeWidth: 3, strokeColor: bg}}});
  }
  function update() {
    const search = query.value.trim().toLowerCase();
    visible = repos.filter(r => (!search || [r.id, r.description, ...Object.values(r.tags).flat()].join(' ').toLowerCase().includes(search)) &&
      Object.keys(families).every(f => !filters[f].size || r.tags[f].some(t => filters[f].has(t))));
    const enabled = familyInputs.filter(i => i.checked).map(i => i.value);
    const nextNodes = [], nextEdges = [], groups = new Map();
    for (const repo of visible) {
      nextNodes.push({id: `repo:${repo.id}`, label: repo.id, color: {background: '#d4eeee', border: '#0e7c86', highlight: {background: '#ffdb8c', border: '#9d6210'}}, title: repo.description});
      for (const f of enabled) for (const tag of repo.tags[f]) {
        const groupId = `tag:${f}:${tag}`;
        groups.set(groupId, {f, tag});
        nextEdges.push({id: `${repo.id}|${groupId}`, from: `repo:${repo.id}`, to: groupId, color: {color: colours[f], opacity: 0.65}});
      }
    }
    for (const [id, {f, tag}] of groups) nextNodes.push({id, label: tag.replace(' (planned)', '\n(planned)'), shape: 'diamond', size: 13, color: {background: colours[f], border: colours[f]}, font: {size: 24}, title: `${families[f]}: ${tag}`});
    nodes.clear(); edges.clear(); nodes.add(nextNodes); edges.add(nextEdges);
    graph.setOptions({physics: {enabled: visible.length > 0}});
    graph.stabilize(180);
    count.textContent = `${visible.length} of ${repos.length} repositories · ${groups.size} tag groups · ${nextEdges.length} connections${visible.length ? '' : '. No matches — clear a filter or reset.'}`;
    list.replaceChildren();
    for (const repo of visible) {
      const item = el('li'); const button = el('button', repo.id); button.type = 'button';
      button.addEventListener('click', () => showRepo(repo.id, true));
      item.append(button); list.append(item);
    }
    if (selected && visible.some(r => r.id === selected)) showRepo(selected);
    else { selected = null; detail.replaceChildren(el('p', visible.length ? 'Select a repository or tag to see its details.' : 'No repositories match these filters.')); }
    theme();
  }
  graph.on('stabilizationIterationsDone', () => { graph.setOptions({physics: false}); graph.fit({animation: false}); });
  graph.on('click', event => {
    const id = event.nodes[0];
    if (id && id.startsWith('repo:')) showRepo(id.slice(5));
    else if (id && id.startsWith('tag:')) {
      const separator = id.indexOf(':', 4); showTag(id.slice(4, separator), id.slice(separator + 1));
    }
  });
  familyInputs.forEach(input => input.addEventListener('change', update));
  query.addEventListener('input', update);
  root.querySelector('#rn-reset').addEventListener('click', () => {
    query.value = ''; Object.values(filters).forEach(s => s.clear());
    filterInputs.forEach(i => { i.checked = false; });
    familyInputs.forEach(i => { i.checked = i.value === 'topics'; }); selected = null; update();
  });
  root.querySelector('#rn-fit').addEventListener('click', () => graph.fit({animation: !reduced}));
  for (const [id, ratio] of [['rn-zoom-in', 1.3], ['rn-zoom-out', 1 / 1.3]]) root.querySelector(`#${id}`).addEventListener('click', () => graph.moveTo({scale: Math.min(3, Math.max(0.12, graph.getScale() * ratio)), animation: !reduced}));
  new MutationObserver(theme).observe(document.body, {attributes: true, attributeFilter: ['class']});
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', theme);
  update();
})();
