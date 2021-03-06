create table rides (
    id serial NOT NULL,
    completed_on timestamp,
    distance_travelled real,
    end_location_lat double precision,
    end_location_long double precision,
    started_on timestamp,
    driver_rating real,
    charity_id smallint,
    requested_car_category varchar(8),
    free_credit_used double precision,
    surge_factor double precision,
    start_location_long double precision,
    start_location_lat double precision,
    color varchar(16),
    make varchar(16),
    model varchar(32),
    year int,
    prcp double precision,
    tmax smallint,
    tmin smallint,
    awnd real,
    gust_speed real,
    fog bool,
    heavy_fog bool,
    thunder bool
);
