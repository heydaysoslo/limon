import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import Matter, { Body } from 'matter-js'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'

import useInterval from '@heydays/useInterval'
import useWindowSize from '@heydays/useWindowSize'
import { random, createImage } from '../utils/helpers'
import VisuallyHidden from '@heydays/VisuallyHidden'
import { useTheme } from 'styled-components'

const Scene = ({ wrapper, words, noHinders, color }) => {
  const container = useRef(null)
  const [matterEngine, setMatterEngine] = useState(null)
  const [lastSize, setLastSize] = useState(null)
  const windowSize = useWindowSize({ debounce: 250 })
  const svg = useRef(null)
  const router = useRouter()
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
      const images = words.map(word =>
        createImage(
          word,
          Math.max(50, Math.min(width / 10, 200)),
          color || theme.colors.text
        )
      )
      const newBodies = images.map((word, i) =>
        Bodies.rectangle(
          random(200, width - 200),
          random(200, height - 200),
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
      )
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
        ...[...new Array(noHinders ? 0 : 10)].map((_, i) =>
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
        console.log('clicked')
        if (mouseConstraint.body) {
          if (
            mouseConstraint?.body?.render?.sprite?.texture &&
            mouseConstraint.body.words.image
          ) {
            mouseConstraint.body.render.sprite.texture =
              mouseConstraint.body.words.hoverImage
            router.push(`/${mouseConstraint.body.words.word.toLowerCase()}`)
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

  return (
    <>
      <VisuallyHidden>
        <svg
          ref={svg}
          width="676"
          height="147"
          viewBox="0 0 676 147"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M59.8672 144C89.9453 144 108.207 128.766 108.207 103.961C108.207 85.3086 94.8281 71.5391 75.6875 69.6836V68.9023C90.1406 66.5586 101.371 53.375 101.371 38.2383C101.371 16.8516 84.8672 3.08203 59.2812 3.08203H0.785156V144H59.8672ZM25.9805 22.7109H52.9336C67.9727 22.7109 76.4688 29.6445 76.4688 41.9492C76.4688 55.0352 66.6055 62.457 49.0273 62.457H25.9805V22.7109ZM25.9805 124.371V80.3281H53.0312C72.3672 80.3281 82.5234 87.8477 82.5234 102.203C82.5234 116.656 72.6602 124.371 54.1055 124.371H25.9805Z"
            fill="black"
          />
          <path
            d="M189.035 0.738281C147.922 0.738281 122.141 28.7656 122.141 73.5898C122.141 118.414 147.922 146.344 189.035 146.344C230.051 146.344 255.832 118.414 255.832 73.5898C255.832 28.7656 230.051 0.738281 189.035 0.738281ZM189.035 22.2227C214.133 22.2227 230.148 42.1445 230.148 73.5898C230.148 104.938 214.133 124.859 189.035 124.859C163.84 124.859 147.922 104.938 147.922 73.5898C147.922 42.1445 163.84 22.2227 189.035 22.2227Z"
            fill="black"
          />
          <path
            d="M353.945 42.0469H354.922L383.73 144H407.461L445.254 3.08203H419.082L394.668 109.82H393.887L365.566 3.08203H343.301L314.98 109.82H314.199L289.785 3.08203H263.613L301.406 144H325.137L353.945 42.0469Z"
            fill="black"
          />
          <path
            d="M551.766 122.711H487.801V3.08203H462.605V144H551.766V122.711Z"
            fill="black"
          />
          <path
            d="M564.723 104.645C565.895 130.426 587.477 146.344 620.094 146.344C653.98 146.344 675.172 129.352 675.172 102.398C675.172 81.5 662.77 69.5859 633.082 63.4336L617.848 60.3086C600.27 56.5977 593.238 50.4453 593.238 40.875C593.238 29.0586 604.371 21.6367 619.996 21.6367C636.109 21.6367 647.242 29.6445 648.414 42.9258H672.535C671.949 17.7305 651.344 0.738281 620.191 0.738281C589.625 0.738281 567.848 17.5352 567.848 42.3398C567.848 62.9453 581.031 76.2266 609.254 81.9883L624.391 85.1133C642.75 88.9219 649.781 95.1719 649.781 105.328C649.781 117.047 637.965 125.445 620.973 125.445C603.395 125.445 590.699 117.633 588.844 104.645H564.723Z"
            fill="black"
          />
        </svg>
      </VisuallyHidden>

      <div ref={container} />
    </>
  )
}

export default styled(Scene)(
  ({ theme }) => css`
    width: 100%;
    max-width: 100%;
  `
)
