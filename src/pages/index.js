import React from 'react'
import g from 'glamorous'
import Link from 'gatsby-link'

import { rhythm } from '../utils/typography'

export default ({ data }) => {
  return (
    <div>
      <g.H1 display={'inline-block'} borderBottom={'1px solid'}>
        {data.site.siteMetadata.title} is writing...
      </g.H1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={node.fields.slug}
            css={{ textDecoration: `none`, color: `inherit` }}
          >
            <g.H3 marginBottom={rhythm(1 / 4)}>
              {node.frontmatter.title}{' '}
              <g.Span color="#BBB">— {node.frontmatter.date}</g.Span>
            </g.H3>
            <p>{node.excerpt}</p>
          </Link>
          <p>
            tags: {node.frontmatter.tags.map((tag, i) =>{
              return <span key={tag}><Link to={`tags/${tag}`}>{(i ? ', ': '') + tag}</Link></span>
            })}
          </p>
          <hr
            style={{
              borderStyle: 'groove',
            }}
          />
        </div>
      ))}
    </div>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
