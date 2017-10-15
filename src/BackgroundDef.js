import React from 'react'
import {number, string, bool} from 'prop-types'

function getSize(props) {
  let width = props.diagonal
  let height = props.diagonal

  if (props.flatTop) {
    width *= 1.05
    height *= 1.05
  }

  if (props.backgroundScale) {
    width *= props.backgroundScale
    height = width
  } else if (props.backgroundWidth) {
    width = props.backgroundWidth
    height = props.backgroundHeight
  } else if (props.backgroundSize) {
    width = props.backgroundSize
    height = props.backgroundSize
  }

  return {width, height}
}

function BackgroundDef(props) {
  const diagonal = props.diagonal
  const {width, height} = getSize(props)

  const hasSize = width !== diagonal
  const imgWidth = hasSize ? width : '100%'
  const imgHeight = hasSize ? height : '100%'
  const yOffset = props.yOffset || 0
  const xOffset = typeof props.xOffset === 'undefined' && props.flatTop
    ? 0 - (imgWidth * 0.065)
    : 0

  return (
    <defs>
      <pattern id={props.id} width={width} height={height} patternUnits="userSpaceOnUse">
        <image x={xOffset} y={yOffset} width={imgWidth} height={imgHeight} xlinkHref={props.backgroundImage} />
      </pattern>
    </defs>
  )
}

BackgroundDef.propTypes = {
  id: string.isRequired,
  flatTop: bool,
  backgroundImage: string.isRequired,
  backgroundScale: number,
  backgroundWidth: number,
  backgroundHeight: number,
  backgroundSize: number,
  xOffset: number,
  yOffset: number,
  diagonal: number
}

export default BackgroundDef
