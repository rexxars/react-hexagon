import React from 'react'
import ReactDOM from 'react-dom'
import Umbrella from './umbrella'
import Hexagon from '../src/Hexagon'

class HexDemo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {strokeStyle: null}
    this.handleStrokeToggle = this.handleStrokeToggle.bind(this)
  }

  handleStrokeToggle() {
    this.setState({
      strokeStyle: this.state.strokeStyle ? null : '45, 15'
    })
  }

  render() {
    return (
      <section>
        <div className="row">
          { /* Simple image hexagon */ }
          <Hexagon style={{stroke: 'orange'}} backgroundImage="img/red-panda.jpg" />

          { /* onClick handler + text */ }
          <Hexagon
            backgroundImage="img/beer.jpg"
            onClick={this.handleStrokeToggle}
            style={{
              stroke: 'cyan',
              transition: 'stroke-dasharray 0.7s',
              strokeDasharray: this.state.strokeStyle
            }}>
            <text x="50%" y="70%">Click handler!</text>
          </Hexagon>

          { /* Text + background color */ }
          <Hexagon style={{fill: '#8e44ad'}}>
            <text x="50%" y="50%" style={{fill: '#ecf0f1'}}>SVG text!</text>
          </Hexagon>
        </div>

        <div className="row">
          <Hexagon style={{stroke: '#c0392b'}} backgroundImage="img/bird.jpg" />
          <Hexagon style={{stroke: '#f1c40f'}} backgroundImage="img/coaster.jpg" />
        </div>

        <div className="row">
          <Hexagon style={{stroke: '#7f8c8d'}} backgroundImage="img/squirrel.jpg" />
          <Hexagon style={{stroke: '#47a1de'}}>
            { /* An SVG-umbrella inside an SVG-hexagon?! How pretty! */ }
            <Umbrella />
            <text x="50%" y="60%" style={{fill: '#ecf0f1'}}>SVG-umbrella!</text>
          </Hexagon>
          <Hexagon style={{stroke: '#16a085', strokeWidth: 4, strokeDasharray: '5,10'}}>
            <text x="50%" y="50%" style={{fill: '#ecf0f1'}}>Custom stroke!</text>
          </Hexagon>
        </div>
      </section>
    )
  }
}

ReactDOM.render(
  <HexDemo />,
  document.getElementById('root')
)
