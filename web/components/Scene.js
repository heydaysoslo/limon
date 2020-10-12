import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import Matter, { Body } from 'matter-js'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'

import useInterval from '@heydays/useInterval'
import useWindowSize from '@heydays/useWindowSize'
import { random, createImage } from '../utils/helpers'
import VisuallyHidden from '@heydays/VisuallyHidden'
import { useTheme } from 'styled-components'
import useAppContext from '@heydays/useAppContext'

const Scene = ({ wrapper, words, noHinders, color }) => {
  const container = useRef(null)
  const [matterEngine, setMatterEngine] = useState(null)
  const [lastSize, setLastSize] = useState(null)
  const windowSize = useWindowSize({ debounce: 250 })
  const svg = useRef(null)
  const router = useRouter()
  const theme = useTheme()
  const { actions } = useAppContext()

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
    if (container.current && wrapper.current) {
      Engine = Matter.Engine
      Render = Matter.Render
      const World = Matter.World
      const Bodies = Matter.Bodies
      const Svg = Matter.Svg
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
      const hinderSize = {
        width: 6,
        height: 6
      }
      const hinderOptions = angle => ({
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'none',
          lineWidth: 0
        },
        angle,
        isStatic: true
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
      const images = words.map(word => {
        return typeof word === 'string'
          ? createImage(
              word,
              Math.max(50, Math.min(width / 10, 150)),
              color || theme.colors.text
            )
          : createImage(
              word.title || word.linkText,
              Math.max(50, Math.min(width / 10, 150)),
              color || theme.colors.text
            )
      })
      const newBodies = images.map((word, i) => {
        return Bodies.rectangle(
          random(100, width - 100),
          random(100, height - 100),
          word.dimension.measure.width,
          word.dimension.height,
          {
            restitution: 0.5,
            words: {
              word: words[i],
              image: word.image,
              hoverImage: word.hoverImage
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
      })
      // images.map(body => {
      //   Body.rotate(body, random(-0.2, 0.2))
      //   Body.setMass(body, random(0, 10))
      //   Body.setDensity(body, random(0, 10))
      // })
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
        // Hinders
        !noHinders &&
          Bodies.rectangle(
            width / 2,
            height / 2,
            hinderSize.width,
            hinderSize.height,
            hinderOptions(random(-0.4, 0.4, { float: true }))
          ),
        ...[...new Array(noHinders ? 0 : 5)].map((_, i) =>
          Bodies.rectangle(
            random(0, width),
            random(0, height),
            hinderSize.width,
            hinderSize.height,
            hinderOptions(random(-0.4, 0.4, { float: true }))
          )
        ),
        ...newBodies,
        // stack,
        mouseConstraint
      ])

      Matter.Events.on(mouseConstraint, 'mousedown', function(event) {
        if (mouseConstraint.body) {
          if (
            mouseConstraint?.body?.render?.sprite?.texture &&
            mouseConstraint.body.words.image
          ) {
            mouseConstraint.body.render.sprite.texture =
              mouseConstraint.body.words.hoverImage
            console.log(mouseConstraint?.body?.words.word?._type)

            if (mouseConstraint?.body?.words.word?._type === 'scrollLink') {
              actions.toggleMenu(false)
              router.push(`#${mouseConstraint.body.words.word.id}`)
            } else if (mouseConstraint?.body?.words.word?._type === 'link') {
              console.log('external link')
              actions.toggleMenu(false)
              window.open(mouseConstraint?.body?.words.word?.href, '_blank')
            }
          }
        }
      })
      // const handleMousemove = debounce(e => {
      //   if (engine?.world?.bodies) {
      //     // console.log(engine?.world?.bodies)
      //     engine.world.bodies.map(body => {
      //       // console.log(mouseConstraint, body)
      //       console.log(
      //         mouseConstraint?.mouse?.position?.x,
      //         body?.bounds?.min?.x
      //       )
      //       const isWithinBounds =
      //         mouseConstraint?.mouse?.position?.x > body?.bounds?.min?.x &&
      //         mouseConstraint?.mouse?.position?.x < body?.bounds?.max?.x &&
      //         mouseConstraint?.mouse?.position?.y > body?.bounds?.min?.y &&
      //         mouseConstraint?.mouse?.position?.y < body?.bounds?.may?.x
      //       console.log('TCL: Scene -> isWithinBounds', isWithinBounds)
      //       if (isWithinBounds) {
      //         console.log('IS HOVERING', body)
      //       }
      //     })
      //   }
      // }, 50)
      // // CreateListeners for bodies
      // Matter.Events.on(mouseConstraint, 'mousemove', handleMousemove)
      Matter.Events.on(mouseConstraint, 'mousemove', function(event) {
        //For Matter.Query.point pass "array of bodies" and "mouse position"
        var bodies = Matter.Query.point(newBodies, event.mouse.position)
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

      // Push ball
      // Body.setVelocity(ballA, { x: 2, y: 3 });
      // add mouse control
      Render.run(render)
      Engine.run(engine)
    }
    return () => {
      Engine.clear(engine)
      Render.stop(render)
      render.canvas.parentNode.removeChild(render.canvas)
    }
  }, [windowSize, theme])

  return <div ref={container} />
}

export default styled(Scene)(
  ({ theme }) => css`
    width: 100%;
    max-width: 100%;
  `
)
