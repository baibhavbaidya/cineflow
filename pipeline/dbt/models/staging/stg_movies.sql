with source as (
    select * from raw_movies
),

cleaned as (
    select
        id                                              as movie_id,
        title,
        overview,
        cast(release_date as date)                      as release_date,
        extract(year from cast(release_date as date))   as release_year,
        extract(month from cast(release_date as date))  as release_month,
        round(cast(popularity as numeric), 2)           as popularity,
        round(cast(vote_average as numeric), 1)         as vote_average,
        vote_count,
        genre_ids,
        poster_path,
        backdrop_path,
        original_language,
        adult

    from source
    where title is not null
      and release_date is not null
      and release_date != ''
)

select * from cleaned