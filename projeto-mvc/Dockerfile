FROM composer:2 AS build

WORKDIR /app
RUN composer create-project laravel/laravel . --no-interaction --prefer-dist

COPY app/Http/Controllers ./app/Http/Controllers
COPY app/Models ./app/Models
COPY routes/web.php ./routes/web.php
COPY resources/views ./resources/views
COPY database/migrations ./database/migrations
COPY database/seeders ./database/seeders

FROM php:8.5-cli

RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    libonig-dev \
    && docker-php-ext-install pdo_sqlite mbstring \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app /app

RUN touch database/database.sqlite

EXPOSE 8092

CMD ["sh", "-c", "php artisan migrate --seed --force && php artisan serve --host=0.0.0.0 --port=8092"]
