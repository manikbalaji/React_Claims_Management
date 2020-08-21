var config = {
    entry: './main.js',
    
    output: {
       path:'/',
       filename: 'index.js',
    },
    
    devServer: {
       inline: true,
       port: 8085
    },
    
    module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
               loader: 'babel-loader',
               query: {
                  presets: ['es2015', 'react']
               }
            }]
         },
         {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
         }
         // {
         //    test: /\.css?$/,
         //    loaders: ['css-loader','style-loader',]
         //    // use: [
         //    //    {
         //    //      loader: 'style-loader',
         //    //      options: { injectType: 'singletonStyleTag' }
         //    //    },
         //    //    {
         //    //       loader: 'css-loader',
         //    //       options: { import: true }
         //    //     }
         //    //  ]
         //  }
      ]
    }
 }
 
 module.exports = config;