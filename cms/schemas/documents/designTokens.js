import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'
import d from '../defaults'
import {
  responsiveSpacing,
  responsiveFonts
} from '../../../web/styles/themes/defaultTheme'
const responsiveUnits = ['xs', 'sm', 'md', 'lg', 'xl']

export default {
  name: 'designTokens',
  title: 'Design Tokens',
  type: 'document',
  icon: () => <EmojiIcon>💅</EmojiIcon>,
  fields: [
    d.title,
    {
      name: 'theme',
      title: 'theme',
      type: 'object',
      fields: [
        {
          name: 'responsiveFonts',
          title: 'Fonts',
          type: 'object',
          fields: [
            ...Object.keys(responsiveFonts).map(fontKey => ({
              name: fontKey,
              title: fontKey,
              type: 'object',
              options: {
                collapsible: true
              },
              fields: [
                ...responsiveUnits.map(unit => ({
                  name: unit,
                  title: unit,
                  description: 'Pixel value',
                  type: 'string'
                }))
              ]
            }))
          ]
        },
        {
          name: 'responsiveSpacing',
          title: 'Spacing',
          type: 'object',
          fields: [
            ...Object.keys(responsiveSpacing).map(spacingKey => ({
              name: spacingKey,
              title: spacingKey,
              type: 'object',
              options: {
                collapsible: true
              },
              fields: [
                ...responsiveUnits.map(unit => ({
                  name: unit,
                  title: unit,
                  description: 'Pixel value',
                  type: 'string'
                }))
              ]
            }))
          ]
        }
      ]
    }
  ]
}
