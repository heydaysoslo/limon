import Menu from '../../custom/components/icons/Menu'
export default {
  name: 'pagebuilder',
  title: 'pagebuilder',
  type: 'object',
  fields: [
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        // Menu
        {
          name: 'menu',
          title: 'menu',
          type: 'object',
          fields: [
            {
              name: 'foodMenu',
              title: 'Food Menu',
              type: 'reference',
              to: [{ type: 'foodMenu' }]
            }
          ],
          preview: {
            select: {
              title: 'foodMenu.title'
            },
            prepare({ title }) {
              return {
                title,
                media: Menu
              }
            }
          }
        },
        {
          name: 'scrollAnchor',
          title: 'scrollAnchor',
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'ID',
              type: 'string'
            }
          ]
        },
        // Section
        // {
        //   name: 'section',
        //   title: 'Section',
        //   type: 'section'
        // },
        // Cards
        // {
        //   name: 'cardSection',
        //   title: 'Card Section',
        //   type: 'cardSection'
        // },
        // Text section
        {
          name: 'textSection',
          title: 'Text Section',
          type: 'textSection'
        },
        // Full Image
        {
          name: 'imageSection',
          title: 'Full Image Section',
          type: 'imageSection'
        },
        // // Text Image Split
        // {
        //   name: 'textImageSplit',
        //   title: 'Text Image Split',
        //   type: 'textImageSplit'
        // },
        // // Carousel
        // {
        //   name: 'carousel',
        //   title: 'Carousel',
        //   type: 'carousel'
        // },
        // // Tabs
        // {
        //   name: 'tabs',
        //   title: 'Tabs',
        //   type: 'tabs'
        // },
        // // Video Section
        // {
        //   name: 'videoSection',
        //   title: 'Video Section',
        //   type: 'videoSection'
        // },
        // Scroll Anchor
        {
          name: 'videoSection',
          title: 'Video Section',
          type: 'videoSection'
        }
      ]
    }
  ]
}
