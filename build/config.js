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
        entry: resolve('src/index.js'),
        dest: resolve('dist/rexjs.common.js'),
        format: 'cjs',
        banner
    },
    'web-esm': {
        entry: resolve('src/index.js'),
        dest: resolve('dist/rexjs.esm.js'),
        format: 'es',
        banner
    },
    'web-dev': {
        entry: resolve('src/index.js'),
        dest: resolve('dist/rexjs.js'),
        format: 'umd',
        env: 'development',
        banner
    },
    'web-prod': {
        entry: resolve('src/index.js'),
        dest: resolve('dist/rexjs.js'),
        format: 'umd',
        env: 'production',
        banner
    },
}

function genConfig(opts) {
    const config = {
        entry: opts.entry,
        dest: opts.dest,
        external: opts.external,
        format: opts.format,
        banner: opts.banner,
        moduleName: opts.moduleName || 'RexJS',
        plugins: [
            replace({
                __VERSION__: version
            }),
            babel(),
            // alias(Object.assign({}, aliases, opts.alias))
        ].concat(opts.plugins || [])
    }

    if (opts.env) {
        config.plugins.push(replace({
            'process.env.NODE_ENV': JSON.stringify(opts.env)
        }))
    }

    return config
}


if (process.env.TARGET) {
    module.exports = genConfig(builds[process.env.TARGET])
} else {
    exports.getBuild = name => genConfig(builds[name])
    exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]))
}