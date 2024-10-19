FROM ubuntu:focal

ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8
ENV DEBIAN_FRONTEND noninteractive
ENV PYTHONUNBUFFERED 1
ENV PYTHONIOENCODING UTF-8
ENV TIMEZONE Australia/Melbourne

WORKDIR /backend

RUN echo "Updating apt sources." && apt-get -qq update

# Install generic useful stuff.
# curl: for HTTP debugging
# iputils-ping: for pinging things
# postgresql-client: for talking to PostgreSQL database
# postgresql-common: PostgreSQL database-cluster manager
# python3-setuptools: So we can install Pip
# python3-dev: Header files for the Python C API so we can compile C stuff or something.
RUN echo "Installing generic stuff." && \
  apt-get -qq install \
  curl \
  iputils-ping \
  postgresql-client \
  postgresql-common \
  python3-setuptools \
  python3-dev

RUN echo "Downloading and installing pip for Python 3.8" && \
  curl https://bootstrap.pypa.io/get-pip.py --silent --output /tmp/get-pip.py && \
  python3 /tmp/get-pip.py


# Install Python packages
COPY backend/requirements.txt .

RUN \
  echo "Installing python packages..." && \
  pip install -r requirements.txt

# Mount the codebase
ADD backend /backend

# Copy Webpack prod build artifacts from project-name-webpack image
COPY --from=project-name-webpack:local /build /build

# Collect static files
ARG DJANGO_SECRET_KEY=not-a-secret
RUN mkdir -p /assets/ && python3 ./manage.py collectstatic --noinput
