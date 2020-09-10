import MdPerson from 'react-icons/lib/md/person'
export default {
  name: 'personReference',
  title: 'Person Reference',
  type: 'object',
  icon: MdPerson,
  fields: [
    {
      name: 'person',
      title: 'Person',
      type: 'reference',
      to: [{ type: 'person' }]
    }
  ],
  preview: {
    select: {
      title: 'person.name',
      media: 'person.image'
    },
    prepare({ title = 'No title', media = mdPerson }) {
      return {
        title,
        media
      }
    }
  }
}
