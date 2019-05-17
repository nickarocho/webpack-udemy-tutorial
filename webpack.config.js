const path = require('path'); //doesn't support ES6 modules yet

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
                    'style-loader', 'css-loader'
                ]
            }
        ]
    }
}
