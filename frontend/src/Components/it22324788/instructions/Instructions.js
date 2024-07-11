import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Head from "../Header/Header";

function Instructions() {
  const [value, setValue] = useState('');
  const quillRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await fetch('http://localhost:5000/api');
        if (response.ok) {
          const data = await response.json();
          setValue(data.content);
        } else {
          console.error('Failed to fetch text');
        }
      } catch (error) {
        console.error('Error fetching text:', error);
      }
    };
    fetchText();
  }, []);

  useEffect(() => {
    const quillInstance = quillRef.current;
    if (quillInstance) {
      console.log(quillInstance);
      // Inspect the quillInstance object to ensure it has the expected properties and methods
    }
  }, [quillRef]);

  const saveText = async () => {
    try {
      const response = await fetch('http://localhost:5000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: value }),
      });
      if (response.ok) {
        console.log('Text saved successfully!');
        alert("Text saved successfully!");
      } else {
        console.error('Failed to save text');
      }
    } catch (error) {
      console.error('Error saving text:', error);
    }
  };

  return (
    <div>
      <Head/>
      <h1>Instructions</h1>
      <ReactQuill theme="snow" value={value} onChange={setValue} ref={quillRef} />
      <div ref={containerRef}>
        {/* This empty div is used as the container for ResizeObserver */}
      </div>
      <button onClick={saveText}>Save Text</button>
    </div>
  );
}

export default Instructions;