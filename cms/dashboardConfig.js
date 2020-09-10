/**
 * https://www.sanity.io/docs/content-studio/dashboard
 * Insta
 * https://www.sanity.io/docs/dashboard/installing-and-configuring-widgets
 */
export default {
  widgets: [
    { name: 'structure-menu' },

    {
      name: 'netlify',
      options: {
        sites: [
          {
            buildHookId: '5d55445bc3cf83a1559a0a02', // Create this under Build & deploy look for Build hooks
            title: 'Website', // Title that appears in the dashboard
            name: 'heydays-starter', // Find on netlify under General>Site details look for Site name
            apiId: '2beb0e18-90df-4575-b7af-b8b6a74d8ab5' // Find on netlify under General>Site details look for APP ID
          }
        ]
      }
    },
    {
      name: 'document-list',
      options: {
        title: 'Recent articles',
        order: '_createdAt desc',
        types: ['article']
      },
      layout: { width: 'medium' }
    },
    { name: 'project-users', layout: { height: 'auto', width: 'auto' } },
    {
      name: 'project-info',
      layout: {
        width: 'auto',
        height: 'auto'
      }
    }
  ]
}
