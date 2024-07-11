import React, { useState, useEffect } from 'react';
import Head from "../Header/Header";

function Instructions() {
  const [value, setValue] = useState('');

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

  return (
    <div>
      <Head/>
      <h1>Instructions</h1>
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
}

export default Instructions;
