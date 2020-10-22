import React from 'react'
import styled, { css } from 'styled-components'
import Spacer, { SpacerProps } from './Spacer'

type Props = {
  className?: string
  /**
   * Space value only between elements.
   *
   * @note To set space at the ends use spaceEnds | spaceEndsStart | spaceEndsEnd
   */
  space?: SpacerProps['size']
  reverse?: boolean
  /**
   * Set the direction of the elements.
   * row for horizontal and column for vertical.
   * @note defaults to column (vertical)
   */
  direction?: 'row' | 'column'
  /**
   * Setting to true sets same space as others
   *
   * To set different spacing at the ends pass a spacing value.
   * @note If you want to space ends seperatly use spaceEndsStart | spaceEndsEnd
   */
  spaceEnds?: boolean | SpacerProps['size']
  /**
   * Sets spacing in the start of the stack
   * @note If you want the same space for end and start use spaceEnds
   */
  spaceEndsStart?: boolean | SpacerProps['size']
  /**
   * Sets spacing in the end of the stack
   * @note If you want the same space for end and start use spaceEnds
   */
  spaceEndsEnd?: boolean | SpacerProps['size']
}

const Stack: React.FC<Props> = ({
  className,
  children,
  space = 'md',
  spaceEnds,
  spaceEndsStart,
  spaceEndsEnd,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {spaceEnds && (
        <Spacer size={typeof spaceEnds === 'string' ? spaceEnds : space} />
      )}
      {spaceEndsStart && (
        <Spacer
          size={typeof spaceEndsStart === 'string' ? spaceEndsStart : space}
        />
      )}
      {Array.isArray(children)
        ? children.map((child, i) => (
            <>
              {child}
              {i !== children.length - 1 && <Spacer size={space} />}
            </>
          ))
        : children}
      {spaceEndsEnd && (
        <Spacer
          size={typeof spaceEndsEnd === 'string' ? spaceEndsEnd : space}
        />
      )}
      {spaceEnds && (
        <Spacer size={typeof spaceEnds === 'string' ? spaceEnds : space} />
      )}
    </div>
  )
}

export default styled(Stack)(
  ({ reverse, direction = 'column' }) => css`
    display: flex;
    flex-direction: ${direction};
    ${reverse
      ? css`
          flex-direction: ${direction}-reverse;
        `
      : css`
          flex-direction: ${direction};
        `}
  `
)
