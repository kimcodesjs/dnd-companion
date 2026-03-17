import React from "react";
import "./DetailRenderer.css";

const API_BASE = "https://www.dnd5eapi.co";
const SKIP_KEYS = new Set(["index", "url", "name"]);

const PRIORITY_KEYS = [
  "image",
  "desc",
  "hit_points",
  "hit_dice",
  "armor_class",
  "speed",
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
  "challenge_rating",
  "xp",
  "level",
  "school",
  "casting_time",
  "range",
  "duration",
  "components",
  "material",
  "damage",
  "higher_level",
  "concentration",
  "ritual",
  "hit_die",
  "proficiencies",
  "saving_throws",
  "starting_equipment",
  "subclasses",
  "special_abilities",
  "actions",
  "legendary_actions",
  "reactions",
  "senses",
  "languages",
  "condition_immunities",
  "damage_immunities",
  "damage_resistances",
  "damage_vulnerabilities",
];

const formatKey = (key) =>
  key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Parse a markdown-flavoured string into React elements.
 * Handles: headings (##, ###, ####), tables (| … |), and paragraphs.
 */
const renderMarkdownText = (text) => {
  const blocks = text.split(/\n\n+/);
  const elements = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;

    // Heading
    const headingMatch = block.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const Tag = `h${Math.min(level + 1, 6)}`; // offset so ## → h3 in detail context
      elements.push(
        <Tag key={i} className="detail-md-heading">
          {headingMatch[2]}
        </Tag>
      );
      continue;
    }

    // Table – look for lines starting with |
    const lines = block.split("\n");
    if (lines.length >= 2 && lines[0].trim().startsWith("|")) {
      const parseRow = (row) =>
        row
          .split("|")
          .map((c) => c.trim())
          .filter(Boolean);

      const headerCells = parseRow(lines[0]);
      // skip separator row (|---|---|)
      const bodyStart = lines[1].match(/^\|[\s\-:|]+\|/) ? 2 : 1;
      const bodyRows = lines.slice(bodyStart).filter((l) => l.trim().startsWith("|"));

      elements.push(
        <div key={i} className="detail-md-table-wrapper">
          <table className="detail-md-table">
            <thead>
              <tr>
                {headerCells.map((cell, ci) => (
                  <th key={ci}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => {
                const cells = parseRow(row);
                return (
                  <tr key={ri}>
                    {cells.map((cell, ci) => (
                      <td key={ci}>{cell}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Inline heading within a multi-line block (lines starting with #)
    // Split the block and render each line
    if (lines.some((l) => /^#{1,6}\s/.test(l.trim()))) {
      for (let li = 0; li < lines.length; li++) {
        const line = lines[li].trim();
        const inlineHeading = line.match(/^(#{1,6})\s+(.+)$/);
        if (inlineHeading) {
          const Tag = `h${Math.min(inlineHeading[1].length + 1, 6)}`;
          elements.push(
            <Tag key={`${i}-${li}`} className="detail-md-heading">
              {inlineHeading[2]}
            </Tag>
          );
        } else if (line) {
          elements.push(<p key={`${i}-${li}`}>{line}</p>);
        }
      }
      continue;
    }

    // Regular paragraph
    elements.push(<p key={i}>{block}</p>);
  }

  return elements;
};

const isRefObject = (val) =>
  val && typeof val === "object" && !Array.isArray(val) && "name" in val;

const isRefArray = (arr) =>
  Array.isArray(arr) && arr.length > 0 && arr.every((item) => isRefObject(item));

const renderValue = (key, value) => {
  if (value === null || value === undefined) return null;

  // Boolean
  if (typeof value === "boolean") {
    return <span className="detail-value">{value ? "Yes" : "No"}</span>;
  }

  // Image path (e.g. "/api/images/monsters/aboleth.png")
  if (key === "image" && typeof value === "string" && value.startsWith("/api/images/")) {
    return (
      <div className="detail-image-wrapper">
        <img
          src={`${API_BASE}${value}`}
          alt=""
          className="detail-image"
          loading="lazy"
        />
      </div>
    );
  }

  // Simple string or number
  if (typeof value === "string" || typeof value === "number") {
    const str = String(value);
    // If the string contains markdown headings or tables, render as markdown
    if (/^#{1,6}\s|^\|.+\|/m.test(str)) {
      return <div className="detail-desc">{renderMarkdownText(str)}</div>;
    }
    return <span className="detail-value">{str}</span>;
  }

  // Array of strings (desc, higher_level, etc.)
  if (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((v) => typeof v === "string")
  ) {
    // Check if any entry contains markdown
    const hasMarkdown = value.some((v) => /^#{1,6}\s|^\|.+\|/m.test(v));
    if (hasMarkdown) {
      return (
        <div className="detail-desc">
          {value.map((text, i) => (
            <React.Fragment key={i}>
              {renderMarkdownText(text)}
            </React.Fragment>
          ))}
        </div>
      );
    }
    return (
      <div className="detail-desc">
        {value.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    );
  }

  // Reference object {name, url}
  if (isRefObject(value)) {
    return <span className="detail-value">{value.name}</span>;
  }

  // Array of reference objects [{name}, ...]
  if (isRefArray(value)) {
    return (
      <span className="detail-value">
        {value.map((item) => item.name).join(", ")}
      </span>
    );
  }

  // Array of complex objects (actions, special_abilities, etc.)
  if (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === "object"
  ) {
    return (
      <div className="detail-subsections">
        {value.map((item, i) => (
          <div key={i} className="detail-subsection">
            {item.name && <h4 className="detail-subsection-name">{item.name}</h4>}
            {item.desc && (
              <p className="detail-subsection-desc">
                {typeof item.desc === "string" ? item.desc : item.desc.join(" ")}
              </p>
            )}
            {item.value !== undefined && !item.name && (
              <span className="detail-value">{String(item.value)}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Plain object (speed, senses, etc.)
  if (typeof value === "object" && !Array.isArray(value)) {
    const entries = Object.entries(value).filter(
      ([k]) => !SKIP_KEYS.has(k)
    );
    if (entries.length === 0) return null;
    return (
      <span className="detail-value">
        {entries
          .map(([k, v]) => {
            if (typeof v === "string" || typeof v === "number") {
              return `${formatKey(k)}: ${v}`;
            }
            if (isRefObject(v)) return `${formatKey(k)}: ${v.name}`;
            return null;
          })
          .filter(Boolean)
          .join(", ")}
      </span>
    );
  }

  // Empty arrays
  if (Array.isArray(value) && value.length === 0) return null;

  return <span className="detail-value">{JSON.stringify(value)}</span>;
};

const DetailRenderer = ({ data }) => {
  if (!data) return null;

  const entries = Object.entries(data).filter(([key]) => !SKIP_KEYS.has(key));

  // Sort: priority keys first (in order), then remaining alphabetically
  const sorted = entries.sort(([a], [b]) => {
    const ai = PRIORITY_KEYS.indexOf(a);
    const bi = PRIORITY_KEYS.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="detail-renderer">
      {sorted.map(([key, value]) => {
        const rendered = renderValue(key, value);
        if (!rendered) return null;

        const isBlock =
          key === "desc" ||
          key === "higher_level" ||
          (Array.isArray(value) &&
            value.length > 0 &&
            typeof value[0] === "object" &&
            !isRefArray(value));

        return (
          <div
            key={key}
            className={`detail-field${isBlock ? " block" : ""}`}
          >
            <span className="detail-label">{formatKey(key)}</span>
            {rendered}
          </div>
        );
      })}
    </div>
  );
};

export default DetailRenderer;
