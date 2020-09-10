/**
 *
 * Boilerplate to run mutations on Sanity datasets
 * Run mutations with 'sanity exec' to access Sanity features
 * Gotcha: Remember to set the correct permissions (read+write) for SANITY_TOKEN for your mutations
 *
 */

require('dotenv').config()
const fetch = require('node-fetch')

// Define your mutations here
// Docs: https://www.sanity.io/docs/http-mutations
const mutations = [
  {
    delete: {
      query: "*[_type == 'screening']"
    }
  }
]

// Send mutations request
const sendToSanity = mutations => {
  fetch(
    `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${process.env.SANITY_DATASET}`,
    {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_TOKEN}`
      },
      body: JSON.stringify({ mutations })
    }
  )
    .then(response => response.json())
    .then(result => console.log('Mutation SUCCESS', result))
    .catch(error => console.error('Mutation ERROR', error))
}

sendToSanity(mutations)
