import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Custom remark plugin to parse ??text?? syntax
function remarkHighlight() {
  return (tree: any) => {
    const visit = (node: any, index: number, parent: any) => {
      if (node.type === 'text') {
        const text = node.value;
        const highlightRegex = /\?\?([^?]+)\?\?/g;
        const matches = [...text.matchAll(highlightRegex)];

        if (matches.length > 0) {
          const newNodes: any[] = [];
          let lastIndex = 0;

          matches.forEach((match) => {
            const matchStart = match.index!;
            const matchEnd = matchStart + match[0].length;

            // Add text before the match
            if (matchStart > lastIndex) {
              const beforeText = text.slice(lastIndex, matchStart);
              if (beforeText) {
                newNodes.push({
                  type: 'text',
                  value: beforeText
                });
              }
            }

            // Add the highlighted text as an HTML element
            newNodes.push({
              type: 'html',
              value: `<span class="custom-highlight" style="background-color: #ffeb3b; color: #333; padding: 2px 4px; border-radius: 3px; font-weight: 500; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">${match[1]}</span>`
            });

            lastIndex = matchEnd;
          });

          // Add remaining text after the last match
          if (lastIndex < text.length) {
            const remainingText = text.slice(lastIndex);
            if (remainingText) {
              newNodes.push({
                type: 'text',
                value: remainingText
              });
            }
          }

          // Replace the original text node with the new nodes
          if (parent && newNodes.length > 0) {
            parent.children.splice(index, 1, ...newNodes);
          }
        }
      }

      // Recursively visit children
      if (node.children) {
        node.children.forEach((child: any, childIndex: number) => {
          visit(child, childIndex, node);
        });
      }
    };

    // Start visiting from the root
    visit(tree, 0, null);
  };
}

// Custom rehype plugin to handle the highlight elements
function rehypeHighlight() {
  return (tree: any) => {
    // This plugin will work with the HTML elements created by the remark plugin
    return tree;
  };
}


export default function MarkdownEditor() {
  const [value, setValue] = useState(`# Welcome to the Markdown Editor

## Features
- **Live preview** - See your formatted text in real-time
- **Syntax highlighting** - Code blocks with syntax highlighting
- **Toolbar** - Easy formatting with toolbar buttons
- **Fullscreen mode** - Focus on your writing
- **Math support** - KaTeX for mathematical expressions
- **Custom highlight** - Use ??text?? to highlight important text

## Math Examples

### Inline Math
The quadratic formula is $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

### Block Math
$$c = \pm\sqrt{a^2 + b^2}$$

More complex equation:
$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

## Example Code Block

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

## Lists

### Unordered List
- Item 1
- Item 2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item

## Custom Highlight Examples

This is normal text with ??highlighted text?? using our custom syntax.

You can highlight ??important information?? or ??key concepts?? in your documents.

## Links and Images

[Visit GitHub](https://github.com)

## Tables

| Feature | Supported |
|---------|-----------|
| Bold | ✓ |
| Italic | ✓ |
| Code | ✓ |

> This is a blockquote
> Start writing your markdown here!
`);


        // .token.title.important {
        //    color: red !important;
        //    line-height: 1.2;
        //    font-size: 15px !important;
        //    font-weight: 600 !important;
        // }
  return (
    <div style={{ padding: '10px', width: '1200px', letterSpacing: 0.5, margin: '0 auto' }}>
      <style>
        {`
        body .w-md-editor-text-pre > code,
        body .w-md-editor-text-input {
            font-size: .9rem !important;
        }

        .token.title.important {
           color: red !important;
           font-size: 0.87rem !important;
           font-weight: 550 !important;
        }
        
        .custom-highlight {
          background-color: #ffeb3b;
          color: #333;
          padding: 2px 4px;
          border-radius: 3px;
          font-weight: 500;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
          
        `}
      </style>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>React Markdown Editor</h1>
      <MDEditor
        value={value}
        onChange={(val) => {
          setValue(val || '')
        }}
        height={600}
        preview="live"
        data-color-mode="light"
        visibleDragbar={false}
        previewOptions={{
          rehypePlugins: [rehypeKatex, rehypeHighlight],
          remarkPlugins: [remarkMath, remarkHighlight]
        }}
        hideToolbar={false}
      />
      <hr />
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
}