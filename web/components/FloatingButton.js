import React, { useRef, useState, useEffect } from 'react'
import Matter from 'matter-js'
import styled, { css } from 'styled-components'
import dynamic from 'next/dynamic'

import useInterval from '@heydays/useInterval'
import useWindowSize from '@heydays/useWindowSize'
import { random, createImage } from '../utils/helpers'
import { useTheme } from 'styled-components'
import { useInView } from 'react-intersection-observer'
import usePageVisibility from '@heydays/usePageVisibility'

const FloatingButton = ({ className, color, children, onClick }) => {
  const isPageVisible = usePageVisibility()
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0.7,
    triggerOnce: false
  })
  const wrapper = useRef(null)
  const container = useRef(null)
  const [matterEngine, setMatterEngine] = useState(null)
  const windowSize = useWindowSize({ debounce: 250 })
  const theme = useTheme()

  useInterval(() => {
    if (matterEngine) {
      matterEngine.world.gravity.x = random(-0.2, 0.2, { float: true })
      matterEngine.world.gravity.y = random(-0.2, 0.2, { float: true })
    }
  }, 2000)

  useEffect(() => {
    let engine
    let render
    let Engine
    let Render
    if (container.current && wrapper.current && isPageVisible && inView) {
      Engine = Matter.Engine
      Render = Matter.Render
      const World = Matter.World
      const Bodies = Matter.Bodies
      const Composites = Matter.Composites
      const Vertices = Matter.Vertices
      const Common = Matter.Common
      const Mouse = Matter.Mouse
      const MouseConstraint = Matter.MouseConstraint
      // const Query = Matter.Query

      engine = Engine.create({})
      setMatterEngine(engine)
      const rn = random(-0.1, 0.1)
      engine.world.gravity.x = 1
      engine.world.gravity.y = 1

      const { width, height } = wrapper.current.getBoundingClientRect()

      render = Render.create({
        element: container.current,
        engine: engine,
        options: {
          width: width,
          height: height,
          wireframes: false,
          background: 'transparent',
          enabledEvents: {
            mousewheel: false
          }
        }
      })

      Render.setPixelRatio(render, window.devicePixelRatio)

      // add mouse control
      const mouse = Mouse.create(render.canvas)
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        passive: true,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      })
      const wallWidth = 50
      const wallOptions = {
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'none',
          lineWidth: 0
        },
        isStatic: true
      }
      const word = createImage(
        children,
        Math.max(50, Math.min(width / 10, 150)),
        color || theme.colors.text,
        true,
        theme.colors.background
      )
      const button = Bodies.rectangle(
        width / 2,
        height / 2,
        word.dimension.measure.width,
        word.dimension.height,
        {
          restitution: 0.5,
          words: {
            word: word,
            image: word.image,
            hoverImage: word.hoverImage,
            onClick
          },
          render: {
            sprite: {
              texture: word.image,
              xScale: 1,
              yScale: 1,
              rotate: random(-50, 50)
            }
          }
        }
      )
      World.add(engine.world, [
        // walls
        //Top
        Bodies.rectangle(width / 2, 0, width, wallWidth, wallOptions),
        // Bottom
        Bodies.rectangle(width / 2, height, width, wallWidth, wallOptions),
        // Left
        Bodies.rectangle(0, height / 2, wallWidth, height, wallOptions),
        // Right
        Bodies.rectangle(width, height / 2, wallWidth, height, wallOptions),
        // Button
        button,
        mouseConstraint
      ])

      Matter.Events.on(mouseConstraint, 'mousedown', function(event) {
        if (mouseConstraint.body) {
          if (mouseConstraint?.body?.words?.onClick) {
            mouseConstraint.body.words.onClick()
          }
        }
      })
      // // CreateListeners for bodies
      // Matter.Events.on(mouseConstraint, 'mousemove', handleMousemove)
      Matter.Events.on(mouseConstraint, 'mousemove', function(event) {
        //For Matter.Query.point pass "array of bodies" and "mouse position"
        var bodies = Matter.Query.point([button], event.mouse.position)
        if (engine?.world?.bodies) {
          engine.world.bodies
            .filter(body => body !== bodies[0])
            .map(body => {
              if (body?.render?.sprite?.texture && body?.words?.image) {
                event.mouse.element.style.cursor = 'auto'
                body.render.sprite.texture = body.words.image
              }
              return null
            })
        }
        if (bodies[0]?.render?.sprite?.texture && bodies[0]?.words.image) {
          event.mouse.element.style.cursor = 'pointer'
          bodies[0].render.sprite.texture = bodies[0].words.hoverImage
        }
      })

      mouse.element.removeEventListener('touchstart', mouse.mousewheel)
      mouse.element.removeEventListener('touchmove', mouse.mousewheel)
      mouse.element.removeEventListener('touchend', mouse.mousewheel)
      mouse.element.removeEventListener('mousewheel', mouse.mousewheel)
      mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel)

      // add mouse control
      Render.run(render)
      Engine.run(engine)
    }
    return () => {
      Engine?.clear?.(engine)
      Render?.stop?.(render)
      render?.canvas?.parentNode?.removeChild?.(render.canvas)
    }
  }, [windowSize, theme, isPageVisible, inView])

  return (
    <div className={className} ref={ref}>
      <button className="wrapper" ref={wrapper}>
        {inView && isPageVisible && <div ref={container} />}
      </button>
    </div>
  )
}

export default styled(FloatingButton)(
  ({ theme }) => css`
    width: 100%;
    max-width: 100%;
    .wrapper {
      display: block;
      width: 100%;
      height: 200px;
      outline: 0;
      ${theme.bp.lg} {
        height: 400px;
      }
    }
  `
)
