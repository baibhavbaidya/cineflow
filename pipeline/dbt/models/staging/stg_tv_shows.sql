with source as (
    select * from raw_tv_shows
),

cleaned as (
    select
        id                                                  as show_id,
        name                                                as title,
        overview,
        cast(first_air_date as date)                        as first_air_date,
        extract(year from cast(first_air_date as date))     as release_year,
        extract(month from cast(first_air_date as date))    as release_month,
        round(cast(popularity as numeric), 2)               as popularity,
        round(cast(vote_average as numeric), 1)             as vote_average,
        vote_count,
        genre_ids,
        poster_path,
        backdrop_path,
        original_language,
        origin_country

    from source
    where name is not null
      and first_air_date is not null
      and first_air_date != ''
)

select * from cleaned