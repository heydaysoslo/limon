import FaFileText from 'react-icons/lib/fa/file-text-o'

export default {
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  fields: [
    {
      name: 'body',
      title: 'Body',
      type: 'editor'
    }
  ],
  preview: {
    select: {
      content: 'body'
    },
    prepare({ content }) {
      const text =
        content.filter(block => block._type === 'block')[0].children[0].text ||
        'Text'
      return {
        title: text,
        subtitle: 'Text section',
        media:
          content.filter(block => block._type === 'mainImage').length > 0
            ? content.filter(block => block._type === 'mainImage')[0].asset
            : FaFileText
      }
    }
  }
}
