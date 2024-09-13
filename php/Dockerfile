FROM php:8.1-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y lsb-release \
    && echo "deb http://deb.debian.org/debian $(lsb_release -sc)-backports main" > /etc/apt/sources.list.d/backports.list \
    && apt-get update && apt-get install -y --no-install-recommends \
      autoconf automake libtool nasm make pkg-config libz-dev build-essential openssl g++ \
      libzip-dev libicu-dev libbz2-dev libavif-dev libheif-dev libpng-dev libc-client-dev libonig-dev \
      libkrb5-dev libxml2-dev libxslt1.1 libxslt1-dev locales locales-all \
      libfreetype6-dev ffmpeg ghostscript pngcrush jpegoptim exiftool liblcms2-dev libwebp-dev poppler-utils git wget \
      libx11-dev libjpeg-dev libtiff-dev opencv-data webp graphviz libreoffice cmake unzip rsync \
      msmtp procps gettext-base nano sudo iproute2 libltdl-dev \
      liblqr-1-0-dev libjpeg-turbo-progs libjpeg62-turbo-dev libopenjp2-7-dev \
      libdjvulibre-dev libpango1.0-dev libxpm-dev \
      xfonts-75dpi xfonts-base \
      advancecomp zopfli optipng pngquant

RUN wget https://imagemagick.org/archive/ImageMagick.tar.gz \
      && tar -xvf ImageMagick.tar.gz \
      && cd ImageMagick-7.* \
      && ./configure --enable-shared --with-tiff=yes --disable-docs --with-tcmalloc --without-perl \
      && make --jobs=$(nproc) \
      && make install \
      && ldconfig /usr/local/lib \
      && cd .. \
      && rm -rf ImageMagick* \
   && docker-php-ext-install -j$(nproc) intl mysqli bcmath bz2 gd soap xsl pdo pdo_mysql fileinfo exif zip opcache sockets \
    && docker-php-ext-enable intl mysqli bcmath bz2 gd soap xsl pdo pdo_mysql fileinfo exif zip opcache sockets \
    && pecl install imagick apcu redis \
    && pecl install -f xmlrpc \
    && docker-php-ext-enable redis imagick apcu xmlrpc \
    && docker-php-ext-configure imap --with-kerberos --with-imap-ssl \
    && docker-php-ext-install -j$(nproc) imap \
    && docker-php-ext-enable imap \
    \
    && pecl install -o -f xdebug \
    && cd ~

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_MEMORY_LIMIT -1
ENV COMPOSER_HOME /var/www/.composer
VOLUME /var/www/.composer

ENV PIMCORE_ROOT /var/www/pimcore
ENV PHP_MEMORY_LIMIT 2G
ENV PHP_ENABLE_XDEBUG false

ENV DEBUG false
ENV UPDATE_UID_GID false
ENV APP_ENV dev
ENV CLUSTER_SETUP false

# PHP opcache default values
ENV OPCACHE_MAX_FILES 16229
ENV OPCACHE_MEMORY 128
ENV OPCACHE_STRINGS_BUFFER 24
ENV OPCACHE_VALIDATE_TIMESTAMPS 1
ENV OPCACHE_REVALIDATE_FREQ 2

# PHP fpm
ENV PHP_PM_MAX_CHILDREN 20
ENV PHP_PM_START_SERVERS 8
ENV PHP_PM_MIN_SPARSE_SERVERS 5
ENV PHP_PM_MAX_SPARSE_SERVERS 12
ENV UPLOAD_MAX_FILESIZE 64M
ENV POST_MAX_SIZE 128M

# New Relic:
ENV NEW_RELIC_LICENSE_KEY must_set
ENV NEW_RELIC_APM_HIGH_SECURITY_MODE false
ENV NEW_RELIC_APM_ENABLED false
ENV NEW_RELIC_PROJECT_NAME must_set
ENV NEW_RELIC_COMMON_APP_NAME Pimcore
ENV NEW_RELIC_TIER_LABEL FPM
ENV NEW_RELIC_ENVIRONMENT_LABEL must_set

COPY etc/bashrc.sh /tmp/
RUN cat /tmp/bashrc.sh >> /etc/bash.bashrc && rm -f /tmp/bashrc.sh

COPY etc/php-fpm.conf.tmpl   /usr/local/etc/
COPY etc/php-fpm.ini /usr/local/etc/php/conf.d/zz-pimcore.ini
COPY etc/php-mail.ini /usr/local/etc/php/conf.d/zz-mail.ini
COPY etc/php-opcache.ini /usr/local/etc/php/conf.d/zz-opcache.ini
COPY etc/php-xdebug.ini /usr/local/etc/php/conf.d/zz-xdebug-settings.ini
COPY etc/php-timezone.ini /usr/local/etc/php/conf.d/zz-timezone.ini
COPY etc/php-newrelic.ini /usr/local/etc/php/conf.d/zz-newrelic.ini
COPY etc/msmtp.conf.tmpl /etc/

COPY bin/* /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN touch /var/log/msmtp.log && chown www-data /var/log/msmtp.log

# Install NR with multiarch support
RUN  VERSION_REGEX='[1-9][0-9]\?\(\.[0-9]\+\)\{3\}' \
   && NEWRELIC_FILE=$(curl 'https://download.newrelic.com/php_agent/release/' | grep -o 'newrelic-php5.*linux\.tar\.gz' | sed -e 's/^.*>//;s/<[^>]*>//g') \
   && NEWRELIC_FOLDER=$(echo ${NEWRELIC_FILE} | sed 's/.tar.gz//g') \
   && curl https://download.newrelic.com/php_agent/release/${NEWRELIC_FILE} | tar -zx \
   && cd ${NEWRELIC_FOLDER} \
   && export NR_INSTALL_USE_CP_NOT_LN=1 \
   && export NR_INSTALL_SILENT=1 \
   && export NR_INSTALL_KEY=TEMPLICENSEAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \
   && ./newrelic-install install \
   && rm -rf ${NEWRELIC_FOLDER}

RUN ln -fs /usr/share/zoneinfo/Europe/Oslo /etc/localtime && echo "Europe/Paris" > /etc/timezone

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

CMD ["php-fpm", "-F"]