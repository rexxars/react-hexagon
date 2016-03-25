import React from 'react'

const {number, string} = React.PropTypes

function BackgroundDef(props) {
  const width = props.backgroundWidth || props.backgroundSize || props.diagonal
  const height = props.backgroundHeight || props.backgroundSize || props.diagonal
  return (
    <defs>
      <pattern id={props.id} width={width} height={height} patternUnits="userSpaceOnUse">
        <image width="100%" height="100%" xlinkHref={props.backgroundImage} />
      </pattern>
    </defs>
  )
}

BackgroundDef.propTypes = {
  id: string.isRequired,
  backgroundImage: string.isRequired,
  backgroundWidth: number,
  backgroundHeight: number,
  backgroundSize: number,
  diagonal: number
}

export default BackgroundDef
