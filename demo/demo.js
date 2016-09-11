import React from 'react'
import ReactDOM from 'react-dom'
import Umbrella from './umbrella'
import Hexagon from '../src/Hexagon'
import HoverHexagon from './hoverHexagon'

class HexDemo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {strokeStyle: null, umbrellaColor: '#2ecc71'}
    this.handleStrokeToggle = this.handleStrokeToggle.bind(this)
    this.handleUmbrellaColorChange = this.handleUmbrellaColorChange.bind(this)
  }

  handleStrokeToggle() {
    this.setState({
      strokeStyle: this.state.strokeStyle ? null : '45, 15'
    })
  }

  handleUmbrellaColorChange(event) {
    this.setState({
      umbrellaColor: event.type === 'mouseenter' ? '#ecf0f1' : '#2ecc71'
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
          <Hexagon style={{fill: '#8e44ad'}} className="text">
            <text x="50%" y="65%">SVG text!</text>

            <foreignObject className="foreign-object" x="0%" y="25%" width="100%">
              <p style={{padding: 20, textAlign: 'center'}}>
                HTML text!<br />
                <span style={{fontSize: '0.5em'}}>(not universally supported)</span>
              </p>
            </foreignObject>
          </Hexagon>
        </div>

        <div className="row">
          { /* An SVG-umbrella inside an SVG-hexagon?! How pretty! */ }
          <HoverHexagon
            className="umbrella"
            style={{stroke: this.state.umbrellaColor, fill: 'url(#blueHexagonGradient)'}}
            onEnter={this.handleUmbrellaColorChange}
            onLeave={this.handleUmbrellaColorChange}>
            <Umbrella fill={this.state.umbrellaColor} />
            <text x="50%" y="60%">SVG-umbrella!</text>
            <text x="50%" y="70%" style={{fontSize: '30px'}}>Gradient background!</text>

            <defs>
              <linearGradient id="blueHexagonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3498db"></stop>
                <stop offset="100%" stopColor="#2c3e50"></stop>
              </linearGradient>
            </defs>
          </HoverHexagon>

          { /* Linkable hexagons? Awesome. */ }
          <Hexagon
            style={{stroke: '#c0392b'}}
            backgroundImage="https://espen.codes/assets/img/me.jpg"
            backgroundScale={1.05}
            href="https://espen.codes/"
            target="_blank">

            <text x="50%" y="72%">Linkable!</text>
          </Hexagon>
        </div>

        <div className="row">
          <Hexagon
            style={{stroke: '#bf1942', strokeDasharray: '13,25', strokeLinecap: 'round'}}
            backgroundImage="img/squirrel.jpg">
            <text x="50%" y="50%">Stylable!</text>
          </Hexagon>

          <Hexagon style={{stroke: '#f1c40f'}} backgroundImage="img/coaster.jpg" />

          <Hexagon
            style={{stroke: '#16a085', strokeWidth: 4, strokeDasharray: '5,10'}}
            backgroundImage="img/bird.jpg">
            <text x="50%" y="70%">Thin stroke!</text>
          </Hexagon>
        </div>

        <div>
          <h2>Flat top style</h2>
        </div>

        <div className="flat-row">
          <Hexagon
            flatTop
            style={{stroke: 'orange', strokeWidth: 25}}
            backgroundImage="img/red-panda.jpg"
            backgroundScale={1.1}
          />

          <Hexagon
            flatTop
            backgroundImage="img/cabin.jpg"
          />

          <Hexagon
            flatTop
            style={{stroke: '#16a085', strokeDasharray: '5,10'}}
            backgroundImage="img/trains.jpg"
          />
        </div>
      </section>
    )
  }
}

ReactDOM.render(
  <HexDemo />,
  document.getElementById('root')
)
