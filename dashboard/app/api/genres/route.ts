import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET() {
  try {
    const genres = await sql`
      SELECT
        genre_name,
        content_type,
        total_titles,
        avg_rating,
        avg_popularity,
        avg_vote_count,
        max_popularity
      FROM fct_genre_performance
      ORDER BY avg_popularity DESC
    `;
    return NextResponse.json(genres);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch genres" }, { status: 500 });
  }
}