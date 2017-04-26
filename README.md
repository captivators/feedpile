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
    1. [Testing](#testing)
1. [Contributing](#contributing)

## Usage

1. Fork and clone repo.
2. Install dependencies.
3. Run <code> npm run start </code> to start the server.
4. Run <code> npm run dev-client </code> to compile React files.
5. Run <code> mongod </code> to boot up database server.
6. Navigate to localhost:8081.

## Requirements
- Node 4.1.1
- React 15.4.2
- Redux 3.1.4
- React Router 4.0.0
- MongoDB 3.4.3

## Development

### Installing Dependencies
<pre><code>
$ npm install
$ mongod
$ npm run start
$ npm run dev-client
</code></pre>

### Testing

- For client-side testing, run <code> npm run test </code>
- For server-side testing, run <code> mocha server/tests/server-spec.js </code>
- To see test coverage, run <code> npm run report-coverage </code>


### Roadmap

View the project roadmap [here](https://github.com/captivators/feedpile/issues)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
