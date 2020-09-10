import MdSettings from 'react-icons/lib/md/settings'

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // liveEdit: false,
  __experimental_actions: ['update', 'publish' /*'create', 'delete'*/],
  icon: MdSettings,
  fieldsets: [
    { name: 'important', title: 'Important pages' },
    { name: 'seo', title: 'SEO' },
    { name: 'menus', title: 'Menus' }
  ],
  initialValue: {
    siteUrl: 'https://homepage.com',
    siteName: 'Client name'
  },
  fields: [
    {
      name: 'siteUrl',
      title: 'Site url',
      type: 'url',
      validation: Rule => Rule.required(),
      fieldset: 'seo'
    },
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: Rule => Rule.required(),
      fieldset: 'seo'
    },
    {
      name: 'locale',
      title: 'Locale for site',
      type: 'string',
      options: {
        // List of locales: https://lh.2xlibre.net/locales/
        list: [
          { title: 'Bokmål', value: 'nb_NO' },
          { title: 'Nynorsk', value: 'nn_NO' },
          { title: 'English (GB)', value: 'en_GB' },
          { title: 'English (US)', value: 'en_US' }
        ]
      },
      fieldset: 'seo'
    },
    {
      name: 'seo',
      title: 'Default SEO',
      type: 'seo',
      fieldset: 'seo'
    },
    {
      title: 'Facebook App ID',
      name: 'facebookAppId',
      type: 'string',
      fieldset: 'seo'
    },
    {
      name: 'frontpage',
      title: 'Front page',
      type: 'reference',
      to: [{ type: 'frontpage' }],
      validation: Rule => Rule.required(),
      fieldset: 'important'
    },
    {
      name: 'privacypage',
      title: 'Privacy page',
      type: 'reference',
      to: [{ type: 'page' }],
      validation: Rule => Rule.required(),
      fieldset: 'important'
    },
    {
      name: 'staticPages',
      description:
        "Pages added to this array can't be deleted. Ex: About or Contact page",
      title: 'Static pages',
      type: 'array',
      of: [
        {
          name: 'page',
          title: 'Page',
          type: 'reference',
          to: [{ type: 'page' }, { type: 'menu' }, { type: 'person' }]
        }
      ],
      fieldset: 'important'
    },
    {
      name: 'primaryMenu',
      title: 'Main menu',
      type: 'reference',
      to: [{ type: 'menu' }],
      description: 'The menu that should appear in the footer',
      fieldset: 'menus'
    },
    {
      name: 'footerMenu',
      title: 'Footer menu',
      type: 'reference',
      to: [{ type: 'menu' }],
      description: 'The menu that should appear in the footer',
      fieldset: 'menus'
    }
  ]
}
