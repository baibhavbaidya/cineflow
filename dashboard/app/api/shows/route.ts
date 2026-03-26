import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET() {
  try {
    const shows = await sql`
      SELECT
        show_id,
        title,
        first_air_date,
        release_year,
        popularity,
        vote_average,
        vote_count,
        original_language,
        poster_path
      FROM stg_tv_shows
      ORDER BY popularity DESC
      LIMIT 20
    `;
    return NextResponse.json(shows);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch shows" }, { status: 500 });
  }
}