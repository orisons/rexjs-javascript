class Module {
    constructor(context, worker, module, callback) {
        this._context = context
        this._callback = callback
        this.worker = worker
        this.module = module
        this.data = {}

        this.bind()
    }

    bind() {
        this.connection = new WebSocket(this._context._options.websocketUrl + '?worker=' + this.worker + '&module=' + this.module)
        this.connection.onopen = this._bind
        this.connection.onclose = this._unbind
        this.connection.onmessage = (event) => {
            this._message(event)
        }
    }

    unbind() {
        this.connection.close()
    }

    _bind() {

    }

    _message(event) {
        const data = JSON.parse(event.data)
        if(typeof data.error !== typeof undefined) {
            console.error('[RexJS] ' + data.error)
        } else {
            this.data = data
            this._callback(this.data)
        }
    }

    _unbind() {
        console.debug('[RexJS] worker: ' + this.worker + ', module: ' + this.module + ' disconnected')
    }
}

export default Module