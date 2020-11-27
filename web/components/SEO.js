import Head from 'next/head'

const SEO = ({ seo }) => {
  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="robots" content="index, follow" />
      <meta charset="UTF-8" />
      <meta name="description" content={seo?.description} />
      <meta property="og:title" content={seo?.title} />
      <meta property="og:description" content={seo?.description} />
      <meta property="og:image" content={seo?.cldImage?.url} />
    </Head>
  )
}

export default SEO
