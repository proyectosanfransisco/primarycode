module.exports = {
 entry: './sources/index.ts',
 output: {
   filename: 'dist/app.js',
   path: __dirname
 },
 module: {
   rules: [
     {
       test: /\.ts?$/,
       loader: 'awesome-typescript-loader'
     }
   ]
 },
 resolve: {
   extensions: [".ts", ".js"]
 },
 devtool: 'inline-source-map',
};