import React, { useState, useEffect } from "react";
import SearchBar from "../../Reusable Components/SearchBar";
import BackButton from "../../Reusable Components/BackButton";
import BackIcon from "../../assets/BackIcon";
import DetailRenderer from "./DetailRenderer";
import { getResourceDetail } from "../../api/dnd5e";
import "./Explore.css";

const BASE_URL = "https://www.dnd5eapi.co/api/2014";

const RESOURCES = [
  { label: "Ability Scores", key: "ability-scores" },
  { label: "Alignments", key: "alignments" },
  { label: "Backgrounds", key: "backgrounds" },
  { label: "Classes", key: "classes" },
  { label: "Conditions", key: "conditions" },
  { label: "Damage Types", key: "damage-types" },
  { label: "Equipment", key: "equipment" },
  { label: "Equipment Categories", key: "equipment-categories" },
  { label: "Feats", key: "feats" },
  { label: "Features", key: "features" },
  { label: "Languages", key: "languages" },
  { label: "Magic Items", key: "magic-items" },
  { label: "Magic Schools", key: "magic-schools" },
  { label: "Monsters", key: "monsters" },
  { label: "Proficiencies", key: "proficiencies" },
  { label: "Races", key: "races" },
  { label: "Rules", key: "rules" },
  { label: "Rule Sections", key: "rule-sections" },
  { label: "Skills", key: "skills" },
  { label: "Spells", key: "spells" },
  { label: "Subclasses", key: "subclasses" },
  { label: "Subraces", key: "subraces" },
  { label: "Traits", key: "traits" },
  { label: "Weapon Properties", key: "weapon-properties" },
];

const Explore = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gridOpen, setGridOpen] = useState(true);

  const [selectedItem, setSelectedItem] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  const handleSelect = (key) => {
    if (selected === key) {
      setSelected(null);
      setResults([]);
      setError(null);
      setGridOpen(true);
      setSelectedItem(null);
      setDetailData(null);
    } else {
      setSelected(key);
      setLoading(true);
      setError(null);
      setGridOpen(false);
      setSelectedItem(null);
      setDetailData(null);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setDetailLoading(true);
    setDetailError(null);
  };

  const handleBackToList = () => {
    setSelectedItem(null);
    setDetailData(null);
    setDetailError(null);
  };

  // Fetch resource list
  useEffect(() => {
    if (!selected) return;

    let cancelled = false;

    fetch(`${BASE_URL}/${selected}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setResults(data.results || []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selected]);

  // Fetch item detail
  useEffect(() => {
    if (!selectedItem || !selected) return;

    let cancelled = false;

    getResourceDetail(selected, selectedItem.index)
      .then((data) => {
        if (!cancelled) setDetailData(data);
      })
      .catch((err) => {
        if (!cancelled) setDetailError(err.message);
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedItem, selected]);

  const filtered = RESOURCES.filter((r) =>
    r.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLabel = RESOURCES.find((r) => r.key === selected)?.label;

  return (
    <div className="explore">
      <BackButton />
      <SearchBar
        placeholder="Search resources..."
        onSearch={(val) => setSearch(val)}
      />

      <div className="explore-grid-wrapper">
        {selected && (
          <button
            className="explore-grid-toggle"
            onClick={() => setGridOpen(!gridOpen)}
          >
            {gridOpen ? "Hide Resources" : "Show Resources"}
            <span className={`explore-grid-chevron${gridOpen ? " open" : ""}`}>
              ▾
            </span>
          </button>
        )}
        <div className={`explore-grid${gridOpen ? "" : " collapsed"}`}>
          {filtered.map((resource) => (
            <button
              key={resource.key}
              className={`explore-card${selected === resource.key ? " active" : ""}`}
              onClick={() => handleSelect(resource.key)}
            >
              {resource.label}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="explore-empty">No matching resources found.</p>
          )}
        </div>
      </div>

      {selected && (
        <div className="explore-results">
          {selectedItem ? (
            <>
              <div className="explore-detail-header">
                <button
                  className="explore-detail-back"
                  onClick={handleBackToList}
                >
                  <BackIcon size={14} />
                  {selectedLabel}
                </button>
                <h2 className="explore-results-title">
                  {selectedItem.name}
                </h2>
              </div>

              {detailLoading && (
                <p className="explore-results-status">Loading...</p>
              )}
              {detailError && (
                <p className="explore-results-status error">{detailError}</p>
              )}
              {!detailLoading && !detailError && detailData && (
                <DetailRenderer data={detailData} />
              )}
            </>
          ) : (
            <>
              <h2 className="explore-results-title">{selectedLabel}</h2>

              {loading && <p className="explore-results-status">Loading...</p>}
              {error && (
                <p className="explore-results-status error">{error}</p>
              )}

              {!loading && !error && results.length > 0 && (
                <ul className="explore-results-list">
                  {results.map((item) => (
                    <li
                      key={item.index}
                      className="explore-results-item"
                      onClick={() => handleItemClick(item)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}

              {!loading && !error && results.length === 0 && (
                <p className="explore-results-status">No results found.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;
