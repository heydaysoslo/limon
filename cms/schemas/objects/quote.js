import MdFormatQuote from 'react-icons/lib/md/format-quote'

export default {
  name: 'quote',
  title: 'Quote',
  type: 'object',
  icon: MdFormatQuote,
  fields: [
    {
      name: 'content',
      description: 'The quote itself',
      title: 'Content',
      type: 'editorMinimal'
    },
    {
      name: 'source',
      description: 'The source of the quote. ',
      title: 'Source',
      type: 'editorMinimal'
    }
  ],
  preview: {
    select: {
      content: 'content',
      source: 'source'
    },
    prepare({ content, source }) {
      let title = 'No content'
      let subtitle = 'No content'
      if (content) {
        title = `${content[0].children[0].text}`
      }
      if (source) {
        subtitle = `${source[0].children[0].text}`
      }
      return {
        title,
        subtitle
      }
    }
  }
}
