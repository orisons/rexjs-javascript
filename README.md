## DEPRECATED
This library is deprecated, please use [storex](https://github.com/nerdslabs/storex) instead.

# RexJS - javascript

[![Travis](https://travis-ci.org/orisons/rexjs-javascript.svg?branch=master)](https://travis-ci.org/orisons/rexjs-javascript)

**RexJS is library for reactivity between elixir data with front-end through javascript websockets.**



## Modules
* [VueJS](https://github.com/orisons/rexjs-vue)

## Installation

**Javascript library require elixir core library [RexJS](https://github.com/orisons/rexjs-elixir)**

Add `rexjs` to your list of dependencies:

**Command line**
```
# with yarn
yarn add rexjs-javascript --save
# with npm
npm install rexjs-javascript --save
```

**File `package.json`**
```json
"rexjs-javascript": "^0.1.0"
```

## Usage

**Create RexJS instance**
```javascript
let rexjs = new RexJS({
    websocketUrl: 'ws://localhost/rexjs'
})
```

**Bind module with worker to RexJS instance**
```javascript
rexjs.bindModule("worker_name", 'module_name', function(data) {
    // Work with data
})
```
