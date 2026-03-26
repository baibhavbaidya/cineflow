"use client";

interface Movie {
  movie_id: number;
  title: string;
  release_year: number;
  popularity: number;
  vote_average: number;
  vote_count: number;
  original_language: string;
  genre_name: string;
  poster_path: string;
}

interface Props {
  movies: Movie[];
}

export default function MovieRow({ movies }: Props) {
  const unique = Array.from(new Map(movies.map((m) => [m.movie_id, m])).values()).slice(0, 10);

  return (
    <div className="movie-list-scroll" style={{ display: "flex", flexDirection: "column", gap: "0", maxHeight: "520px", overflowY: "auto" }}>
      {unique.map((movie, i) => (
        <div
          key={movie.movie_id}
          className="animate-fade-up"
          style={{
            animationDelay: `${i * 60}ms`,
            opacity: 0,
            display: "grid",
            gridTemplateColumns: "2rem 1fr auto",
            alignItems: "center",
            gap: "1rem",
            padding: "0.9rem 1rem",
            borderBottom: "1px solid var(--cinema-border)",
            transition: "background 0.2s ease",
            cursor: "default",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(245,166,35,0.04)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          {/* Rank */}
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              color: i < 3 ? "var(--cinema-amber)" : "var(--cinema-muted)",
              fontWeight: i < 3 ? 500 : 300,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          {/* Title + meta */}
          <div>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                color: "var(--cinema-text)",
                marginBottom: "0.15rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "320px",
              }}
            >
              {movie.title}
            </p>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                color: "var(--cinema-dim)",
                letterSpacing: "0.05em",
              }}
            >
              {movie.release_year} &nbsp;·&nbsp;{" "}
              {movie.genre_name || "—"} &nbsp;·&nbsp;{" "}
              {movie.original_language?.toUpperCase()}
            </p>
          </div>

          {/* Rating */}
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "1.3rem",
                color:
                  movie.vote_average >= 7.5
                    ? "var(--cinema-amber)"
                    : "var(--cinema-text)",
                letterSpacing: "0.04em",
              }}
            >
              {parseFloat(movie.vote_average as any)?.toFixed(1)}
            </p>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                color: "var(--cinema-muted)",
              }}
            >
              {(parseFloat(movie.vote_count as any) / 1000).toFixed(1)}k votes
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}