module.exports = {
    entry: './src/index.js', //Webpack entry point, usually imports all other dependencies
    output: { //specify the name of the file which will be generated as result of WP build
        filename: 'bundle.js', //what's the file called?
        path: './dist' //where will the file live? (auto-created by WP)
    },
    mode: 'none' //mandatory option
}