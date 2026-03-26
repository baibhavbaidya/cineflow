import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET() {
  try {
    const [movieStats] = await sql`
      SELECT
        COUNT(DISTINCT movie_id)                AS total_movies,
        ROUND(AVG(vote_average)::numeric, 1)    AS avg_rating,
        ROUND(MAX(popularity)::numeric, 0)      AS top_popularity,
        (SELECT title FROM fct_trending_movies ORDER BY popularity DESC LIMIT 1) AS top_title
      FROM fct_trending_movies
    `;

    const [showStats] = await sql`
      SELECT
        COUNT(DISTINCT show_id) AS total_shows
      FROM stg_tv_shows
    `;

    return NextResponse.json({
      total_movies: movieStats.total_movies,
      total_shows: showStats.total_shows,
      avg_rating: movieStats.avg_rating,
      top_popularity: movieStats.top_popularity,
      top_title: movieStats.top_title,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}