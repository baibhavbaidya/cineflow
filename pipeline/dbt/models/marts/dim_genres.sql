with movie_genres as (
    select
        id      as genre_id,
        name    as genre_name,
        'movie' as genre_type
    from raw_genres_movie
),

tv_genres as (
    select
        id   as genre_id,
        name as genre_name,
        'tv' as genre_type
    from raw_genres_tv
),

combined as (
    select * from movie_genres
    union all
    select * from tv_genres
)

select
    genre_id,
    genre_name,
    genre_type
from combined
where genre_name is not null