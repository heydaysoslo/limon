import { getPage, getPages, getFoodMenu, getSettings } from '../lib/sanity'
import TemplateResolver from '../components/resolvers/TemplateResolver'

export const getStaticProps = async ({ params }) => {
  const page = await getPage(params.slug)
  const siteSettings = await getSettings()
  const foodMenu = await getFoodMenu()
  return {
    props: { page, foodMenu, siteSettings }
  }
}

export const getStaticPaths = async () => {
  const pages = await getPages()
  return {
    paths: pages.map(page => ({ params: { slug: page.slug.current } })),
    fallback: true
  }
}

const Home = ({ page, foodMenu, siteSettings }) => {
  return (
    <TemplateResolver
      page={{ ...page, foodMenu }}
      siteSettings={siteSettings}
    />
  )
}

export default Home
