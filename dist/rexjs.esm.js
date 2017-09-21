/*!
 * RexJS v1.0.0
 * (c) 2017 nerdslabs
 * Released under the MIT License.
 */
function RexJS(opts) {
    var options = opts || {};
    if (typeof WebSocket == typeof undefied) {
        console.error('WebSocket in not avaible in this browser!');
        return;
    }

    if (typeof options.server == typeof undefined) {
        console.error('WebSocket server address not set in options!');
        return;
    }
}

export default RexJS;
