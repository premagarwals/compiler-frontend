import { useEffect, useRef, useState } from 'react';

const CDNEditor = ({ value = '', language = 'python', onChange }) => {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  // Track mount status to avoid CodeMirror bombing null div
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      setIsReady(true);
    }
  }, []);

  // Init CodeMirror only when ready
  useEffect(() => {
    if (!isReady || !window.CodeMirror || !editorRef.current || editorInstance.current) return;

    editorRef.current.innerHTML = ''; // clear previous (if any)

    editorInstance.current = window.CodeMirror(editorRef.current, {
      value,
      mode: language,
      theme: 'dracula',
      lineNumbers: true,
      viewportMargin: Infinity,
    });

    editorInstance.current.on('change', () => {
      const updatedValue = editorInstance.current.getValue();
      onChange?.(updatedValue);
    });

    return () => {
      editorRef.current.innerHTML = '';
      editorInstance.current = null;
    };
  }, [isReady]);

  // Language update
  useEffect(() => {
    if (editorInstance.current && language) {
      editorInstance.current.setOption('mode', language);
    }
  }, [language]);

  // Value update
  useEffect(() => {
    if (
      editorInstance.current &&
      value !== undefined &&
      editorInstance.current.getValue() !== value
    ) {
      editorInstance.current.setValue(value);
    }
  }, [value]);

  // Layout resize fix
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      editorInstance.current?.refresh();
      editorInstance.current.setSize('100%', '100%');
    });
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div ref={editorRef} style={{ flexGrow: 1 }} />
    </div>
  );
};

export default CDNEditor;


