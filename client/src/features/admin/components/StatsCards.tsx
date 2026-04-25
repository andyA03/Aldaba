import type { CSSProperties } from "react";

type StatsCardItem = {
  value: number;
  label: string;
  color: string;
};

type StatsCardsProps = {
  items: StatsCardItem[];
};

export default function StatsCards({ items }: StatsCardsProps) {
  return (
    <div className="stat-cards">
      {items.map((item) => (
        <div key={item.label} className="stat-card" style={{ "--stat-color": item.color } as CSSProperties}>
          <div className="stat-card-value">{item.value}</div>
          <div className="stat-card-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
