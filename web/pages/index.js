import { getFrontpage, getFoodMenu, getSettings } from '../lib/sanity'
import TemplateResolver from '../components/resolvers/TemplateResolver'

// export const getStaticProps = async () => {
//   const data = await getFrontpage()
//   const siteSettings = await getSettings()
//   const foodMenu = await getFoodMenu()
//   return {
//     props: { frontpage, foodMenu, siteSettings }
//   }
// }

const Home = ({ frontpage, foodMenu, siteSettings }) => {
  return (
    <TemplateResolver
      page={{ ...frontpage, foodMenu }}
      siteSettings={siteSettings}
    />
  )
}

Home.getInitialProps = async () => {
  const frontpage = await getFrontpage()
  const siteSettings = await getSettings()
  const foodMenu = await getFoodMenu()
  return { frontpage, foodMenu, siteSettings }
}

export default Home
