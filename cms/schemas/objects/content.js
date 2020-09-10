export default {
  name: 'content',
  title: 'Content',
  type: 'object',
  fields: [
    {
      name: 'component',
      title: 'Component',
      type: 'string',
      myId: 'helloImID',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Text', value: 'text' },
          { title: 'Embed Video', value: 'videoEmbed' }
        ]
      }
    },
    {
      name: 'conditional',
      title: 'Conditional',
      type: 'contentConditional'
    }
  ]
}
