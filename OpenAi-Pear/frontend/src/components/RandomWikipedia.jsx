import React, { useState } from 'react';

function RandomWikipedia() {
  const [article, setArticle] = useState({ title: '', summary: '', content: '', url: "", summary: "", closest: "" });

  const fetchRandomArticle = async () => {
    try {
      const response = await fetch('http://localhost:8000/random_wikipedia');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      setArticle({ title: data.title, summary: data.summary, content: data.content, url: data.url, summary: data.summary, closest: data.closest });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div>
    <button onClick={fetchRandomArticle}>Load Article</button>
    <h2><strong>Title:</strong> {article.title}</h2>
    <p><strong>URL:</strong> <a href={article.url} target="_blank" rel="noopener noreferrer">{article.url}</a></p>
    <p><strong>Content:</strong> {article.content}</p>
    <p><strong>Closest:</strong> {article.closest}</p>
    <p><strong>Summary:</strong> {article.summary}</p>
  </div>
  );
}

export default RandomWikipedia;
