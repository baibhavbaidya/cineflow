import os
import requests
from dotenv import load_dotenv

load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

HEADERS = {
    "Authorization": f"Bearer {TMDB_API_KEY}",
    "accept": "application/json"
}

def fetch_trending_movies(pages: int = 5):
    movies = []
    for page in range(1, pages + 1):
        response = requests.get(
            f"{BASE_URL}/trending/movie/week",
            headers=HEADERS,
            params={"page": page}
        )
        data = response.json()
        if "results" in data:
            movies.extend(data["results"])
            print(f"  📦 Movies page {page} fetched — {len(data['results'])} records")
        else:
            print(f"  ⚠️ No results on page {page}")
            break
    return movies

def fetch_trending_tv(pages: int = 5):
    shows = []
    for page in range(1, pages + 1):
        response = requests.get(
            f"{BASE_URL}/trending/tv/week",
            headers=HEADERS,
            params={"page": page}
        )
        data = response.json()
        if "results" in data:
            shows.extend(data["results"])
            print(f"  📦 TV Shows page {page} fetched — {len(data['results'])} records")
        else:
            print(f"  ⚠️ No results on page {page}")
            break
    return shows

def fetch_movie_genres():
    response = requests.get(
        f"{BASE_URL}/genre/movie/list",
        headers=HEADERS
    )
    return response.json().get("genres", [])

def fetch_tv_genres():
    response = requests.get(
        f"{BASE_URL}/genre/tv/list",
        headers=HEADERS
    )
    return response.json().get("genres", [])