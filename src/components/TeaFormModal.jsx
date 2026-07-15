import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../lib/auth.jsx';
import { CATEGORIES, showToast } from '../lib/utils.js';
import StarInput from './StarInput.jsx';

export default function TeaFormModal({ open, onClose, onSaved, entry }) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState('');
  const [dateTried, setDateTried] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (entry) {
      setName(entry.name || '');
      setBrand(entry.brand || '');
      setCategory(entry.category || '');
      setRating(entry.rating || 3);
      setReview(entry.review || '');
      setDateTried(entry.date_tried || '');
      setTags(entry.tags || []);
    } else {
      setName(''); setBrand(''); setCategory(''); setRating(3);
      setReview(''); setDateTried(''); setTags([]);
    }
  }, [entry, open]);

  if (!open) return null;

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const t = tagInput.trim().toLowerCase();
      if (!tags.includes(t)) setTags(prev => [...prev, t]);
      setTagInput('');
    }
  };

  const removeTag = (t) => setTags(prev => prev.filter(x => x !== t));

  const save = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    const payload = {
      name: name.trim(),
      brand: brand.trim() || null,
      category: category || null,
      rating,
      review: review.trim() || null,
      date_tried: dateTried || null,
      tags: tags.length ? tags : null,
      user_id: user.id,
    };
    let error;
    if (entry?.id) {
      ({ error } = await supabase.from('tea_entries').update(payload).eq('id', entry.id));
    } else {
      ({ error } = await supabase.from('tea_entries').insert(payload));
    }
    setSaving(false);
    if (error) { showToast('Something went wrong.'); return; }
    showToast(entry?.id ? 'Tea updated.' : 'Tea logged.');
    onSaved();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 style={{ fontSize: 20 }}>{entry?.id ? 'Edit tea' : 'Log a tea'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={save}>
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Gyokuro" required />
          </div>
          <div className="form-group">
            <label className="form-label">Brand</label>
            <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. Palais des Thés" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">— none —</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Date tried</label>
              <input type="date" value={dateTried} onChange={e => setDateTried(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Rating</label>
            <StarInput value={rating} onChange={setRating} />
          </div>
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea value={review} onChange={e => setReview(e.target.value)} rows={3} placeholder="Tasting notes, mood, brewing method…" style={{ resize: 'vertical' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Flavor tags</label>
            <input
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={addTag}
              placeholder="Type and press Enter"
            />
            {tags.length > 0 && (
              <div className="tag-list">
                {tags.map(t => (
                  <span key={t} className="tag">
                    {t}
                    <button type="button" onClick={() => removeTag(t)}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <button className="btn-primary" style={{ width: '100%', marginTop: 8 }} disabled={saving || !name.trim()}>
            {saving ? 'Saving…' : entry?.id ? 'Save changes' : 'Log tea'}
          </button>
        </form>
      </div>
    </div>
  );
}
