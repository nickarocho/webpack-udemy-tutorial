const path = require('path'); //doesn't support ES6 modules yet

module.exports = {
    entry: './src/index.js', //Webpack entry point, usually imports all other dependencies
    output: { //specify the name of the file which will be generated as result of WP build
        filename: 'bundle.js', //what's the file called?
        path: path.resolve(__dirname, './dist') //where will the file live? (auto-created by WP)
        //WP needs 'path' as a helper to avoid this error: "configuration.output.path: The provided value "./dist" is not an absolute path!-> The output directory as **absolute path** (required)."
    },
    mode: 'none' //mandatory option
}
