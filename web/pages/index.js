import { getFrontpage, getFoodMenu } from '../lib/sanity'
import TemplateResolver from '../components/resolvers/TemplateResolver'

// export const getStaticProps = async () => {
//   const data = await getFrontpage()
//   const foodMenu = await getFoodMenu()
//   return {
//     props: { frontpage: data[0].frontpage, foodMenu }
//   }
// }

const Home = ({ frontpage, foodMenu }) => {
  return <TemplateResolver page={{ ...frontpage, foodMenu }} />
}

Home.getInitialProps = async () => {
  const data = await getFrontpage()
  const foodMenu = await getFoodMenu()
  return { frontpage: data[0].frontpage, foodMenu }
}

export default Home
