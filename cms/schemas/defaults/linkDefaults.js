export const linkText = {
  name: 'linkText',
  type: 'string',
  title: 'Link text'
}

export const linkStyle = {
  name: 'linkStyle',
  title: 'Link style',
  type: 'string',
  options: {
    list: [
      { value: 'default', title: 'Link' },
      { value: 'button', title: 'Button' }
    ]
  }
}

export const linkTitle = {
  name: 'title',
  title: 'Title attribute',
  type: 'string'
}

export const defaultLinkFields = [linkText, linkTitle, linkStyle] //
