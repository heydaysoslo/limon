import React from 'react'
import d from '../defaults'
import { getCloudinaryImageSource } from 'part:sanity-plugin-asset-source-cloudinary/helpers'

export default {
  name: 'textImageSplit',
  title: 'Text Image Split',
  type: 'object',
  fieldsets: [
    { name: 'image', title: 'Image' },
    { name: 'content', title: 'Content' }
  ],
  fields: [
    {
      name: 'textOnTheRight',
      title: 'Text On The Right',
      type: 'boolean'
    },
    {
      ...d.title,
      fieldset: 'content'
    },
    {
      ...d.editorMinimal,
      fieldset: 'content'
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'mainImage',
      fieldset: 'image'
    },
    {
      name: 'aspect',
      title: 'Aspect Ratio',
      type: 'aspect',
      fieldset: 'image'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    },
    prepare({ media, title }) {
      const newMedia = getCloudinaryImageSource(media?.cldImage, { width: 50 })
      return {
        title,
        media: newMedia ? <img src={newMedia} alt="" /> : null,
        subtitle: 'Text Image Split'
      }
    }
  }
}

// export default {
//   name: 'textImageSplit',
//   title: 'Text Image Split',
//   type: 'object',
//   fieldsets: [{ name: 'image', title: 'Image' }],
//   fields: [
//     // {
//     //   name: 'textOnTheRight',
//     //   title: 'Text On The Right',
//     //   type: 'boolean'
//     // },
//     {
//       name: 'title',
//       title: 'title',
//       type: 'string'
//     }
//     // {
//     //   name: 'text',
//     //   title: 'Text',
//     //   type: 'editorMinimal'
//     // },
//     // {
//     //   name: 'image',
//     //   title: 'Image',
//     //   type: 'mainImage',
//     //   fieldset: 'image'
//     // },
//     // {
//     //   name: 'aspect',
//     //   title: 'Aspect Ratio',
//     //   type: 'aspect',
//     //   fieldset: 'image'
//     // }
//   ],
//   preview: {
//     select: {
//       title: 'title',
//       media: 'image'
//     },
//     prepare({ media, title }) {
//       return {
//         title,
//         media: media || '',
//         subtitle: 'Text Image Split'
//       }
//     }
//   }
// }
