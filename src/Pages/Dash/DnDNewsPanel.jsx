import React, { useEffect, useState } from "react";
import "./DnDNewsPanel.css";

const SOURCES = [
  "All",
  "EN World",
  "Gnome Stew",
  "The Angry GM",
  "Tribality",
  "r/DnD",
];

const DnDNewsPanel = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSource, setActiveSource] = useState("All");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/dnd-news");
        if (!res.ok) throw new Error("Failed to fetch news.");
        const data = await res.json();
        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (iso) => {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredArticles =
    activeSource === "All"
      ? articles
      : articles.filter((a) => a.source === activeSource);

  return (
    <div className="dnd-news-panel">
      <div className="dnd-news-panel-header">
        <h2 className="dnd-news-panel-title">D&D News</h2>
      </div>

      <div className="dnd-news-panel-tabs">
        {SOURCES.map((source) => (
          <button
            key={source}
            className={`dnd-news-tab ${activeSource === source ? "dnd-news-tab--active" : ""}`}
            onClick={() => setActiveSource(source)}
          >
            {source}
          </button>
        ))}
      </div>

      <div className="dnd-news-panel-content">
        {loading && <p className="dnd-news-panel-status">Loading news...</p>}

        {error && (
          <p className="dnd-news-panel-status dnd-news-panel-status--error">
            {error}
          </p>
        )}

        {!loading && !error && filteredArticles.length === 0 && (
          <p className="dnd-news-panel-status">No articles found.</p>
        )}

        {!loading &&
          !error &&
          filteredArticles.map((article, index) => (
            <a
              key={index}
              className="dnd-news-card"
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="dnd-news-card-body">
                <span className="dnd-news-card-source">{article.source}</span>
                <p className="dnd-news-card-title">{article.title}</p>
              </div>
              {article.date && (
                <span className="dnd-news-card-date">
                  {formatDate(article.date)}
                </span>
              )}
            </a>
          ))}
      </div>
    </div>
  );
};

export default DnDNewsPanel;
