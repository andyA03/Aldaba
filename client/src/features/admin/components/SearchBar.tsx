type SearchBarProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, placeholder, onChange }: SearchBarProps) {
  return (
    <div className="toolbar">
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}
