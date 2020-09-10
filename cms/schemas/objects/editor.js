import React from 'react'

const strongRenderer = props => (
  <span style={{ fontWeight: 'bold' }}>{props.children}</span>
)

const LeadTextRenderer = props => (
  <span style={{ fontSize: '2em', lineHeight: 1.1 }}>{props.children}</span>
)

const SmallTextRenderer = props => (
  <span style={{ fontSize: '.85em', lineHeight: 1.1 }}>{props.children}</span>
)

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'editor'
 *  }
 */
const editor = {
  title: 'Editor',
  name: 'editor',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        {
          title: 'Lead text',
          value: 'lead',
          blockEditor: {
            render: LeadTextRenderer
          }
        },
        {
          title: 'Small text',
          value: 'small',
          blockEditor: {
            render: SmallTextRenderer
          }
        }
        // { title: 'Quote', value: 'blockquote' }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          {
            title: 'Strong',
            value: 'strong',
            blockEditor: { render: strongRenderer }
          }
          // { title: 'Emphasis', value: 'em' }
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'link' // Find render comps in link.js
          },
          {
            name: 'internalLink',
            type: 'internalLink',
            title: 'Internal Link' // Find render comps in internalLink.js
          }
        ]
      }
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'oembed'
    },
    {
      type: 'figure'
    },
    {
      type: 'button'
    },
    {
      type: 'quote'
    },
    {
      type: 'accordion'
    }
  ]
}

export const editorMinimal = {
  title: 'Editor',
  name: 'editorMinimal',
  type: 'array',
  of: [
    {
      ...editor.of[0],
      lists: [],
      styles: [
        ...editor.of[0].styles.filter(
          style =>
            style.value === 'normal' ||
            style.value === 'lead' ||
            style.value === 'small'
        )
      ]
    }
  ]
}

export default editor
