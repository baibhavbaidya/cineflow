import pandas as pd
from utils.tmdb import (
    fetch_trending_movies,
    fetch_trending_tv,
    fetch_movie_genres,
    fetch_tv_genres
)
from utils.db import get_engine, create_raw_tables

def clean_movies(raw: list) -> pd.DataFrame:
    df = pd.DataFrame(raw)
    df = df[[
        "id", "title", "overview", "release_date",
        "popularity", "vote_average", "vote_count",
        "genre_ids", "poster_path", "backdrop_path",
        "original_language", "adult"
    ]]
    df["genre_ids"] = df["genre_ids"].apply(lambda x: ",".join(map(str, x)))
    df["adult"] = df["adult"].astype(bool)
    df["vote_average"] = pd.to_numeric(df["vote_average"], errors="coerce")
    df["vote_count"] = pd.to_numeric(df["vote_count"], errors="coerce").fillna(0).astype(int)
    df["popularity"] = pd.to_numeric(df["popularity"], errors="coerce")
    df["release_date"] = df["release_date"].replace("", None)
    df = df.drop_duplicates(subset=["id"])
    return df

def clean_tv_shows(raw: list) -> pd.DataFrame:
    df = pd.DataFrame(raw)
    df = df[[
        "id", "name", "overview", "first_air_date",
        "popularity", "vote_average", "vote_count",
        "genre_ids", "poster_path", "backdrop_path",
        "original_language", "origin_country"
    ]]
    df["genre_ids"] = df["genre_ids"].apply(lambda x: ",".join(map(str, x)))
    df["origin_country"] = df["origin_country"].apply(lambda x: ",".join(x) if isinstance(x, list) else "")
    df["vote_average"] = pd.to_numeric(df["vote_average"], errors="coerce")
    df["vote_count"] = pd.to_numeric(df["vote_count"], errors="coerce").fillna(0).astype(int)
    df["popularity"] = pd.to_numeric(df["popularity"], errors="coerce")
    df["first_air_date"] = df["first_air_date"].replace("", None)
    df = df.drop_duplicates(subset=["id"])
    return df

def clean_genres(raw: list) -> pd.DataFrame:
    df = pd.DataFrame(raw)
    df = df[["id", "name"]]
    df = df.drop_duplicates(subset=["id"])
    return df

def load_to_db(df: pd.DataFrame, table: str):
    engine = get_engine()
    df.to_sql(
        table,
        engine,
        if_exists="replace",
        index=False,
        method="multi"
    )
    print(f"  ✅ Loaded {len(df)} records into {table}")

def run():
    print("\n🚀 CineFlow ELT Pipeline Starting...\n")

    print("📡 Creating raw tables...")
    create_raw_tables()

    print("\n🎬 Extracting trending movies...")
    raw_movies = fetch_trending_movies(pages=5)
    movies_df = clean_movies(raw_movies)
    print(f"  🧹 Cleaned {len(movies_df)} movies")
    load_to_db(movies_df, "raw_movies")

    print("\n📺 Extracting trending TV shows...")
    raw_tv = fetch_trending_tv(pages=5)
    tv_df = clean_tv_shows(raw_tv)
    print(f"  🧹 Cleaned {len(tv_df)} TV shows")
    load_to_db(tv_df, "raw_tv_shows")

    print("\n🎭 Extracting genres...")
    movie_genres = fetch_movie_genres()
    tv_genres = fetch_tv_genres()
    movie_genres_df = clean_genres(movie_genres)
    tv_genres_df = clean_genres(tv_genres)
    load_to_db(movie_genres_df, "raw_genres_movie")
    load_to_db(tv_genres_df, "raw_genres_tv")

    print("\n✅ CineFlow ELT Pipeline Complete!\n")

if __name__ == "__main__":
    run()