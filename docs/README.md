# rexjs-javascript

**RexJS is library for reactivity between elixir data with front-end through javascript websockets.**

## Modules
* [VueJS](https://www.google.com)

## Installation

!> Javascript library require **elixir core library** [RexJS](https://github.com/orisons/rexjs-elixir)

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
    "rexjs": "^__VERSION__"
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