import d from '../defaults'

export default {
  name: 'mainImage',
  title: 'Main image',
  type: 'object',
  fields: [
    d.image,
    {
      name: 'alt',
      title: `Alternative text`,
      description: `Describe what's in the image. Important for accesibility and SEO. Read more here https://blog.hubspot.com/marketing/image-alt-text`,
      type: 'string'
    }
  ]
}
