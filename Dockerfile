# Use official Ruby image as a parent image
FROM ruby:latest

# Set the working directory in the container
WORKDIR /app

# Install dependencies
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    postgresql-client \
    imagemagick \
    gsfonts \
    curl \
    tmux \
    && rm -rf /var/lib/apt/lists/*

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

# Install overmind
RUN curl -L https://github.com/DarthSim/overmind/releases/download/v2.2.2/overmind-v2.2.2-linux-amd64.gz | gzip -d > /usr/local/bin/overmind && chmod +x /usr/local/bin/overmind

# Copy the Gemfile and Gemfile.lock into the image
COPY Gemfile Gemfile.lock ./

# Install gems
RUN gem install bundler:2.3.14
RUN bundle install

# Copy the rest of the application code into the image
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

