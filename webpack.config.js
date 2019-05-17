const path = require('path'); //doesn't support ES6 modules yet
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js', //Webpack entry point, usually imports all other dependencies
    output: { //specify the name of the file which will be generated as result of WP build
        filename: 'bundle.js', //what's the file called?
        path: path.resolve(__dirname, './dist'), //where will the file live? (auto-created by WP)
        //WP needs 'path' as a helper to avoid this error: "configuration.output.path: The provided value "./dist" is not an absolute path!-> The output directory as **absolute path** (required)."
        publicPath: 'dist/' //this tells the browser where to start the path for things like img src
    },
    mode: 'none', //mandatory option
    module: { //teaching WP how to import different file types (knows JS "by heart", but not other types)
        rules: [
            {
                test: /\.(png|jpg)$/, //regex to search for .png OR .jpg files
                use: [ //specify which loader should be used by WP when it needs to import png or jpg file
                    'file-loader' //loader which copies file into output folder
                    //as an MD5 hash of the file contents w/ the original extension
                    //** NEED to install via 'npm install file-loader --save-dev'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' //IMPORTANT: ⬅︎ loaders load from right to left
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/env' ], //helps compile ES6 to ES5
                        plugins: [ 'transform-class-properties' ] //needs full list of plugins of ES6 features you want to convert
                    }
                }
            }
        ]
    },
    plugins: [
        //new UglifyJsPlugin(),
        new TerserPlugin(), //minifies bundle.js
        //** TerserPlugin is now recommended over uglify.js!!!
        new MiniCssExtractPlugin({
            filename: 'styles.css' //extracts dynamic CSS in JS and compiles to new css file
        })
    ]
}
