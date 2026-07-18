import { renderStars } from '../lib/utils.js';
import { format } from 'date-fns';

const BADGE_COLORS = {
  green:   { bg: 'rgba(34,139,34,0.15)',  color: '#4a9a4a' },
  black:   { bg: 'rgba(80,50,20,0.2)',    color: '#9a7a5a' },
  white:   { bg: 'rgba(180,180,140,0.2)', color: '#9a9a7a' },
  oolong:  { bg: 'rgba(140,120,40,0.2)',  color: '#9a8a4a' },
  herbal:  { bg: 'rgba(60,160,60,0.15)',  color: '#5aaa5a' },
  chai:    { bg: 'rgba(160,80,20,0.15)',  color: '#c07040' },
  matcha:  { bg: 'rgba(80,160,40,0.15)',  color: '#60a040' },
  fruit:   { bg: 'rgba(200,60,100,0.12)', color: '#c05070' },
  rooibos: { bg: 'rgba(160,60,20,0.15)',  color: '#b06040' },
  other:   { bg: 'rgba(100,120,100,0.15)',color: '#708070' },
};

const BADGE_COLORS_LIGHT = {
  green:   { bg: 'rgba(34,139,34,0.12)',  color: '#2a7a2a' },
  black:   { bg: 'rgba(80,50,20,0.12)',   color: '#6a4a2a' },
  white:   { bg: 'rgba(140,140,100,0.15)',color: '#6a6a4a' },
  oolong:  { bg: 'rgba(140,120,40,0.12)', color: '#7a6a2a' },
  herbal:  { bg: 'rgba(40,140,40,0.12)',  color: '#2a8a2a' },
  chai:    { bg: 'rgba(160,80,20,0.12)',  color: '#9a5020' },
  matcha:  { bg: 'rgba(60,140,20,0.12)',  color: '#3a8020' },
  fruit:   { bg: 'rgba(180,40,80,0.1)',   color: '#a02050' },
  rooibos: { bg: 'rgba(140,50,10,0.12)',  color: '#8a3010' },
  other:   { bg: 'rgba(80,100,80,0.12)',  color: '#506050' },
};

const HeartIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

export default function TeaCard({ entry, onClick, author, showAuthor, onSaveToWishlist }) {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const badgeColors = isDark ? BADGE_COLORS : BADGE_COLORS_LIGHT;
  const badge = badgeColors[entry.category] || { bg: 'var(--bg-elevated)', color: 'var(--text-muted)' };

  const formattedDate = entry.date_tried
    ? format(new Date(entry.date_tried), 'MMM d, yyyy')
    : entry.created_at
    ? format(new Date(entry.created_at), 'MMM d, yyyy')
    : null;

  const initials = author?.display_name
    ? author.display_name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div className="tea-card-horizontal" onClick={() => onClick(entry)}>
      {/* Row 1: Name + Badge + Heart */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', flex: 1 }}>
          <span style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: 17, fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.3 }}>
            {entry.name}
          </span>
          {entry.category && (
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 20, background: badge.bg, color: badge.color, border: `1px solid ${badge.color}30` }}>
              {entry.category}
            </span>
          )}
        </div>
        <button
          style={{ background: 'none', border: 'none', padding: '2px', color: entry.favorite ? 'var(--star)' : 'var(--text-muted)', cursor: 'pointer', flexShrink: 0, lineHeight: 1 }}
          onClick={e => { e.stopPropagation(); if (onSaveToWishlist) onSaveToWishlist(entry); }}
          title={onSaveToWishlist ? 'Save to wishlist' : ''}
        >
          <HeartIcon />
        </button>
      </div>

      {/* Row 2: Brand */}
      {entry.brand && (
        <div style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 8 }}>{entry.brand}</div>
      )}

      {/* Row 3: Stars */}
      <div style={{ marginBottom: 10 }}>
        <span className="stars" style={{ fontSize: 14 }}>{renderStars(entry.rating)}</span>
      </div>

      {/* Row 4: Date + Author */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{formattedDate}</span>
        {showAuthor && author && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{initials}</span>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontSize: 9, fontWeight: 600, color: 'var(--text-secondary)', flexShrink: 0 }}>
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
