import React from 'react'
import BackgroundDef from './BackgroundDef'

const {number, string, object, node, func} = React.PropTypes
const hexRatio = 0.868217054
const numSides = 6
const centerAng = 2 * Math.PI / numSides

function round(num) {
  return Number(num.toFixed(3))
}

function toRadians(degs) {
  return Math.PI * degs / 180
}

function getPoints(props, offset) {
  const cy = (props.diagonal / 2)
  const cx = ((props.diagonal * hexRatio) / 2)

  const startAng = toRadians(90)
  const radius = cy

  const vertex = []
  for (let i = 0; i < numSides; i++) {
    const ang = startAng + (i * centerAng)
    vertex.push([
      (offset / 2) + cx + radius * Math.cos(ang), // X
      (offset / 1.5) + cy - radius * Math.sin(ang)  // Y
    ])
  }

  return vertex.map(point => point.map(round))
}

function reduceBounds(extremes, point) {
  return {
    maxX: Math.ceil(Math.max(extremes.maxX, point[0])),
    maxY: Math.ceil(Math.max(extremes.maxY, point[1])),
    minX: Math.floor(Math.min(extremes.minX, point[0])),
    minY: Math.floor(Math.min(extremes.minY, point[1]))
  }
}

function defaults(defs, usr) {
  const target = {}

  for (const key in usr) {
    if (usr.hasOwnProperty(key)) {
      target[key] = usr[key]
    }
  }

  for (const key in defs) {
    if (typeof target[key] === 'undefined' && defs.hasOwnProperty(key)) {
      target[key] = defs[key]
    }
  }

  return target
}

function applyOffset(bounds, offset) {
  return {
    maxX: bounds.maxX + (offset / 2),
    maxY: bounds.maxY + (offset / 1.5),
    minX: bounds.minX,
    minY: bounds.minY
  }
}

function Hexagon(props) {
  const polyStyle = defaults({
    fill: props.backgroundImage ? 'url(#bg)' : 'none',
    stroke: '#42873f',
    strokeWidth: props.diagonal * 0.02,
    cursor: props.onClick && 'pointer'
  }, props.style)

  const baseBounds = {maxX: 0, maxY: 0, minX: 0, minY: 0}
  const offset = polyStyle.strokeWidth
  const points = getPoints(props, offset)
  const bounds = applyOffset(points.reduce(reduceBounds, baseBounds), offset)
  const viewBox = [
    bounds.minX,
    bounds.minY,
    bounds.maxX + (bounds.minX < 0 ? Math.abs(bounds.minX) : 0),
    bounds.maxY + (bounds.minY < 0 ? Math.abs(bounds.minY) : 0)
  ].join(' ')

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className={props.className}
      viewBox={viewBox}>

      {props.backgroundImage && <BackgroundDef {...props} />}

      <polygon
        onClick={props.onClick}
        style={polyStyle}
        points={points.map(point => point.join(',')).join(' ')}
      />

      {props.children}
    </svg>
  )
}

Hexagon.propTypes = {
  diagonal: number,
  className: string,
  onClick: func,
  backgroundImage: string,
  backgroundWidth: number,
  backgroundHeight: number,
  backgroundSize: number,
  style: object, // eslint-disable-line react/forbid-prop-types
  children: node
}

Hexagon.defaultProps = {
  diagonal: 645,
  style: {}
}

export default Hexagon
