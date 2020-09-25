import FaList from 'react-icons/lib/fa/list-ul'
import d from '../defaults'

export default {
  name: 'menu',
  title: 'Navigation',
  type: 'document',
  icon: FaList,
  fields: [
    {
      title: 'Title',
      type: 'string',
      name: 'title'
    },
    {
      name: 'item',
      title: 'Items',
      type: 'array',
      of: [
        { type: 'link' },
        { type: 'internalLink' },
        {
          name: 'scrollLink',
          title: 'scrollLink',
          type: 'object',
          fields: [
            d.title,
            {
              name: 'id',
              title: 'ID',
              type: 'string'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      items: 'item'
    },
    prepare({ title }) {
      return {
        title: title || 'Menu'
      }
    }
  }
}
