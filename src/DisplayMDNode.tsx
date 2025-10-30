import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS for math rendering

const content = `# Markdown Display Example

## GitHub Flavored Markdown (GFM)

### Tables
| Feature | Supported | Notes |
|---------|-----------|-------|
| Tables | ✓ | Full support |
| Strikethrough | ~~No~~ ✓ | Now supported |
| Task Lists | ☐ | Coming soon |

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task

### Strikethrough
This is ~~strikethrough~~ text.

## Math Support

### Inline Math
The quadratic formula is $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

### Block Math
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

More complex equation:
$$
\\begin{aligned}
\\nabla \\times \\vec{\\mathbf{B}} -\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{E}}}{\\partial t} &= \\frac{4\\pi}{c}\\vec{\\mathbf{j}} \\\\
\\nabla \\cdot \\vec{\\mathbf{E}} &= 4 \\pi \\rho \\\\
\\end{aligned}
$$

## Code Blocks

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome to Markdown!\`;
}

greet('World');
\`\`\`

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print([fibonacci(i) for i in range(10)])
\`\`\`

## Links and Images

Visit [React Markdown](https://github.com/remarkjs/react-markdown) for more information.

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered List
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

## Blockquote

> This is a blockquote.
> 
> It can span multiple lines.

## Emphasis

**Bold text** and *italic text* and ***bold italic text***.

## Inline Code

Use \`console.log()\` for debugging your code.`;
const streamingSpeed = 5
const streamingInterval = 30

export const DisplayMDNode = (props: any) => {

  const [displayedContent, setDisplayedContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const title = props?.data?.label ?? 'Note';

  useEffect(() => {
    setDisplayedContent('');
    setIsStreaming(true);
    setShowCursor(true);

    let currentIndex = 0;
    const contentLength = content.length;

    const streamInterval = setInterval(() => {
      if (currentIndex < contentLength) {
        // Stream in chunks
        const nextChunk = content.slice(0, currentIndex + streamingSpeed);
        setDisplayedContent(nextChunk);
        currentIndex += streamingSpeed;
      } else {
        setDisplayedContent(content);
        setIsStreaming(false);
        setShowCursor(false);
        clearInterval(streamInterval);
      }
    }, streamingInterval);

    return () => {
      clearInterval(streamInterval);
    };
  }, [content, streamingSpeed, streamingInterval]);

  // Blinking cursor animation
  useEffect(() => {
    if (!isStreaming) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [isStreaming]);

  // (Removed: unused line/scroll helpers)

  return (
    <div style={{ position: 'relative' }}>
      <div
        className="node-header node-drag-handle"
        style={{
          cursor: 'grab',
          background: '#f0f2f5',
          color: '#333',
          padding: '6px 10px',
          border: '1px solid #ccc',
          borderBottom: 'none',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          fontSize: '.85rem',
          fontWeight: 600,
          userSelect: 'none',
        }}
      >
        {title}
      </div>
      <div
        ref={scrollContainerRef}
        className="display-markdown nodrag nowheel"
        style={{
          textAlign: 'left',
          border: '1px solid #ccc',
          borderRadius: '0 0 10px 10px',
          padding: '20px',
          width: '200px',
          height: '200px',
          overflowY: 'auto', // changed from 'scroll' to 'auto' for smoother behavior
          position: 'relative',
          // background: '#fff',
          fontSize: '0.8rem', // Enforce default font size for all
          boxSizing: 'border-box',
          maxWidth: '100%',
          maxHeight: '100%',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain'
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onWheelCapture={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        <div ref={contentRef} style={{ position: 'relative', fontSize: '0.8rem', lineHeight: 1.5, cursor: 'auto' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              // Customize components if needed
              h1: ({ node, ...props }) => (
                <h1 style={{ color: '#636CCB', fontSize: '0.95rem', margin: '0.5em 0' }} {...props} />
              ),
              p: ({ node, ...props }) => (
                <p style={{ color: '#37353E', fontSize: '0.8rem', margin: '0.4em 0' }} {...props} />
              ),
              a: ({ node, ...props }) => (
                <a style={{ color: '#0BA6DF', fontSize: '0.8rem' }} {...props} />
              ),
              code: ({ inline, node, className, children, ...props }: any) => (
                <code
                  className={className}
                  style={{
                    backgroundColor: inline ? 'lightgray' : '#f5f5f5',
                    padding: inline ? '0.2rem 0.4rem' : '0.3rem 0.5rem',
                    fontSize: '0.78em',
                    borderRadius: '4px',
                  }}
                  {...props}
                >
                  {children}
                </code>
              ),
              ul: ({ node, ...props }) => (
                <ul style={{ fontSize: '0.8rem', marginLeft: '1.1em' }} {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol style={{ fontSize: '0.8rem', marginLeft: '1.1em' }} {...props} />
              ),
              li: ({ node, ...props }) => (
                <li style={{ marginBottom: '0.2em' }} {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote style={{ fontSize: '0.8rem', color: '#999', borderLeft: '3px solid #eee', paddingLeft: '1em', margin: '0.4em 0' }} {...props} />
              ),
            }}
          >
            {displayedContent}
          </ReactMarkdown>
          {isStreaming && showCursor && (
            <span
              className="streaming-cursor"
              style={{
                display: 'inline-block',
                width: '10px',
                height: '1.5em',
                backgroundColor: '#636CCB',
                marginLeft: '3px',
                verticalAlign: 'baseline',
              }}
            />
          )}
        </div>
        <style>
          {`
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
            .streaming-cursor {
              animation: blink 1s infinite;
            }
          `}
        </style>
      </div>
    </div>
  );
}
