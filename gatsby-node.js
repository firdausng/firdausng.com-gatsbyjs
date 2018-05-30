const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })

      let tags = []
      result.data.allMarkdownRemark.edges.forEach(edge => {
        tags = [...tags, ...edge.node.frontmatter.tags]
      })

      uniqueTags = tags.filter(function(item, pos) {
        return tags.indexOf(item) == pos
      })

      

      uniqueTags.forEach(tag => {
        createPage({
          path: `/tags/${tag}/`,
          component: path.resolve(`./src/templates/tags.js`),
          context: {
            tag,
          },
        });
      });

      resolve()
    })
  })
}
