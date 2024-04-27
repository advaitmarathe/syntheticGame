import React, { useState } from 'react';

function RandomWikipedia() {
  const [article, setArticle] = useState({ title: '', summary: '', content: '', url: "", summary: "" });

  const fetchRandomArticle = async () => {
    try {
      const response = await fetch('http://localhost:8000/random_wikipedia');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setArticle({ title: data.title, summary: data.summary, content: data.content, url: data.url, summary: data.summary });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchRandomArticle}>Load Article</button>
      <h2>{article.title}</h2>
      <p>{article.url}</p>
      <p>{article.content}</p>
      {/* <p>{article.summary}</p> */}
    </div>
  );
}

export default RandomWikipedia;
