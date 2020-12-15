console.log({
  options: {
    deployLimit: 10,
    deployHook: process.env.SANITY_STUDIO_VERCEL_DEPLOY_HOOK,
    forceSmallLayout: false,
    projectId: process.env.SANITY_STUDIO_VERCEL_PROJECT_ID,
    teamId: process.env.SANITY_STUDIO_VERCEL_TEAM,
    token: process.env.SANITY_STUDIO_VERCEL_TOKEN,
  },
})

export default {
  widgets: [
    {
      name: 'vercel',
      options: {
        deployLimit: 10,
        deployHook: process.env.SANITY_STUDIO_VERCEL_DEPLOY_HOOK,
        forceSmallLayout: false,
        projectId: process.env.SANITY_STUDIO_VERCEL_PROJECT_ID,
        teamId: process.env.SANITY_STUDIO_VERCEL_TEAM,
        token: process.env.SANITY_STUDIO_VERCEL_TOKEN,
      },
      layout: {
        width: 'large',
      },
    },
  ],
}
