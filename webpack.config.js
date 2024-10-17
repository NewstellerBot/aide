let path = require('path')

module.exports = {
    renderer: {
        target: 'electron-renderer',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/react']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        "style-loader",
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "postcss-preset-env",
                                            {
                                                // Options
                                            },
                                        ],
                                    ],
                                },
                            },
                        }
                    ]
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'react-svg-loader'
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                }
            ]
        },
        resolve: {
            modules: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, './src/renderer/javascripts'),
                path.resolve(__dirname, './src/renderer/stylesheets'),
                path.resolve(__dirname, './src/renderer/images')
            ]
        }
    },
    preload: {
        resolve: {
            modules: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'src', 'main')
            ]
        }
    },
    main: {
        target: 'electron-main',
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        // plugins: plugins,
        resolve: {
            modules: [
                path.resolve(__dirname, 'src', 'main'),
                path.resolve(__dirname, 'resources'),
                path.resolve(__dirname, 'locales'),
                path.resolve(__dirname, 'node_modules')
            ]
        }
    }
}
