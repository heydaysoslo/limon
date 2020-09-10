import Sort from 'react-icons/lib/fa/sort-amount-asc'

export default {
  name: 'personOrder',
  title: 'Person Order',
  type: 'document',
  icon: Sort,
  fields: [
    {
      name: 'people',
      title: 'Person order',
      type: 'array',
      of: [
        {
          name: 'person',
          title: 'Person',
          type: 'reference',
          to: [{ type: 'person' }]
        }
      ]
    }
  ]
}
