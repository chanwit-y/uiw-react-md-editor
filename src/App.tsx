import './App.css'
import MarkdownEditor from './MarkdownEditor'
import DisplayMD from './DisplayMD'

function App() {
  const exampleContent = `# Markdown Display Example

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

Use \`console.log()\` for debugging your code.
`;

  return (
    <>
     <MarkdownEditor /> 
     <div style={{ marginTop: '40px', padding: '20px', maxWidth: '1200px', margin: '40px auto' }}>
       <h1 style={{ marginBottom: '20px', color: '#333' }}>Markdown Display Component</h1>
       <DisplayMD content={exampleContent} />
     </div>
    </>
  )
}

export default App
