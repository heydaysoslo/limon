import React, { useRef, useState, useLayoutEffect } from 'react'
import styled, { css } from 'styled-components'
import Matter, { Body } from 'matter-js'

import AspectContainer from '@heydays/AspectContainer'
import useWindowSize from '@heydays/useWindowSize'
import useInterval from '@heydays/useInterval'
import { random } from '../utils/helpers'
import { getImageSrc } from '../utils/cloudinary'

const FloatingImage = ({
  className,
  image = 'https://source.unsplash.com/random',
  aspect = { xs: 'portrait' }
}) => {
  const wrapper = useRef(null)
  const container = useRef(null)
  const [matterEngine, setMatterEngine] = useState(null)
  const windowSize = useWindowSize({ debounce: 250 })

  useInterval(() => {
    if (matterEngine) {
      matterEngine.world.gravity.x = random(-0.1, 0.1)
      matterEngine.world.gravity.y = random(-0.1, 0.1)
    }
  }, 1000)

  useLayoutEffect(() => {
    let engine
    let render
    let Engine
    let Render
    if (container.current && wrapper.current) {
      Engine = Matter.Engine
      Render = Matter.Render
      const World = Matter.World
      const Bodies = Matter.Bodies
      const Mouse = Matter.Mouse
      const MouseConstraint = Matter.MouseConstraint

      engine = Engine.create({})
      setMatterEngine(engine)
      engine.world.gravity.x = random(-0.1, 0.1)
      engine.world.gravity.y = random(-0.1, 0.1)

      const { width, height } = wrapper.current.getBoundingClientRect()
      console.log(wrapper.current.getBoundingClientRect())

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

      // add mouse control
      const mouse = Mouse.create(render.canvas)
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
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
        Bodies.rectangle(
          100, // x
          100, // y
          1000, // width
          1000, // height
          {
            restitution: 1,
            render: {
              sprite: {
                texture: getImageSrc(image).src,
                xScale: 1,
                yScale: 1,
                rotate: random(-50, 50)
              }
            }
          }
        ),
        // stack,
        mouseConstraint
      ])

      // console.log(
      //   'stats',
      //   engine,
      //   render,
      //   width,
      //   height,
      //   `inView: ${inView}`,
      //   image.asset.fixed.width,
      //   image.asset.fixed.height,
      //   image.asset.fixed.src
      // )

      Render.run(render)
      Engine.run(engine)
    }
    return () => {
      if (render && engine) {
        Engine.clear(engine)
        Render.stop(render)
        render.canvas.parentNode.removeChild(render.canvas)
      }
    }
  }, [windowSize, container, wrapper])
  return (
    <div ref={wrapper} className={className}>
      <AspectContainer aspect={aspect}>
        <div className="inner" ref={container} />
      </AspectContainer>
    </div>
  )
}

export default styled(FloatingImage)(
  ({ theme }) => css`
    max-width: 500px;

    /* width: 100%;
    height: 500px; */
  `
)
