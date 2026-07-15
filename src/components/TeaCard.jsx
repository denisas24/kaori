import { CATEGORY_EMOJI, renderStars } from '../lib/utils.js';

export default function TeaCard({ entry, onClick }) {
  const emoji = CATEGORY_EMOJI[entry.category] || '🍃';

  return (
    <div className="tea-card" onClick={() => onClick(entry)}>
      <div className="tea-card-poster">
        {entry.photo_url
          ? <img src={entry.photo_url} alt={entry.name} />
          : <span style={{ fontSize: 36, opacity: 0.6 }}>{emoji}</span>
        }
      </div>
      <div className="tea-card-body">
        <div className="tea-card-name">{entry.name}</div>
        {entry.brand && <div className="tea-card-brand">{entry.brand}</div>}
        <div className="tea-card-rating">
          <span className="stars" style={{ fontSize: 11 }}>{renderStars(entry.rating)}</span>
        </div>
      </div>
    </div>
  );
}
