with movie_genres as (
    select
        genre_name,
        'movie'                             as content_type,
        count(distinct movie_id)            as total_titles,
        round(avg(vote_average), 2)         as avg_rating,
        round(avg(popularity), 2)           as avg_popularity,
        round(avg(vote_count), 0)           as avg_vote_count,
        max(popularity)                     as max_popularity,
        min(vote_average)                   as min_rating,
        max(vote_average)                   as max_rating
    from {{ ref('fct_trending_movies') }}
    where genre_name is not null
    group by genre_name
),

tv_genres as (
    select
        g.genre_name,
        'tv'                                as content_type,
        count(distinct s.show_id)           as total_titles,
        round(avg(s.vote_average), 2)       as avg_rating,
        round(avg(s.popularity), 2)         as avg_popularity,
        round(avg(s.vote_count), 0)         as avg_vote_count,
        max(s.popularity)                   as max_popularity,
        min(s.vote_average)                 as min_rating,
        max(s.vote_average)                 as max_rating
    from {{ ref('stg_tv_shows') }} s,
    lateral unnest(string_to_array(s.genre_ids, ',')) as genre_id_raw(value)
    left join {{ ref('dim_genres') }} g
        on g.genre_id = cast(trim(genre_id_raw.value) as integer)
        and g.genre_type = 'tv'
    where g.genre_name is not null
    group by g.genre_name
),

combined as (
    select * from movie_genres
    union all
    select * from tv_genres
)

select * from combined
order by avg_popularity desc