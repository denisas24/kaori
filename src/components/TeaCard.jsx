import { CATEGORY_EMOJI, renderStars } from '../lib/utils.js';

const CATEGORY_COLORS = {
  green: '#2d5a2d',
  black: '#3a2a1a',
  white: '#4a4a3a',
  oolong: '#3a3020',
  herbal: '#2a4a2a',
  chai: '#4a3020',
  matcha: '#2a4a20',
  fruit: '#4a2a2a',
  rooibos: '#4a2a1a',
  other: '#2a3a2a',
};

const CATEGORY_COLORS_LIGHT = {
  green: '#d4e8d4',
  black: '#e8d8c8',
  white: '#e8e8d8',
  oolong: '#e8e0c8',
  herbal: '#d8e8d0',
  chai: '#e8d8b8',
  matcha: '#d0e8c0',
  fruit: '#e8d0d0',
  rooibos: '#e8d0b8',
  other: '#d8e0d8',
};

export default function TeaCard({ entry, onClick }) {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const colors = isDark ? CATEGORY_COLORS : CATEGORY_COLORS_LIGHT;
  const bgColor = colors[entry.category] || (isDark ? '#1e2e1a' : '#e0e8d8');

  return (
    <div
      className="tea-card-horizontal"
      onClick={() => onClick(entry)}
      style={{ backgroundColor: bgColor }}
    >
      <div className="tea-card-h-main">
        <div className="tea-card-h-name">{entry.name}</div>
        {entry.brand && <div className="tea-card-h-brand">{entry.brand}</div>}
        <div className="tea-card-h-meta">
          <span className="stars" style={{ fontSize: 12 }}>{renderStars(entry.rating)}</span>
          {entry.category && <span className="cat-badge">{entry.category}</span>}
        </div>
      </div>
      {entry.photo_url && (
        <div className="tea-card-h-img">
          <img src={entry.photo_url} alt={entry.name} />
        </div>
      )}
    </div>
  );
}
