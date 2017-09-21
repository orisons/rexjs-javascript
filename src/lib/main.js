import Module from './module.js';

const defaults = {
    env: process.env.NODE_ENV
}

class RexJS {
    constructor(opts) {
        this._options = Object.assign({}, defaults, opts)
        if (typeof WebSocket == typeof undefined) {
            throw '[RexJS] WebSocket in not avaible in this browser!'
            return;
        }

        if (typeof this._options.websocketUrl == typeof undefined) {
            throw '[RexJS] websocketUrl server url is not set in options!'
            return;
        }
    }

    bindModule(worker, module, callback) {
        if (typeof worker == typeof undefined) {
            console.error('[RexJS] worker not presented!')
            return;
        }

        if (typeof module == typeof undefined) {
            console.error('[RexJS] module not presented!')
            return;
        }

        return new Module(this, worker, module, callback)
    }
}

export default RexJS