import FaFileO from 'react-icons/lib/fa/file-text-o'
// import PageIcon from '../../custom/components/icons/PageIcon'
// import Conditional from '../../custom/components/Conditional'

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: FaFileO,
  initialValue: {
    template: 'default'
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Some frontend will require a slug to be set to be able to show the post',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    // {
    //   name: 'content',
    //   title: 'Content',
    //   type: 'content'
    // },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage'
    },
    // {
    //   name: 'menuTheme',
    //   title: 'Menu Theme',
    //   type: 'menuTheme',
    //   fieldset: 'settings'
    // },
    {
      name: 'pagebuilder',
      title: 'Page builder',
      type: 'pagebuilder'
    },
    {
      name: 'template',
      title: 'Template',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Contact', value: 'contact' },
          { title: 'News', value: 'news' }
        ]
      }
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      image: 'mainImage',
      template: 'template'
    },
    prepare({ title = 'No title', image, template }) {
      return {
        title,
        media: image,
        subtitle: `Template: ${template || 'default'}`
      }
    }
  }
}
