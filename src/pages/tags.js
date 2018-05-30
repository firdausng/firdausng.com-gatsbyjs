import React from 'react'
import Link from 'gatsby-link'

const TagsPage = ({ data }) => {
  let tags = []
  data.allMarkdownRemark.edges.map(edge => {
    tags = [...edge.node.frontmatter.tags, ...tags]
  })
  let uniqueTags = tags.filter(function(item, pos) {
    return tags.indexOf(item) == pos
  })

  return (
    <div>
      <h1>Tags ({tags.length})</h1>
      <ul>
        {uniqueTags.map(uTag => {
          return (
            <li key={uTag}>
              <Link to={`tags/${uTag}`}>{uTag}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const query = graphql`
  query IndexTagQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            tags
          }
        }
      }
    }
  }
`

export default TagsPage
