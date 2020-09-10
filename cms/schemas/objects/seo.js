import d from '../defaults'

export default {
  name: 'seo',
  title: 'Seo',
  type: 'object',
  description:
    'This is to override only. If you want the title and the main image to display you can leave this alone.',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string'
    },
    {
      ...d.image,
      description:
        'The images that appears in search results and social media sharing'
    }
  ]
}
