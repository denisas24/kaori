import { renderStars } from '../lib/utils.js';
import { useTheme } from '../lib/theme.jsx';

const CATEGORY_COLORS_DARK = {
  green: '#1a2e1a', black: '#221810', white: '#22221a',
  oolong: '#22200e', herbal: '#162616', chai: '#261e10',
  matcha: '#162610', fruit: '#261414', rooibos: '#261810', other: '#1a221a',
};

const CATEGORY_COLORS_LIGHT = {
  green: '#e8f0e4', black: '#f0e8dc', white: '#f0f0e4',
  oolong: '#f0ece0', herbal: '#e4f0e0', chai: '#f0e4d0',
  matcha: '#e0f0d8', fruit: '#f0e0e0', rooibos: '#f0e4d8', other: '#e8f0e4',
};

export default function TeaCard({ entry, onClick, author, showAuthor, onSaveToWishlist }) {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? CATEGORY_COLORS_DARK : CATEGORY_COLORS_LIGHT;
  const bgColor = colors[entry.category] || (theme === 'dark' ? '#1a221a' : '#e8f0e4');

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
          {entry.tags?.slice(0,2).map(t => <span key={t} className="tag" style={{ padding: '1px 7px', fontSize: 11 }}>{t}</span>)}
        </div>
        {showAuthor && author && (
          <div style={{ marginTop: 6, fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            {author.avatar_url
              ? <img src={author.avatar_url} style={{ width: 14, height: 14, borderRadius: '50%', objectFit: 'cover' }} alt="" />
              : <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--bg-elevated)', display: 'inline-block' }} />
            }
            {author.display_name || 'Unknown'}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
        {entry.photo_url && (
          <div className="tea-card-h-img">
            <img src={entry.photo_url} alt={entry.name} />
          </div>
        )}
        {onSaveToWishlist && (
          <button
            className="btn-ghost"
            style={{ padding: '3px 8px', fontSize: 11 }}
            onClick={e => { e.stopPropagation(); onSaveToWishlist(entry); }}
            title="Save to wishlist"
          >
            + Wishlist
          </button>
        )}
      </div>
    </div>
  );
}
