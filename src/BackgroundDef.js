import React from 'react'

const {number, string} = React.PropTypes

function BackgroundDef(props) {
  const diagonal = props.diagonal
  let width = diagonal
  let height = diagonal

  if (props.backgroundScale) {
    width = diagonal * props.backgroundScale
    height = width
  } else if (props.backgroundWidth) {
    width = props.backgroundWidth
    height = props.backgroundHeight
  } else if (props.backgroundSize) {
    width = props.backgroundSize
    height = props.backgroundSize
  }

  const hasSize = width !== diagonal
  const imgWidth = hasSize ? width : '100%'
  const imgHeight = hasSize ? height : '100%'

  return (
    <defs>
      <pattern id={props.id} width={width} height={height} patternUnits="userSpaceOnUse">
        <image width={imgWidth} height={imgHeight} xlinkHref={props.backgroundImage} />
      </pattern>
    </defs>
  )
}

BackgroundDef.propTypes = {
  id: string.isRequired,
  backgroundImage: string.isRequired,
  backgroundScale: number,
  backgroundWidth: number,
  backgroundHeight: number,
  backgroundSize: number,
  diagonal: number
}

export default BackgroundDef
