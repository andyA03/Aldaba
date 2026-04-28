type SectionHeaderProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
};

export default function SectionHeader({ title, description, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <div className="section-header-row">
      <div className="section-header-left">
        <div className="section-title-text">{title}</div>
        <div className="section-desc">{description}</div>
      </div>
      <button className="btn btn-primary" onClick={onAction}>{actionLabel}</button>
    </div>
  );
}
