import { renderStars } from '../lib/utils.js';
import { format } from 'date-fns';

export default function TeaCard({ entry, onClick, author, showAuthor, onSaveToWishlist }) {
  const formattedDate = entry.date_tried
    ? format(new Date(entry.date_tried), 'MMM d, yyyy')
    : entry.created_at
    ? format(new Date(entry.created_at), 'MMM d, yyyy')
    : null;

  const initials = author?.display_name
    ? author.display_name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : null;

  return (
    <div className="tea-card-horizontal" onClick={() => onClick(entry)}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
          <div className="tea-card-h-name" style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: 17 }}>
            {entry.name}
          </div>
          {entry.brand && (
            <div style={{ fontSize: 13, color: 'var(--accent)', marginTop: 2 }}>{entry.brand}</div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {entry.category && <span className="cat-badge">{entry.category}</span>}
          {onSaveToWishlist && (
            <button
              style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-muted)', cursor: 'pointer', lineHeight: 1 }}
              onClick={e => { e.stopPropagation(); onSaveToWishlist(entry); }}
              title="Save to wishlist"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <span className="stars" style={{ fontSize: 13 }}>{renderStars(entry.rating)}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{formattedDate}</div>
        {showAuthor && author && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{author.display_name || ''}</div>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)', flexShrink: 0 }}>
              {author.avatar_url
                ? <img src={author.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                : initials
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
