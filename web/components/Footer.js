import React from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Icon from './elements/Icon'
import useSanity from './hooks/useSanity'
import Container from '@heydays/Container'
import Grid, { GridItem } from '@heydays/Grid'
import Spacer from '@heydays/Spacer'
import Editor from './editor'
import { P } from '@heydays/Typography'
import Stack from '@heydays/Stack'
import AspectContainer from '@heydays/AspectContainer'
import Center from '@heydays/Center'

const Footer = ({ className }) => {
  const sanity = useSanity()
  return (
    <div className={className}>
      <Container>
        <Grid gap>
          <GridItem span={{ xs: 12, md: 5 }}>
            {sanity?.companyInfo?.email && (
              <p>Email: {sanity.companyInfo.email}</p>
            )}
            {sanity?.companyInfo?.phone && (
              <p>Tlf: {sanity.companyInfo.phone}</p>
            )}
            <Spacer size="md" />
            {sanity?.companyInfo?.address && (
              <>
                {sanity?.companyInfo?.address?.streetAddress && (
                  <p>{sanity.companyInfo.address.streetAddress}</p>
                )}
                <p>
                  {sanity?.companyInfo?.address?.postCode && (
                    <span>{sanity.companyInfo.address.postCode}</span>
                  )}
                  &nbsp;
                  {sanity?.companyInfo?.address?.city && (
                    <span>{sanity.companyInfo.address.city}</span>
                  )}
                </p>
              </>
            )}
          </GridItem>
          <GridItem span={{ xs: 12, md: 7 }}>
            {sanity?.companyInfo?.openingHours && (
              <Editor blocks={sanity.companyInfo.openingHours} />
            )}
          </GridItem>
        </Grid>
        <Spacer size="lg" />
        <Grid gap align="baseline">
          <GridItem span={{ xs: 12, md: 5 }}>
            <P modifiers="small">
              © {new Date().getFullYear()} Copyright all rights reserved.
            </P>
          </GridItem>
          <GridItem span={{ xs: 12, md: 7 }}>
            {sanity?.companyInfo?.social && (
              <Stack direction="row">
                {Object.keys(sanity.companyInfo.social)
                  .filter(key => key !== '_type')
                  .map(key => (
                    <Link
                      key={`social-link-${key}`}
                      href={sanity.companyInfo.social[key]}
                    >
                      <a
                        className="social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AspectContainer aspect="square">
                          <Center>
                            <Icon name={key} modifiers="small" />
                          </Center>
                        </AspectContainer>
                      </a>
                    </Link>
                  ))}
              </Stack>
            )}
          </GridItem>
        </Grid>
      </Container>
    </div>
  )
}

export default styled(Footer)(
  ({ theme: t }) => css`
    ${t.spacing.section(['mt', 'py'])};
    background-color: ${t.colors.text};
    color: ${t.colors.background};

    .social {
      display: flex;
      align-items: center;
    }

    .social-link {
      display: inline-block;
      color: ${t.colors.background};
      transition: opacity ${t.trans.fast};
      width: 45px;

      &:hover {
        opacity: 0.5;
      }
    }
  `
)
