const path = require('path'); //doesn't support ES6 modules yet
const CleanWebpackPlugin = require ('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', //Webpack entry point, usually imports all other dependencies
    output: { //specify the name of the file which will be generated as result of WP build
        filename: 'bundle.js', //what's the file called?
        //[contenthash] is used as a cache-busting technique by adding MD5 hash to filename on code change
        path: path.resolve(__dirname, './dist'), //where will the file live? (auto-created by WP)
        //WP needs 'path' as a helper to avoid this error: "configuration.output.path: The provided value "./dist" is not an absolute path!-> The output directory as **absolute path** (required)."
        publicPath: './../' //this tells the browser where to start the path for things like img src
    },
    mode: 'development', //mandatory option, can be: 'none', 'development', or 'production'
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
                    'style-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader' //IMPORTANT: ⬅︎ loaders load from right to left
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
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ // auto genereates HTML with dynamic paths/hashes
            title: 'Hello world',
            filename: 'subfolder/custom_filename.html',
            meta: {
                viewport: 'width=device-width, initial-scale=1',
                description: 'Some description dynamically loaded hereeeee....'
            },
            template: 'src/index.hbs'
        })
    ]
}
