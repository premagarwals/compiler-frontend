import { useEffect, useRef, useState } from 'react';

const CDNEditor = ({ value = '', language = 'python', onChange }) => {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [height, setHeight] = useState(10);

  useEffect(() => {
    if (editorRef.current) {
      setIsReady(true);
    }
  }, []);

  const updateParentHeight = () => {
    if (containerRef.current && containerRef.current.parentElement) {
      const parentHeight = containerRef.current.parentElement.offsetHeight;
      console.log('Parent height:', parentHeight);
      setHeight(parentHeight);
    }
  };

  useEffect(() => {
    updateParentHeight();
  }, [isReady]);

  useEffect(() => {
    window.addEventListener('resize', updateParentHeight);
    return () => window.removeEventListener('resize', updateParentHeight);
  }, []);

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

  useEffect(() => {
    if (editorInstance.current && language) {
      editorInstance.current.setOption('mode', language);
    }
  }, [language]);

  useEffect(() => {
    if (
      editorInstance.current &&
      value !== undefined &&
      editorInstance.current.getValue() !== value
    ) {
      editorInstance.current.setValue(value);
    }
  }, [value]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      editorInstance.current?.refresh();
      editorInstance.current.setSize('100%', height+'px');
    });
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [height]);

  return (
    <div
      ref={containerRef}
    >
      <div ref={editorRef} style={{ flexGrow: 1 }} />
    </div>
  );
};

export default CDNEditor;
