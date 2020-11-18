import AnimateInView from '@heydays/animation/AnimateInView'
import Button from '@heydays/Button'
import CloudinaryMediaResolver from '@heydays/CloudinaryMediaResolver'
import Container from '@heydays/Container'
import { P } from '@heydays/Typography'
import { useRouter } from 'next/router'
import React from 'react'
import styled, { css, useTheme } from 'styled-components'
import { random } from 'utils/helpers'
import Editor from './editor'
import FloatingButton from './FloatingButton'

const ROTATIONS = [5, -5]

const Menu = ({ className, foodMenu }) => {
  const theme = useTheme()
  const router = useRouter()
  return (
    <Container>
      <div className={className} id="menuAnchor">
        {foodMenu?.categories?.map(category => (
          <div className="category" key={category._key}>
            {category?.title && (
              <header className="category__header">
                <h2
                  style={{
                    transform: `rotate(${
                      ROTATIONS[random(0, ROTATIONS.length)]
                    }deg)`
                  }}
                  className="category__title"
                >
                  {category?.title}
                </h2>
              </header>
            )}
            <div className="category__content">
              {category?.media && (
                <div className="category__image">
                  <AnimateInView threshold={0.5}>
                    <CloudinaryMediaResolver node={category.media} />
                  </AnimateInView>
                </div>
              )}
              {category?.items?.length > 0 && (
                <ul className="category__list">
                  {category.items.map(item => (
                    <AnimateInView key={item._key} initial={{ zIndex: -1 }}>
                      <li className="item">
                        {item?.title && (
                          <P as="h2" className="item__header">
                            {item.title}
                          </P>
                        )}
                        {item?.description && (
                          <Editor blocks={item.description} />
                        )}
                        {item?.price && (
                          <P className="item__price">{item.price},-</P>
                        )}
                      </li>
                    </AnimateInView>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
        {foodMenu?.allergens && (
          <div className="allergens">
            <h3 className="allergens__title">Allergener</h3>
            <Editor blocks={foodMenu.allergens} />
          </div>
        )}
        <div className="actions">
          <FloatingButton onClick={() => router.push(`http://weorder.com`)}>
            ORDER
          </FloatingButton>
        </div>
      </div>
    </Container>
  )
}

export default styled(Menu)(
  ({ theme: t }) => css`
    .category {
      position: relative;
      ${t.spacing.section('mt')};

      ${t.bp.md} {
        &__content {
          display: flex;
        }
        &__title {
          margin-left: 50%;
        }
        &__list {
          width: 50%;
        }
        &:nth-of-type(odd) {
          .category__content {
            flex-direction: row-reverse;
          }
          .category__image {
            transform: translate(-20%);
          }
          .category__title {
            margin-left: 0;
            margin-right: 50%;
          }
        }
      }

      &__header {
        position: sticky;
        top: calc(var(--header-height) - 1px);
        z-index: ${t.elevation[3]};
        background: ${`linear-gradient(180deg, ${
          t.colors.background
        } 60%, ${t.color.rgba(t.colors.background, 0.01)})`};
      }

      &__title {
        ${t.fonts.superLarge()};
        text-transform: uppercase;
        display: inline-block;
      }

      &__image {
        ${t.spacing.md('mt')};
        ${t.bp.md} {
          position: sticky;
          top: calc(var(--header-height) + 10rem);
          z-index: -1;
          align-self: flex-start;
          width: 50%;
          transform: translate(20%);
        }
      }
    }

    .item {
      ${t.spacing.lg('mt')};
      /* ${console.log(t.responsiveSpacing.lg)}; */

      &__price,
      &__content {
        ${t.spacing.xs('mt')};
      }
    }

    .allergens {
      ${t.spacing.section('mt')};
    }
    .actions {
      ${t.spacing.section('mt')};
    }
  `
)
{
  /* {response?.data?.menu?.map(menu => (
        <div className="category" key={menu?.categories.id}>
          <header className="category__header">
            <h2 className="category__title">{menu?.categories[0].name}</h2>
          </header>
          <AnimateInView threshold={0.5}>
            <img
              className="category__image"
              src="https://source.unsplash.com/random?fried,food"
              alt="some food"
            />
          </AnimateInView>
          <ul className="category__list">
            {menu?.categories[0]?.entries?.map(entry => (
              <AnimateInView key={entry.id}>
                <li className="item">
                  <H2 as="h3" className="item__header">
                    {entry.name}
                  </H2>
                  <p className="item__content">{entry.desc}</p>
                  <H2 as="p" className="item__price">
                    {entry.dPrice}
                  </H2>
                </li>
              </AnimateInView>
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
      </div> */
}
