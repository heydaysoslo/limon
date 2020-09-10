import React from 'react'
import { getCloudinaryImageSource } from 'part:sanity-plugin-asset-source-cloudinary/helpers'

export default {
  title: {
    name: 'title',
    title: 'Title',
    type: 'string'
  },
  subtitle: {
    name: 'subtitle',
    title: 'Sub Title',
    type: 'string'
  },
  image: {
    name: 'cldImage',
    title: 'Image',
    type: 'cloudinaryMedia',
    options: {
      selectionType: 'single',
      resourceType: 'image'
    }
  },
  media: {
    name: 'media',
    title: 'Media',
    type: 'cloudinaryMedia',
    options: {
      selectionType: 'single'
    }
    // preview: {
    //   select: {
    //     media: 'media'
    //   },
    //   prepare({ media }) {
    //     console.log('prepare -> media', media)
    //     return {
    //       title: media.resource_type,
    //       media: getCloudinaryImageSource(media, {
    //         width: 200,
    //         height: 200
    //       })
    //     }
    //   }
    // }
  },
  editor: {
    name: 'editor',
    title: 'Editor',
    type: 'editor'
  },
  editorMinimal: {
    name: 'editorMinimal',
    title: 'Editor Minimal',
    type: 'editorMinimal'
  },
  alt: {
    name: 'alt',
    type: 'string',
    title: 'Alternative text',
    validation: Rule =>
      Rule.error('You have to fill out the alternative text.').required(),
    description: `Describe what's in the image. Important for accesibility and SEO. Read more here https://blog.hubspot.com/marketing/image-alt-text`,
    options: {
      isHighlighted: true
    }
  },
  caption: {
    title: 'Caption',
    name: 'caption',
    type: 'string',
    options: {
      isHighlighted: true
    }
  },
  imagePreview: {
    preview: {
      select: {
        media: 'cldImage'
      },
      prepare({ media }) {
        const newMedia = getCloudinaryImageSource(media, {
          width: 50
        })
        return {
          title: media.title,
          media: newMedia ? <img src={newMedia} alt="" /> : null,
          subtitle: 'Image'
        }
      }
    }
  },
  mainImagePreview: (select, width) => ({
    preview: {
      select
    },
    prepare(select) {
      const newMedia = getCloudinaryImageSource(media, { width })
      return {
        title,
        media: newMedia ? <img src={newMedia} alt="" /> : null,
        subtitle
      }
    }
  })
}
