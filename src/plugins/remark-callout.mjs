const calloutTypes = new Set(['tip', 'note', 'warning', 'danger']);

export default function remarkCallout() {
  return (tree) => {
    transform(tree);
  };
}

function transform(node) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'containerDirective' && calloutTypes.has(node.name)) {
    const data = node.data || (node.data = {});
    data.hName = 'aside';
    data.hProperties = {
      className: ['md-callout', `md-callout-${node.name}`],
    };

    const title = node.children?.find(
      (child) => child.type === 'paragraph' && child.data?.directiveLabel,
    );

    if (title) {
      title.data = {
        ...title.data,
        hName: 'strong',
        hProperties: { className: ['md-callout-title'] },
      };
    }
  }

  for (const child of node.children || []) transform(child);
}
