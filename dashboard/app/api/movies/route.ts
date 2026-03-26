import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET() {
  try {
    const movies = await sql`
      SELECT
        movie_id,
        title,
        release_date,
        release_year,
        popularity,
        vote_average,
        vote_count,
        original_language,
        poster_path,
        genre_name
      FROM fct_trending_movies
      ORDER BY popularity DESC
      LIMIT 20
    `;
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}