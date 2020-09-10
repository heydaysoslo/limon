// import External from 'react-icons/lib/fa/external-link'
// Follow sanity recommendations for internal/external links
// https://www.sanity.io/guides/portable-text-internal-and-external-links
import { defaultLinkFields } from '../defaults/linkDefaults'
import ExternalLinkRenderer from '../../custom/components/ExternalLinkRenderer'
import ExternalLinkIcon from 'react-icons/lib/md/open-in-new'

export default {
  name: 'link',
  type: 'object',
  title: 'External link',
  blockEditor: {
    icon: ExternalLinkIcon,
    render: ExternalLinkRenderer
  },
  fields: [
    {
      name: 'href',
      type: 'url',
      title: 'URL',
      description: 'Valid url example: https://whereby.com',
      validation: Rule =>
        Rule.uri({
          allowRelative: false,
          scheme: ['https', 'http', 'mailto', 'tel']
        })
    },
    {
      title: 'Open in new tab',
      name: 'blank',
      type: 'boolean'
    },
    ...defaultLinkFields
  ],
  preview: {
    select: {
      title: 'title',
      href: 'href',
      linkText: 'linkText'
    },
    prepare({ linkText, href }) {
      return {
        title: linkText || href
        // media: External
      }
    }
  }
}
