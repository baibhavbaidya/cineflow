import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def get_engine():
    return create_engine(DATABASE_URL)

def run_query(query: str):
    engine = get_engine()
    with engine.connect() as conn:
        return conn.execute(text(query))

def create_raw_tables():
    engine = get_engine()
    with engine.connect() as conn:

        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS raw_movies (
                id INTEGER PRIMARY KEY,
                title TEXT,
                overview TEXT,
                release_date TEXT,
                popularity FLOAT,
                vote_average FLOAT,
                vote_count INTEGER,
                genre_ids TEXT,
                poster_path TEXT,
                backdrop_path TEXT,
                original_language TEXT,
                adult BOOLEAN,
                ingested_at TIMESTAMP DEFAULT NOW()
            );
        """))

        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS raw_tv_shows (
                id INTEGER PRIMARY KEY,
                name TEXT,
                overview TEXT,
                first_air_date TEXT,
                popularity FLOAT,
                vote_average FLOAT,
                vote_count INTEGER,
                genre_ids TEXT,
                poster_path TEXT,
                backdrop_path TEXT,
                original_language TEXT,
                origin_country TEXT,
                ingested_at TIMESTAMP DEFAULT NOW()
            );
        """))

        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS raw_genres_movie (
                id INTEGER PRIMARY KEY,
                name TEXT
            );
        """))

        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS raw_genres_tv (
                id INTEGER PRIMARY KEY,
                name TEXT
            );
        """))

        conn.commit()
        print("✅ Raw tables created successfully")