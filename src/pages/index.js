import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({data}) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <h2>Index</h2>
    <ul>
    {data.allMarkdownRemark.edges.map(post =>(
      <li key={post.node.id}>
        <Link to={post.node.frontmatter.path}>{post.node.frontmatter.title}</Link>
      </li>
    ))}
    </ul>
  </div>
)

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 10) {
      edges {
        node {
          id
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`

export default IndexPage
