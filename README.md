weleanit-music
==============

## Requirements

- docker
- android sdk

## Installation

```
cd app
make build-docker
make install
```

Create a file in `/app/src/config` called `local.yml` and put:

```
server:
  SESSION_KEY: YOURKEY
  ECHONEST_API_URL: http://developer.echonest.com/api/v4/
  ECHONEST_KEY: YOURECHONESTKEY
  spotify:
    CLIENT_ID: YOURCLIENTID
    CLIENT_SECRET: YOURCLIENTSECRET
```

## Start

```
make launch-docker
```

then go to http://localhost:3000
