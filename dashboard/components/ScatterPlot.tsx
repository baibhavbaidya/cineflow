"use client";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts";

interface Movie {
  title: string;
  vote_average: number;
  popularity: number;
  vote_count: number;
}

interface Props {
  data: Movie[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div
      style={{
        background: "var(--cinema-card)",
        border: "1px solid var(--cinema-border)",
        padding: "0.75rem",
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.65rem",
        borderRadius: "2px",
        maxWidth: "180px",
      }}
    >
      <p style={{ color: "var(--cinema-amber)", marginBottom: "0.3rem" }}>{d?.title}</p>
      <p style={{ color: "var(--cinema-dim)" }}>Rating: {parseFloat(d?.vote_average).toFixed(1)}</p>
      <p style={{ color: "var(--cinema-dim)" }}>Popularity: {parseFloat(d?.popularity).toFixed(0)}</p>
    </div>
  );
};

export default function ScatterPlot({ data }: Props) {
  const unique = Array.from(new Map(data.map((m) => [m.title, m])).values());

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 16, right: 24, left: 8, bottom: 32 }}>
          <XAxis
            dataKey="vote_average"
            name="Rating"
            domain={[0, 10]}
            tick={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              fill: "var(--cinema-dim)",
            }}
            axisLine={{ stroke: "var(--cinema-border)" }}
            tickLine={false}
            label={{
              value: "RATING",
              position: "insideBottom",
              offset: -16,
              style: {
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                fill: "var(--cinema-amber)",
                letterSpacing: "0.15em",
              },
            }}
          />
          <YAxis
            dataKey="popularity"
            name="Popularity"
            tick={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              fill: "var(--cinema-dim)",
            }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "POPULARITY",
              angle: -90,
              position: "insideLeft",
              offset: 16,
              style: {
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                fill: "var(--cinema-amber)",
                letterSpacing: "0.15em",
              },
            }}
          />
          <ZAxis dataKey="vote_count" range={[20, 120]} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "var(--cinema-border)" }}
          />
          <Scatter
            data={unique}
            fill="var(--cinema-amber)"
            fillOpacity={0.7}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}