<img src="https://cdn.rawgit.com/orisons/assets/master/rexjs-logo.svg" width="300px">

# rexjs-javascript

**RexJS is library for reactivity between elixir data with front-end through javascript websockets.**

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/4eSXzM9Zem3cwXCYU3QciGaZ/orisons/rexjs-javascript'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/4eSXzM9Zem3cwXCYU3QciGaZ/orisons/rexjs-javascript.svg' />
</a>

## Modules
* [VueJS](https://github.com/orisons/rexjs-vue)

## Installation

**Javascript library require elixir core library [RexJS](https://github.com/orisons/rexjs-elixir)**

Add `rexjs` to your list of dependencies:

**Command line**
```
# with yarn
yarn add rexjs --dev
# with npm
npm install rexjs --dev
```

**File `package.json`**
```json
    "rexjs": "^0.0.1"
```

## Usage

**Create RexJS instance**
```javascript
let rexjs = new RexJS({
    websocketUrl: 'ws://domain.com/rexjs'
})
```

**Bind module with worker to RexJS instance**
```javascript
rexjs.bindModule("worker_name", 'module_name', function(data) {
    // Work with data
})
```
