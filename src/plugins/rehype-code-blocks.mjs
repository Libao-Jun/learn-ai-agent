/**
 * Rehype plugin — wraps every Shiki-highlighted <pre> with a .code-block-wrapper
 * and appends a copy-to-clipboard button.  Runs at build time so there is zero
 * layout flash and no client-side DOM wrapping is needed.
 *
 * Skips mermaid / diagram code blocks.
 */

/** Build a HAST element node (tiny hyperscript-style helper to keep the tree readable). */
function el(tag, props = {}, children = []) {
  return { type: 'element', tagName: tag, properties: props, children };
}

/** Deep-clone a plain object so node references stay independent. */
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/* ── SVG icon templates ── */
const copyIcon = () =>
  el('svg', { width: '14', height: '14', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className: ['copy-icon'] }, [
    el('rect', { x: '9', y: '9', width: '13', height: '13', rx: '2' }),
    el('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' }),
  ]);

const checkIcon = () =>
  el('svg', { width: '14', height: '14', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className: ['check-icon'] }, [
    el('polyline', { points: '20 6 9 17 4 12' }),
  ]);

function isMermaidBlock(preNode) {
  if (!preNode?.properties) return false;
  if (preNode.properties.dataLanguage === 'mermaid') return true;
  const codeEl = (preNode.children || []).find(
    (c) => c.type === 'element' && c.tagName === 'code',
  );
  if (!codeEl?.properties?.className) return false;
  return codeEl.properties.className.some(
    (c) => c === 'language-mermaid' || c === 'mermaid',
  );
}

/** Recursive HAST walker that visits every element node. */
function walk(node, parent, indexInParent) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'element') {
    // ── Transform <pre> → <div.code-block-wrapper><pre/><button/></div> ──
    if (node.tagName === 'pre' && parent && indexInParent !== undefined) {
      const codeChild = (node.children || []).find(
        (c) => c.type === 'element' && c.tagName === 'code',
      );
      if (codeChild && !isMermaidBlock(node)) {
        const wrapper = el('div', { className: ['code-block-wrapper'] }, [
          node, // the original <pre> (already highlighted by Shiki)
          el('button', {
            className: ['code-copy-btn'],
            ariaLabel: '复制代码',
            title: '复制代码',
            type: 'button',
          }, [copyIcon(), checkIcon()]),
        ]);
        parent.children[indexInParent] = wrapper;
        return; // do not recurse into the wrapper — pre is already final
      }
    }
  }

  // Recurse
  if (Array.isArray(node.children)) {
    for (let i = 0; i < node.children.length; i++) {
      walk(node.children[i], node, i);
    }
  }
}

export default function rehypeCodeBlocks() {
  return (tree) => walk(tree, null, undefined);
}
