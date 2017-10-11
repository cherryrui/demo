var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var modules_path = __dirname + '/node_modules';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var autoprefixer = require('autoprefixer');

const pkgPath = path.join(__dirname, "./package.json");
const pkg = require(pkgPath);
let theme = {};
if (pkg.theme && typeof(pkg.theme) === 'string') {
    let cfgPath = pkg.theme;
    // relative path
    if (cfgPath.charAt(0) === '.') {
        cfgPath = path.resolve(__dirname, cfgPath);
    }
    const getThemeConfig = require(cfgPath);
    theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
    theme = pkg.theme;
}

module.exports = {
    context: __dirname + "/",
    devtool: debug ? 'source-map' : null,
    entry: {
        store: path.join(__dirname, "./src/App.js"),
        common: [
            'react', 'react-dom', 'react-router', 'axios', 'react-redux', 'react-intl'
        ],
    },
    resolve: {
        alias: {
            'react$': modules_path + "/react/dist/react.min.js",
            'react-dom$': modules_path + "/react-dom/dist/react-dom.min.js",
            'react-router$': modules_path + "/react-router/umd/ReactRouter.min.js",
            'axios$': modules_path + "/axios/dist/axios.min.js",
        }
    },
    module: {
        noParse: [
            'react', 'react-dom', 'react-router', 'axios'
        ],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: [
                    'react-html-attrs',
                    'transform-decorators-legacy',
                    'transform-class-properties', ["import", {
                        "libraryName": "antd",
                        "style": true
                    }]
                ]
            }
        }, {
            test(filePath) {
                return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
            },
            loader: ExtractTextPlugin.extract(
                'css?sourceMap!' +
                'postcss!' +
                `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
            )
        }, {
            test: /\.module\.less$/,
            loader: ExtractTextPlugin.extract(
                'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!' +
                'postcss!' +
                `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
            )
        }, {
            test: /\.scss/,
            loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=50000&name=[path][name].[ext]'
        }, {
            test: /\.css$/,
            loader: "style!css!"
        }]
    },
    postcss: [autoprefixer],
    output: {
        path: __dirname + "/../server/public/js",
        filename: "[name].js",
        publicPath: "/js/",
        chunkFilename: '[name].js'
    },
    plugins: debug ? [
        new ExtractTextPlugin("../css/[name].css", {
            allChunks: true
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new webpack.NoErrorsPlugin(),
    ] : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require', 'module', '_']
            },
            compress: {
                // 压缩警告
                warnings: false,
                // 删除废代码
                dead_code: true,
                // 删除console
                drop_console: true,
                // 删除调试信息
                drop_debugger: true,
            },
            beautify: false,
            comments: false,
            sourcemap: false,
            output: {
                comments: false,
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new ExtractTextPlugin('../css/[name].css', {
            allChunks: true
        })

    ]
}