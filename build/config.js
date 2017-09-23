const path = require('path')
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')

const version = process.env.VERSION || require('../package.json').version

const resolve = p => {
    return path.resolve(__dirname, '../', p)
}

const banner =
    '/*!\n' +
    ' * RexJS v' + version + '\n' +
    ' * (c) ' + new Date().getFullYear() + ' nerdslabs\n' +
    ' * Released under the MIT License.\n' +
    ' */'

const builds = {
    'web-cjs': {
        input: resolve('src/index.js'),
        format: 'cjs',
        output: {
            file: resolve('dist/rexjs.common.js'),
            format: 'cjs'
        },
        banner
    },
    'web-cjs-min': {
        input: resolve('src/index.js'),
        format: 'cjs',
        output: {
            file: resolve('dist/rexjs.common.min.js'),
            format: 'cjs'
        },
        banner
    },
    'web-esm': {
        input: resolve('src/index.js'),
        format: 'es',
        output: {
            file: resolve('dist/rexjs.esm.js'),
            format: 'es'
        },
        banner
    },
    'web-esm-min': {
        input: resolve('src/index.js'),
        format: 'es',
        output: {
            file: resolve('dist/rexjs.esm.min.js'),
            format: 'es'
        },
        banner
    },
    'web': {
        input: resolve('src/index.js'),
        format: 'umd',
        output: {
            file: resolve('dist/rexjs.js'),
            format: 'umd'
        },
        banner
    },
    'web-min': {
        input: resolve('src/index.js'),
        format: 'umd',
        output: {
            file: resolve('dist/rexjs.min.js'),
            format: 'umd'
        },
        banner
    },
}

function genConfig(opts, environment) {
    const env = typeof environment !== 'undefined' ? environment : 'development'

    const config = {
        input: opts.input,
        external: opts.external,
        format: opts.format,
        output: opts.output,
        banner: opts.banner,
        name: opts.name || 'RexJS',
        plugins: [
            replace({
                __VERSION__: version
            }),
            babel(),
            // alias(Object.assign({}, aliases, opts.alias))
        ].concat(opts.plugins || [])
    }

    if (env) {
        config.plugins.push(replace({
            'process.env.NODE_ENV': JSON.stringify(env)
        }))
    }

    return config
}


if (process.env.TARGET) {
    module.exports = genConfig(builds[process.env.TARGET])
} else {
    exports.getBuild = name => genConfig(builds[name])
    exports.getAllBuilds = (environment) => Object.keys(builds).map(name => genConfig(builds[name], environment))
}