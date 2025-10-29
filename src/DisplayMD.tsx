import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS for math rendering

interface DisplayMDProps {
  content: string;
  streamingSpeed?: number; // Characters per interval (default: 5)
  streamingInterval?: number; // Milliseconds between updates (default: 30)
}

export default function DisplayMD({ 
  content, 
  streamingSpeed = 5,
  streamingInterval = 30 
}: DisplayMDProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [lineNumber, setLineNumber] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  // Function to scroll to a specific line
  const scrollToLine = (lineNum: number) => {
    if (!scrollContainerRef.current || !contentRef.current) return;
    
    const lines = displayedContent.split('\n');
    if (lineNum < 1 || lineNum > lines.length) return;
    
    // Calculate approximate position based on line number
    const container = scrollContainerRef.current;
    const contentHeight = contentRef.current.scrollHeight;
    const lineHeight = contentHeight / Math.max(lines.length, 1);
    const targetScrollTop = (lineNum - 1) * lineHeight;
    
    container.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    });
  };

  // Scroll to top
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToLine = () => {
    scrollToLine(lineNumber);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Scroll controls */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '10px', 
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <input
          type="number"
          min="1"
          value={lineNumber}
          onChange={(e) => setLineNumber(parseInt(e.target.value) || 1)}
          placeholder="Line number"
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            width: '120px'
          }}
        />
        <button
          onClick={handleScrollToLine}
          style={{
            padding: '8px 16px',
            backgroundColor: '#636CCB',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Go to Line
        </button>
        <button
          onClick={scrollToTop}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0BA6DF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          ↑ Top
        </button>
        <button
          onClick={scrollToBottom}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0BA6DF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          ↓ Bottom
        </button>
      </div>

      <div 
        ref={scrollContainerRef}
        className="display-markdown" 
        style={{ 
          textAlign: 'left', 
          border: '1px solid #ccc', 
          borderRadius: '10px', 
          padding: '20px', 
          height: '500px', 
          overflowY: 'auto',
          position: 'relative'
        }}
      >
        <div ref={contentRef} style={{ position: 'relative' }}>
        <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Customize components if needed
          h1: ({ node, ...props }) => (
            <h1 style={{ color: '#636CCB', fontSize: '2rem' }} {...props} />
          ),
          p: ({ node, ...props }) => (
            <p style={{ color: '#37353E', fontSize: '.95rem' }} {...props} />
          ),
          a: ({ node, ...props }) => (
            <a style={{ color: '#0BA6DF', fontSize: '.95rem' }} {...props} />
          ),
          code: ({ inline, node, className, children, ...props }: any) => (
            <code
              className={className}
              style={{
                backgroundColor: inline ? 'lightgray' : 'transparent',
                padding: inline ? '0.2rem 0.4rem' : '0',
                borderRadius: '4px',
              }}
              {...props}
            >
              {children}
            </code>
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
