import Loader from '@heydays/Loader'
import { H2 } from '@heydays/Typography'
import useFetch from '@heydays/useFetch'
import VisuallyHidden from '@heydays/VisuallyHidden'
import React from 'react'
import styled, { css, useTheme } from 'styled-components'
import { spacing, fonts } from 'styles/utilities'
import { bp } from '../styles/utilities'
import FloatingWord from './FloatingWord'
import Button from '@heydays/button'

const Menu = ({ className }) => {
  const { response, isLoading, error } = useFetch(
    'https://snappo.com/api/restaurant/21908/webshop_menu_8/en/22009.37/0'
  )
  const theme = useTheme()
  if (isLoading) return <Loader />
  return (
    <div className={className} id="menuAnchor">
      {response?.data?.menu[0]?.categories?.map(category => (
        <div className="category" key={category.id}>
          <header className="category__header">
            <h2 className="category__title">
              <VisuallyHidden>{category.name}</VisuallyHidden>
              <FloatingWord word={category.name} />
            </h2>
          </header>
          <ul className="category__list">
            {category?.entries?.map(entry => (
              <li className="item" key={entry.id}>
                <H2 as="h3" className="item__header">
                  <span>{entry.name}</span>
                  <span>{entry.dPrice}</span>
                </H2>
                <p className="item__content">{entry.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="Allergy">
        <div className="Allergy__content">
          <h3 className="Allergy__title">Allergener</h3>
          <p>
            (G) Gluten (M) Melk (N) Nøtter (E) Egg (F) Fisk (P) Peanøtt (S)
            Sulfitter
          </p>
        </div>
      </div>
      <div className="actions">
        <Button style={{ width: '100%' }}>
          <FloatingWord word="Bestill" color={theme.colors.background} />
        </Button>
      </div>
    </div>
  )
}

export default styled(Menu)(
  ({ theme }) => css`
    ${spacing.section('mt')};
    text-align: left;

    .category {
      &:not(:first-of-type) {
        ${spacing.section('mt')};
      }
      ${bp.above.md`
        padding-left:30%;
        &:nth-of-type(odd) {
          padding-left: 0;
          padding-right:30%;
        }
      `}
    }

    .category__list {
      padding: 0;
    }

    .category__header {
      position: sticky;
      /* top: var(--headerHeight); */
      top: 0;
      ${spacing.sm('py')};
      background-color: ${theme.colors.background};
      ${fonts.display()};
      h2 {
        margin: 0;
      }
    }

    .item:not(:first-child) {
      ${spacing.lg('mt')}
      margin-bottom: 0;
    }

    .item__header {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 0;

      span:first-of-type {
        flex-grow: 1;
        flex-basis: 80%;
      }
    }
    .item__content {
      max-width: 50ch;
      font-size: 4rem;
      ${spacing.xs('mt')};
      font-style: italic;
    }
    .actions {
      ${spacing.section('mt')};
    }
  `
)
