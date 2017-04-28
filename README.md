# feedpile
 [![Build Status](https://travis-ci.org/captivators/feedpile.svg?branch=master)](https://travis-ci.org/captivators/feedpile)
 [![Coverage Status](https://coveralls.io/repos/github/captivators/feedpile/badge.svg?branch=master)](https://coveralls.io/github/captivators/feedpile?branch=master)

##### About App: 
###### Too much time is spent scouring the web for headlines and jumping between scores of open tabs; Feedpile gives you access to the top stories in a single page app.

## Team

  - __Product Owner__: Darin Allen
  - __Scrum Master__: Alex Rosenthal
  - __Senior Software Engineers__: Mohammad Farooqi, Faiz Mohammad


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

1. Fork and clone repo.
2. Install dependencies.
3. Run <code> npm run deploy </code> to start the server.
6. Navigate to localhost:8081.

## Requirements
- Node 4.1.1
- Node Package Manager 3.10.10
- MongoDB 3.4.3 (if you're interested in having the application run locally)
- Webpack 2.3.3

## Development

### Installing Dependencies
From the root directory,
<pre><code>
$ npm install
$ npm install webpack -g
$ touch .env
$ echo "MONGODB_URI='<MONGO URI>'" >> .env
$ mongod
</code></pre>

### Roadmap

View the project roadmap [here](https://github.com/captivators/feedpile/issues)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
