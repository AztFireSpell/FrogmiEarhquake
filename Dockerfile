# syntax = docker/dockerfile:1

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
ARG RUBY_VERSION=3.2.3
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base

# Rails app lives here
WORKDIR /rails

# Set production environment
ENV RAILS_ENV="development" \
    BUNDLE_WITHOUT=""

# Install packages needed to build gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libvips pkg-config

#Instalar las gemas
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy application code
COPY . .

ENTRYPOINT ["./bin/docker-entrypoint"]

RUN bundle exec bootsnap precompile app/ lib/

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000

CMD ["./bin/rails", "server", "-b", "0.0.0.0"]
