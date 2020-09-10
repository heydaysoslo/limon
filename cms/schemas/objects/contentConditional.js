import Content from '../../custom/components/Content'

export default {
  name: 'contentConditional',
  title: 'Content Conditional',
  type: 'object',
  inputComponent: Content,
  fields: [
    {
      name: 'image',
      type: 'mainImage'
    },
    {
      name: 'text',
      type: 'editor'
    },
    {
      name: 'oembed',
      type: 'oembed'
    }
  ]
}
