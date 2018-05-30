import React from "react";

export default ({data}) => (
  <div>
    <h1>About {data.site.siteMetadata.title}</h1>
    <p>
      This blog is my adventure toward my interest in tech
    </p>
  </div>
);

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
  `