import React from "react"
import { graphql, Link } from "gatsby"
import rehypeReact from "rehype-react"
import AppLayout from "../components/AppLayout"
import Divider from "@material-ui/core/Divider"
import { makeStyles } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Typography from "@material-ui/core/Typography"
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles(theme => ({
  title: {
    color: "#444444",
    fontWeight: theme.typography.fontWeightMedium,
  },
  subTitle: {
    color: "#5e5e5e",
    fontWeight: theme.typography.fontWeightBold,
  },
  right: {
    float:'right',
    marginLeft:'auto',
    marginRight:'0px',
    marginTop: 20,
    flexWrap: 'nowrap',
    flexDirection: 'row',
},
left: {
  float:'left',
  marginRight:'auto',
  marginLeft:'0px',
  marginTop: 20,
  flexWrap: 'nowrap',
  flexDirection: 'row',
}
}))

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {},
}).Compiler

export default function DocPage({ data, location, pageContext }) {
  const classes = useStyles()
  const post = data.markdownRemark
  const { next, prev } = pageContext

  return (
    <AppLayout
      title={post.frontmatter.title + " | " + data.site.siteMetadata.title}
      location={location}
    >
      <Typography variant="h4" className={classes.title} gutterBottom>
        {post.frontmatter.title}
      </Typography>
      <Typography
        variant="overline"
        display="block"
        className={classes.subTitle}
        gutterBottom
      >
        {post.frontmatter.sub_title}
      </Typography>
      <Divider />
      <Typography variant="body1" gutterBottom>
        {renderAst(post.htmlAst)}
      </Typography>

      <Divider style={{marginTop: 50}} />
      <Divider />
        {prev.fields && (
          <Button className={classes.left} color="primary" startIcon={<NavigateBeforeIcon />} href={prev.fields.slug} >
            {prev.frontmatter.title}
          </Button>
        )}

        {next.fields && (
          <Button className={classes.right} color="primary" endIcon={<NavigateNextIcon />} href={next.fields.slug}>
            {next.frontmatter.title}
          </Button>
        )}
    </AppLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
        sub_title
        keywords
      }
    }
  }
`
