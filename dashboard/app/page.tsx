"use client";
import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import MovieRow from "@/components/MovieRow";
import GenreChart from "@/components/GenreChart";
import ScatterPlot from "@/components/ScatterPlot";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [stats, setStats] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"movies" | "shows">("movies");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/movies").then((r) => r.json()),
      fetch("/api/shows").then((r) => r.json()),
      fetch("/api/genres").then((r) => r.json()),
      fetch("/api/stats").then((r) => r.json()),
    ]).then(([m, s, g, st]) => {
      setMovies(m);
      setShows(s);
      setGenres(g);
      setStats(st);
      setLoaded(true);
    });
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--cinema-black)",
        padding: "0 0 4rem 0",
      }}
    >
      {/* Header */}
      <header
        className="animate-fade-right"
        style={{
          opacity: 0,
          borderBottom: "1px solid var(--cinema-border)",
          padding: "1rem clamp(1rem, 4vw, 2.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "rgba(8,8,8,0.92)",
          backdropFilter: "blur(12px)",
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
          <h1
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "1.8rem",
              letterSpacing: "0.12em",
              color: "var(--cinema-amber)",
            }}
            className="amber-text-glow"
          >
            CineFlow
          </h1>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "var(--cinema-muted)",
              textTransform: "uppercase",
            }}
          >
            Media Analytics Pipeline
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: loaded ? "#22c55e" : "var(--cinema-muted)",
              animation: loaded ? "pulse-amber 2s infinite" : "none",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              color: "var(--cinema-dim)",
              letterSpacing: "0.15em",
            }}
          >
            {loaded ? "LIVE" : "LOADING"}
          </span>
        </div>
      </header>

      <div style={{ padding: "clamp(1rem, 4vw, 2.5rem)", maxWidth: "1400px", margin: "0 auto" }}>

        {/* Hero title */}
        <div
          className="animate-fade-up delay-100"
          style={{ opacity: 0, marginBottom: "2.5rem" }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: "var(--cinema-amber)",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            Weekly Trending Report
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "0.04em",
              color: "var(--cinema-text)",
              lineHeight: 1,
            }}
          >
            What the World
            <br />
            <span style={{ color: "var(--cinema-amber)" }}>Is Watching</span>
          </h2>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1px",
            marginBottom: "3rem",
            background: "var(--cinema-border)",
          }}
        >
          <StatCard label="Movies Tracked" value={stats?.total_movies ?? 0} delay={200} accent />
          <StatCard label="TV Shows" value={stats?.total_shows ?? 0} delay={300} />
          <StatCard label="Movie Avg Rating" value={stats?.avg_rating ?? 0} suffix="/10" delay={400} />
          <StatCard label="Peak Popularity" value={stats?.top_popularity ?? 0} subtitle={stats?.top_title} delay={500} />
        </div>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {/* Trending list */}
          <div
            className="animate-fade-up delay-300 scanline"
            style={{
              opacity: 0,
              background: "var(--cinema-card)",
              border: "1px solid var(--cinema-border)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            {/* Tab header */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid var(--cinema-border)",
              }}
            >
              {(["movies", "shows"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    padding: "0.9rem",
                    background: activeTab === tab ? "rgba(245,166,35,0.06)" : "transparent",
                    border: "none",
                    borderBottom: activeTab === tab
                      ? "2px solid var(--cinema-amber)"
                      : "2px solid transparent",
                    color: activeTab === tab ? "var(--cinema-amber)" : "var(--cinema-muted)",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ padding: "0" }}>
              {activeTab === "movies" ? (
                <MovieRow movies={movies} />
              ) : (
                <MovieRow movies={shows.map((s: any) => ({ ...s, movie_id: s.show_id }))} />
              )}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Rating vs Popularity scatter */}
            <div
              className="animate-fade-up delay-400 scanline"
              style={{
                opacity: 0,
                background: "var(--cinema-card)",
                border: "1px solid var(--cinema-border)",
                borderRadius: "2px",
                padding: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  color: "var(--cinema-dim)",
                  textTransform: "uppercase",
                  marginBottom: "1.2rem",
                }}
              >
                Rating vs Popularity
              </p>
              <ScatterPlot data={movies} />
            </div>

            {/* Genre performance */}
            <div
              className="animate-fade-up delay-500 scanline"
              style={{
                opacity: 0,
                background: "var(--cinema-card)",
                border: "1px solid var(--cinema-border)",
                borderRadius: "2px",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.2rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    color: "var(--cinema-dim)",
                    textTransform: "uppercase",
                  }}
                >
                  Genre Performance
                </p>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem",
                    color: "var(--cinema-amber)",
                    letterSpacing: "0.1em",
                  }}
                >
                  AVG POPULARITY
                </span>
              </div>
              <GenreChart data={genres} type={activeTab === "movies" ? "movie" : "tv"} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="animate-fade-up delay-700"
          style={{
            opacity: 0,
            borderTop: "1px solid var(--cinema-border)",
            paddingTop: "1.5rem",
            display: "flex",
            flexDirection: "column" as const,
            gap: "0.5rem",
            alignItems: "flex-start",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              color: "var(--cinema-muted)",
              letterSpacing: "0.15em",
            }}
          >
            DATA SOURCE: TMDB API &nbsp;·&nbsp; PIPELINE: dbt + PostgreSQL &nbsp;·&nbsp; BUILT WITH NEXT.JS
          </p>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              color: "var(--cinema-muted)",
              letterSpacing: "0.1em",
            }}
          >
            CINEFLOW v1.0
          </p>
        </div>
      </div>
    </main>
  );
}