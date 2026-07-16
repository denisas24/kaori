import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../lib/auth.jsx';
import { CATEGORIES } from '../lib/utils.js';
import TeaCard from '../components/TeaCard.jsx';
import TeaDetailModal from '../components/TeaDetailModal.jsx';

export default function Explore() {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [scope, setScope] = useState('all');
  const [filterCat, setFilterCat] = useState('all');
  const [sortOrder, setSortOrder] = useState(null);
  const [viewEntry, setViewEntry] = useState(null);

  const load = async () => {
    const { data } = await supabase
      .from('tea_entries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    setEntries(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  let filtered = entries.filter(e => {
    if (scope === 'mine' && e.user_id !== user.id) return false;
    const q = search.toLowerCase();
    const matchSearch = !search || e.name?.toLowerCase().includes(q) || e.brand?.toLowerCase().includes(q) || e.review?.toLowerCase().includes(q);
    const matchCat = filterCat === 'all' || e.category === filterCat;
    return matchSearch && matchCat;
  });

  if (sortOrder === 'best') filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  if (sortOrder === 'worst') filtered = [...filtered].sort((a, b) => (a.rating || 0) - (b.rating || 0));

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Explore</h1>
      </div>

      <div className="scope-toggle" style={{ marginBottom: 20 }}>
        <button className={`scope-btn${scope === 'all' ? ' active' : ''}`} onClick={() => setScope('all')}>All teas</button>
        <button className={`scope-btn${scope === 'mine' ? ' active' : ''}`} onClick={() => setScope('mine')}>Mine</button>
      </div>

      <div className="search-wrap">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input placeholder="Search by name, brand, or notes…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="chip-row" style={{ marginBottom: 12 }}>
        <button className={`chip${filterCat === 'all' ? ' active' : ''}`} onClick={() => setFilterCat('all')}>All</button>
        {CATEGORIES.map(c => (
          <button key={c} className={`chip${filterCat === c ? ' active' : ''}`} onClick={() => setFilterCat(filterCat === c ? 'all' : c)}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Sort:</span>
        <button className={`chip${sortOrder === 'best' ? ' active' : ''}`} onClick={() => setSortOrder(sortOrder === 'best' ? null : 'best')}>Best first</button>
        <button className={`chip${sortOrder === 'worst' ? ' active' : ''}`} onClick={() => setSortOrder(sortOrder === 'worst' ? null : 'worst')}>Worst first</button>
      </div>

      {loading ? (
        <div className="tea-grid-list">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="skeleton" style={{ aspectRatio: '2/3', borderRadius: 8 }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state"><p>No teas found.</p></div>
      ) : (
        <>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
          <div className="tea-grid-list">
            {filtered.map(e => <TeaCard key={e.id} entry={e} onClick={setViewEntry} />)}
          </div>
        </>
      )}

      <TeaDetailModal
        entry={viewEntry}
        open={!!viewEntry}
        onClose={() => setViewEntry(null)}
        canEdit={viewEntry?.user_id === user.id}
        onEdit={() => {}}
        onDelete={load}
      />
    </div>
  );
}
