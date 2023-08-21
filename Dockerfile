FROM php:8.0.15-apache

RUN apt update && apt upgrade -y && \
    apt-get install -y libssh2-1-dev

RUN a2enmod rewrite

RUN docker-php-ext-install pdo pdo_mysql

RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev

RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd