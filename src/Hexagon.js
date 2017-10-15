import React from 'react'
import {number, string, object, node, func, bool} from 'prop-types'
import BackgroundDef from './BackgroundDef'

const hexRatio = 0.868217054
const numSides = 6
const centerAng = 2 * Math.PI / numSides

let bgIndex = 0

function round(num) {
  return Number(num.toFixed(3))
}

function toRadians(degs) {
  return Math.PI * degs / 180
}

function getPoints(props, offset) {
  const cy = props.diagonal / 2
  const cx = (props.diagonal * hexRatio) / 2

  const startAng = toRadians(90)
  const radius = cy

  const vertex = []
  for (let i = 0; i < numSides; i++) {
    const ang = startAng + (i * centerAng)
    vertex.push([
      (offset / 2) + cx + (radius * Math.cos(ang)), // X
      (offset / 1.5) + cy - (radius * Math.sin(ang)) // Y
    ])
  }

  return vertex.map(point => point.map(round))
}

function getFlatTopPoints(props, offset) {
  const y = props.diagonal / 2
  const cx = (hexRatio * props.diagonal) / 2
  const x = cx + (y - cx)
  const radius = y

  const cos = 0.866 * radius
  const sin = 0.5 * radius

  return [
    [x - sin, y - cos],
    [x + sin, y - cos],
    [x + radius, y],
    [x + sin, y + cos],
    [x - sin, y + cos],
    [x - radius, y],
  ].map(point => point.map(round))
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

function substractMinBounds(extremes) {
  return {
    maxX: extremes.maxX - extremes.minX,
    maxY: extremes.maxY - extremes.minY,
    minX: extremes.minX,
    minY: extremes.minY
  }
}

function getBackgroundId() {
  return `bg-${++bgIndex}`
}

function Hexagon(props) {
  const bgId = props.backgroundImage && getBackgroundId()
  const polyStyle = defaults({
    fill: props.backgroundImage ? `url(#${bgId})` : 'none',
    stroke: '#42873f',
    strokeWidth: props.diagonal * 0.02,
    cursor: props.onClick && 'pointer'
  }, props.style)

  const baseBounds = {
    maxX: -Infinity,
    maxY: -Infinity,
    minX: +Infinity,
    minY: +Infinity
  }

  const offset = polyStyle.strokeWidth
  const halfStroke = Math.ceil(offset / 2)
  const points = props.flatTop ? getFlatTopPoints(props, offset) : getPoints(props, offset)
  const bounds = substractMinBounds(points.reduce(reduceBounds, baseBounds))
  const viewBox = [
    bounds.minX,
    bounds.minY,
    bounds.maxX + (bounds.minX < 0 ? Math.abs(bounds.minX) : 0),
    bounds.maxY + (bounds.minY < 0 ? Math.abs(bounds.minY) : 0)
  ].join(' ')

  const polygon = (
    <polygon
      {...props.hexProps}
      onClick={props.onClick}
      style={polyStyle}
      points={points.map(point => point.join(',')).join(' ')}
    />
  )

  const anchor = props.href && <a xlinkHref={props.href} target={props.target}>{polygon}</a>

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className={props.className}
      viewBox={viewBox}>

      {props.backgroundImage && <BackgroundDef id={bgId} {...props} />}
      {anchor || polygon}

      {props.children}
    </svg>
  )

  function reduceBounds(extremes, point) {
    return {
      maxX: Math.ceil(Math.max(extremes.maxX, point[0] + halfStroke)),
      maxY: Math.ceil(Math.max(extremes.maxY, point[1] + halfStroke)),
      minX: Math.floor(Math.min(extremes.minX, point[0] - halfStroke)),
      minY: Math.floor(Math.min(extremes.minY, point[1] - halfStroke))
    }
  }
}

Hexagon.propTypes = {
  diagonal: number,
  className: string,
  onClick: func,
  href: string,
  target: string,
  flatTop: bool,
  backgroundImage: string,
  backgroundWidth: number,
  backgroundHeight: number,
  backgroundScale: number,
  backgroundSize: number,
  hexProps: object,
  style: object,
  children: node
}

Hexagon.defaultProps = {
  diagonal: 500,
  flatTop: false,
  style: {}
}

export default Hexagon
