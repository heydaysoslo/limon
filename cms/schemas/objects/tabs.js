import MdControlPoint from 'react-icons/lib/md/control-point'
export default {
  name: 'tabs',
  title: 'Tabs',
  type: 'object',
  icon: MdControlPoint,
  fields: [
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'tabsItem'
        }
      ]
    }
  ],
  preview: {
    select: {
      items: 'items'
    },
    prepare({ items }) {
      const title =
        items.map(item => item.title && item.title).join(', ') || 'Tab'
      return {
        title,
        media: MdControlPoint
      }
    }
  }
}
