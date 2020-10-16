import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
import sanityClient from '@sanity/client'

import { getPreview, PAGEBUILDER } from 'lib/sanity'

import TemplateResolver from '@heydays/TemplateResolver'
import Head from 'next/head'

const PREVIEWABLE_TYPES = ['page', 'frontpage', 'article']

const Preview = ({ className }) => {
  const [page, setPage] = useState(null)
  const router = useRouter()
  const fetchTimer = useRef(null)

  useEffect(() => {
    const previewClient = sanityClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      useCdn: false,
      token: router?.query?.access_token
    })
    const query = `
    {
      "siteSettings": *[_type == "siteSettings"] {
        primaryMenu->,
        secondaryMenu->,
        frontpage->{
          ...,
          ${PAGEBUILDER}
        },
        privacypage->,
        "designTokens": *[_id in ["drafts.2aa46f20-4574-4fc5-90e8-4ad01944cbb9"]]{
          ...
        } | order(_updatedAt desc)
      } | order(_updatedAt desc),
      "data": *[_id in [$draftId, $id]]{
        authors[]{
          person->,
        },
        ${PAGEBUILDER},
        ...
      } | order(_updatedAt desc),
    }
    `

    // declare sub variable to be able to unsub
    let sub

    // Need id for query
    if (router?.query?.id) {
      const { id } = router.query
      const pageId = id ? id.replace('drafts.', '') : null
      const params = { draftId: `drafts.${pageId}`, id: pageId }

      const fetchPreview = async () => {
        console.log('FETCHING PREVIEW')
        const { data, siteSettings } = await getPreview(
          previewClient,
          query,
          params
        )
        const isPreviewable = PREVIEWABLE_TYPES.includes(data[0]._type)
        let page = data[0]

        // Serve frontpage if not previewable
        if (!isPreviewable) {
          console.warn('This page is not previewable. Serving frontpage')
          page = siteSettings[0].frontpage
        }

        // Make page structure
        const newData = {
          ...page,
          siteSettings: {
            ...siteSettings[0],
            designTokens: siteSettings[0]?.designTokens?.[0]
          }
        }
        console.log(
          'fetchPreview -> siteSettings[0]',
          siteSettings[0]?.designTokens?.[0]?.theme?.responsiveSpacing?.lg
        )

        setPage(newData)
      }

      // Fetch first preview
      fetchPreview()

      // Start listening
      sub = previewClient
        .listen(query, params, { includeResult: false })
        .subscribe(update => {
          console.log('UPDATING…')
          if (fetchTimer.current) {
            clearTimeout(fetchTimer.current)
          }
          fetchTimer.current = setTimeout(fetchPreview, 2000)
        })
    }
    return () => {
      if (sub) {
        sub.unsubscribe()
      }
    }
  }, [router])

  return (
    <div className={className}>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="Preview">
        <div className="Preview__content">
          {page && (
            <TemplateResolver page={page} siteSettings={page.siteSettings} />
          )}
        </div>
      </div>
    </div>
  )
}

export default styled(Preview)(({ theme }) => css``)
