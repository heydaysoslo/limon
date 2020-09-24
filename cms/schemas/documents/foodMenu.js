import Menu from '../../custom/components/icons/Menu'
import d from '../defaults'

export default {
  name: 'foodMenu',
  title: 'Food Menu',
  type: 'document',
  icon: Menu,
  fields: [
    d.title,
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          name: 'category',
          title: 'Category',
          type: 'object',
          fields: [
            d.title,
            d.media,
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                {
                  name: 'item',
                  title: 'Item',
                  type: 'object',
                  fields: [
                    d.title,
                    d.description,
                    {
                      name: 'price',
                      title: 'Price',
                      type: 'number'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      ...d.editorMinimal,
      name: 'allergens',
      title: 'Allergens'
    }
  ],
  preview: {
    select: {
      date: '_createdAt'
    },
    prepare({ date }) {
      return {
        title: 'Menu',
        subtitle: new Date(date).toDateString()
      }
    }
  }
}
