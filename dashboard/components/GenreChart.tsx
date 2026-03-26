"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Genre {
  genre_name: string;
  content_type: string;
  avg_rating: number;
  avg_popularity: number;
  total_titles: number;
}

interface Props {
  data: Genre[];
  type: "movie" | "tv";
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--cinema-card)",
        border: "1px solid var(--cinema-amber)",
        padding: "0.75rem 1rem",
        borderRadius: "2px",
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.7rem",
      }}
    >
      <p style={{ color: "var(--cinema-amber)", marginBottom: "0.4rem", letterSpacing: "0.1em" }}>
        {label}
      </p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: "var(--cinema-text)" }}>
          {p.name}: <span style={{ color: "var(--cinema-amber)" }}>{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function GenreChart({ data, type }: Props) {
  const filtered = data
    .filter((d) => d.content_type === type)
    .sort((a, b) => b.avg_popularity - a.avg_popularity)
    .slice(0, 8);

  return (
  <div style={{ width: "100%", height: 260 }}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={filtered} margin={{ top: 8, right: 8, left: -20, bottom: 40 }}>
        <XAxis
          dataKey="genre_name"
          tick={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            fill: "var(--cinema-dim)",
            letterSpacing: "0.05em",
          }}
          axisLine={{ stroke: "var(--cinema-border)" }}
          tickLine={false}
          angle={-35}
          textAnchor="end"
          interval={0}
        />
        <YAxis
          tick={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            fill: "var(--cinema-muted)",
          }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(245,166,35,0.04)" }} />
        <Bar dataKey="avg_popularity" radius={[2, 2, 0, 0]}>
          {filtered.map((_, i) => (
            <Cell
              key={i}
              fill={i === 0 ? "var(--cinema-amber)" : `rgba(245,166,35,${0.6 - i * 0.06})`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);
}