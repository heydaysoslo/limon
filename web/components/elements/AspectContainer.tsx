import React, { useRef, useLayoutEffect, useState, useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import useMediaQuery from '../hooks/useMediaQuery'
import useWindowSize from '../hooks/useWindowSize'
import { breakpoints } from '../../styles/themes/defaultTheme'
import { aspect } from 'types'

type Props = {
  /**
   * Takes the aspect ratio as a string, number or responsive object.
   *
   * @note String must correspond to a aspect ratio in the defaultTheme eg. portrait.
   *
   * @example ```jsx
   * <AspectContainer aspect={{xs: 'portrait', md: 2.4}} />
   * <AspectContainer aspect="portrait" />
   * ```
   */
  aspect: aspect
  /**
   * This ensures that content won't be cut off if it's larger than the container.
   */
  preventOverflow?: boolean
  className?: string
  /**
   * Set a desired max height.
   */
  maxHeight?: number
}

const StyledAspectContainer = styled.div`
  position: relative;
  .AspectContainer__container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
  }
  .AspectContainer__content {
    display: flex;
    width: 100%;
    min-height: 100%;
  }
`

const AspectContainer: React.FC<Props> = ({
  aspect,
  preventOverflow = true,
  maxHeight,
  children,
  className
}) => {
  const media = useMediaQuery()
  const { innerHeight, innerWidth } = useWindowSize({ debounce: 100 })
  const contentEl = useRef<HTMLDivElement>(null)
  const wrapperEl = useRef<HTMLDivElement>(null)
  const [currentRatio, setCurrentRatio] = useState(1)
  const theme = useTheme()

  const resolveAspect = (aspect: Props['aspect'], bp: string) => {
    switch (typeof aspect) {
      case 'string':
        return theme.aspect[aspect]
      case 'number':
        return aspect
      default:
        // assumes object
        let prevRatio = aspect[Object.keys(breakpoints)[0]]
        if (aspect[bp] !== undefined) {
          return aspect[bp]
        } else {
          return prevRatio
        }
    }
  }

  // Compute a full set of ratios based on breakpoints
  const computeRatios = () => {
    let calculatedRatios = {}
    for (const bp of Object.keys(breakpoints)) {
      calculatedRatios[bp] = resolveAspect(aspect, bp)
    }
    return calculatedRatios
  }

  // Create a memo to prevent unwanted recalculation of ratios
  const memoizedRatios = useMemo(computeRatios, [aspect])

  // Prevent container from being smaller than it's content
  const setWrapperMinHeight = () => {
    if (contentEl?.current && wrapperEl?.current) {
      // Unset the container min height to make sure we get correct actual height
      // useState(minHeight, setMinHeight) is NOT an option
      wrapperEl.current.style.minHeight = ''
      // Get wrapper and content heights
      const wrapperHeight = wrapperEl.current.getBoundingClientRect().height
      const contentHeight = contentEl.current.getBoundingClientRect().height
      // Set minHeight for wrapper
      if (contentHeight >= wrapperHeight) {
        wrapperEl.current.style.minHeight = `${contentHeight}px`
      }
    }
  }

  // Calculate ratio based on breakpoint
  const calculateNewRatio = () => {
    if (memoizedRatios?.[media] !== undefined) {
      setCurrentRatio(memoizedRatios[media])
    }
  }

  // Recalculate container overflow
  /*
  Recalculating when child is added is not 100% reliable
  might be because it's fired before the child is fully rendered
  */
  useLayoutEffect(() => {
    if (children && preventOverflow) {
      setWrapperMinHeight()
    }
  }, [innerHeight, innerWidth, preventOverflow, children, currentRatio])

  // Get ratio based on breakpoint
  useLayoutEffect(calculateNewRatio, [media])

  return (
    <StyledAspectContainer
      className={className}
      style={{
        maxHeight
      }}
      ref={wrapperEl}
    >
      <div
        style={{
          paddingTop: currentRatio && `${currentRatio * 100}%`
        }}
      />
      {children && (
        <div className="AspectContainer__container">
          <div className="AspectContainer__content" ref={contentEl}>
            {children}
          </div>
        </div>
      )}
    </StyledAspectContainer>
  )
}

export default AspectContainer
