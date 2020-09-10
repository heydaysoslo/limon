import Sort from 'react-icons/lib/fa/sort-amount-asc'

export default {
  name: 'articleOrder',
  title: 'Article Order',
  type: 'document',
  icon: Sort,
  fields: [
    {
      name: 'articles',
      title: 'Article order',
      type: 'array',
      of: [
        {
          name: 'article',
          title: 'Article',
          type: 'reference',
          to: [{ type: 'article' }]
        }
      ]
    }
  ]
}
