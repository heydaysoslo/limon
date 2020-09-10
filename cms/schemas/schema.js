// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import companyInfo from './documents/companyInfo'
import menu from './documents/menu'
import page from './documents/page'
import person from './documents/person'
import personOrder from './documents/personOrder'
import article from './documents/article'
// import articleOrder from './documents/articleOrder'
import siteSettings from './documents/siteSettings'
import frontpage from './documents/frontpage'

// Object types
import link from './objects/link'
import internalLink from './objects/internalLink'
import seo from './objects/seo'
import mainImage from './objects/mainImage'
import editor, { editorMinimal } from './objects/editor'
import social from './objects/social'
import office from './objects/office'
import content from './objects/content'
import contentConditional from './objects/contentConditional'
import pagebuilder from './objects/pagebuilder'
import card from './objects/card'
import cardOverride from './objects/cardOverride'
import cardSection from './objects/cardSection'
import textSection from './objects/textSection'
import figure from './objects/figure'
import button from './objects/button'
import quote from './objects/quote'
import imageSection from './objects/imageSection'
import aspect from './objects/aspect'
import section from './objects/section'
import textImageSplit from './objects/textImageSplit'
import personReference from './objects/personReference'
import carousel from './objects/carousel'
import oembed from './objects/oembed'
import accordion from './objects/accordion'
import accordionItem from './objects/accordionItem'
import address from './objects/address'
import tabs from './objects/tabs'
import tabsItem from './objects/tabsItem'
import videoSection from './objects/videoSection'

// const personOrder = createOrderDoc('person')
// const articleOrder = createOrderDoc('article')

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'schema',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    link,
    internalLink,
    seo,
    mainImage,
    editor,
    editorMinimal,
    social,
    office,
    content,
    contentConditional,
    pagebuilder,
    card,
    cardOverride,
    cardSection,
    textSection,
    figure,
    button,
    quote,
    imageSection,
    aspect,
    section,
    textImageSplit,
    personReference,
    carousel,
    oembed,
    accordion,
    accordionItem,
    address,
    tabs,
    tabsItem,
    videoSection,

    // The following are document types which will appear
    // in the studio.
    companyInfo,
    menu,
    siteSettings,
    page,
    person,
    personOrder,
    article,
    // articleOrder,
    frontpage
  ])
})
