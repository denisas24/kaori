export default function StarInput({ value, onChange }) {
  return (
    <div className="star-input">
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          type="button"
          className={n <= value ? 'active' : ''}
          onClick={() => onChange(n)}
        >
          ★
        </button>
      ))}
    </div>
  );
}
