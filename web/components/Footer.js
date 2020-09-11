import React from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Icon from './elements/Icon'
import useSanity from './hooks/useSanity'
import { spacing } from '../styles/utilities/Spacing'
import Container from '@heydays/Container'

const Footer = ({ className }) => {
  const sanity = useSanity()
  return (
    <div className={className}>
      <Container>
        {sanity?.companyInfo?.phone && <p>Tlf: {sanity.companyInfo.phone}</p>}
        {sanity?.companyInfo?.email && <p>Email: {sanity.companyInfo.email}</p>}
        {sanity?.companyInfo?.social &&
          Object.keys(sanity.companyInfo.social)
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
                  <Icon name={key} />
                </a>
              </Link>
            ))}
      </Container>
    </div>
  )
}

export default styled(Footer)(
  ({ theme }) => css`
    ${spacing.section('mt,py')};
    background-color: ${theme.colors.text};
    color: ${theme.colors.background};

    .social-link {
      display: inline-block;
      color: ${theme.colors.background};
      width: 100px;
      transition: ${theme.trans.fast};

      &:hover {
        opacity: 0.5;
      }

      svg {
        width: 100%;
        height: 100px;
      }
    }
  `
)
