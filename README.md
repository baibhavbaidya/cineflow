# 🎬 CineFlow — Media Analytics Pipeline

A production-grade **end-to-end ELT data pipeline** that ingests real-time movie & TV show data from TMDB, transforms it using dbt, and serves insights through a cinematic analytics dashboard.

**Live Demo →** [https://cineflow-bb.vercel.app](https://cineflow-bb.vercel.app)

---

## What It Does

CineFlow mimics exactly what a Data/Analytics Engineer builds at a media company — a modern ELT pipeline with automated data quality tests, transformation layers, and a production dashboard serving real-time insights.

---

## Architecture
```
TMDB API
   ↓
Python Extraction & Loading
   ↓
Neon (PostgreSQL) — Raw Layer
   ↓
dbt Core — Transformation Layer
   ↓
Next.js API Routes
   ↓
Next.js Dashboard → Vercel
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Extraction | Python, Requests, TMDB API |
| Loading | Pandas, SQLAlchemy |
| Database | Neon (Serverless PostgreSQL) |
| Transformation | dbt Core |
| Dashboard | Next.js 14, TypeScript |
| Charts | Recharts |
| Styling | Tailwind CSS |
| Deployment | Vercel |

---

## Pipeline Details

### Extraction
- Fetches 100+ trending movies and TV shows weekly from TMDB API
- Handles pagination, rate limits, and missing fields
- Outputs clean Pandas dataframes

### Loading (Raw Layer)
Raw data loaded as-is into PostgreSQL:
- `raw_movies`
- `raw_tv_shows`
- `raw_genres_movie`
- `raw_genres_tv`

### Transformation (dbt)
5 dbt models across 2 layers:

**Staging**
- `stg_movies` — cleaned, typed, standardized
- `stg_tv_shows` — cleaned, typed, standardized

**Marts**
- `dim_genres` — genre dimension table
- `fct_trending_movies` — movies joined with genre names
- `fct_genre_performance` — aggregated genre metrics

14 automated data quality tests run on every model.

### Dashboard
- Top trending movies & TV shows ranked by popularity
- Rating vs Popularity scatter plot
- Genre performance bar chart
- Live stats — total titles, avg rating, peak popularity

---

## Local Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### Pipeline Setup
```bash
cd pipeline
python -m venv venv
venv\Scripts\activate       # Windows
source venv/bin/activate    # Mac/Linux
pip install -r requirements.txt

# Add your credentials
cp .env.example .env

# Run ELT pipeline
python extract_load.py

# Run dbt transformations
cd dbt
dbt debug
dbt run
dbt test
```

### Dashboard Setup
```bash
cd dashboard
npm install

# Add your Neon connection string
cp .env.example .env.local

npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

### `pipeline/.env`
```
TMDB_API_KEY=your_tmdb_api_read_access_token
DATABASE_URL=your_neon_connection_string
DBT_HOST=your_neon_host
DBT_USER=your_neon_user
DBT_PASSWORD=your_neon_password
DBT_DBNAME=your_neon_dbname
```

### `dashboard/.env.local`
```
DATABASE_URL=your_neon_connection_string
```

---

## Data Source

This project uses the [TMDB API](https://www.themoviedb.org/documentation/api) for movie and TV show data.

> This product uses the TMDB API but is not endorsed or certified by TMDB.