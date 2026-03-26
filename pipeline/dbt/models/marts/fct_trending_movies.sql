with movies as (
    select * from {{ ref('stg_movies') }}
),

genres as (
    select * from {{ ref('dim_genres') }}
    where genre_type = 'movie'
),

exploded as (
    select
        m.movie_id,
        m.title,
        m.overview,
        m.release_date,
        m.release_year,
        m.release_month,
        m.popularity,
        m.vote_average,
        m.vote_count,
        m.original_language,
        m.poster_path,
        trim(genre_id_raw.value) as genre_id_str
    from movies m,
    lateral unnest(string_to_array(m.genre_ids, ',')) as genre_id_raw(value)
),

joined as (
    select
        e.movie_id,
        e.title,
        e.overview,
        e.release_date,
        e.release_year,
        e.release_month,
        e.popularity,
        e.vote_average,
        e.vote_count,
        e.original_language,
        e.poster_path,
        g.genre_name
    from exploded e
    left join genres g
        on g.genre_id = cast(e.genre_id_str as integer)
)

select * from joined