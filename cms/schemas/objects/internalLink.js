// import Link from 'react-icons/lib/io/link'
// Follow sanity recommendations for internal/external links
// https://www.sanity.io/guides/portable-text-internal-and-external-links
import InternalLinkIcon from 'react-icons/lib/md/link'
// import InternalLinkRenderer from '../../custom/components/InternalLinkRenderer'
import { defaultLinkFields } from '../defaults/linkDefaults'

// export default {
//   name: 'internalLink',
//   type: 'object',
//   title: 'Internal Link',
//   fields: [
//     {
//       name: 'reference',
//       type: 'reference',
//       title: 'Reference',
//       to: [
//         { type: 'article' },
//         { type: 'page' },
//         { type: 'illustrator' },
//         { type: 'frontpage' }
//       ]
//     },
//     {
//       name: 'title',
//       title: 'Title',
//       description: 'Override the original title for referenced document',
//       type: 'string'
//     }
//   ],
//   preview: {
//     select: {
//       title: 'title',
//       linkTitle: 'reference.title'
//     },
//     prepare({ title, linkTitle }) {
//       return {
//         title: title || linkTitle || 'No link title'
//         // media: Link
//       }
//     }
//   }
// }

export default {
  name: 'internalLink',
  type: 'object',
  title: 'Internal link',
  blockEditor: {
    // render: InternalLinkRenderer, // this is occasionaly crashing for some weird reason
    icon: InternalLinkIcon
  },
  fields: [
    {
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      to: [{ type: 'article' }, { type: 'page' }, { type: 'frontpage' }]
    },
    ...defaultLinkFields
  ],
  preview: {
    select: {
      title: 'reference.title',
      linkText: 'linkText'
    },
    prepare({ title, linkText }) {
      return {
        title: linkText || title || 'No link title'
        // media: Link
      }
    }
  }
}
