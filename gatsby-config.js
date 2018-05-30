module.exports = {
  siteMetadata: {
    title: 'Firdaus NG Gatsby',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    // 'gatsby-transformer-remark',
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        "strategy": "img",
        plugins: [
          {
            resolve: 'gatsby-remark-draw',
            options: {
              dot: {
                edgeAttributes: {
                  arrowtail: 'empty',
                  arrowhead: 'empty',
                },
              },
              bob: {
                fontFamily: 'verdana',
              },
              mermaid: {
                theme: 'dark',
              },
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          }
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-katex`,
        ],
      },
    }
  ],
}
