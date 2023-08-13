import { Component } from 'react';
export default class Slist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: ['Ali', 'ahmad', 'reza', 'hamed', 'gholi'],
      last: ['Alii', 'ahmadi', 'rezai', 'hamedi', 'gholiii'],
      names: []
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      let names = this.state.names
      let max = this.state.first.length
      let min = 0
      let randomNumber = Math.floor((min + (Math.random() * (max - min))))
      let first = this.state.first[randomNumber]
      let maxL = this.state.last.length
      let minL = 0
      let randomNumberL = Math.floor((minL + (Math.random() * (maxL - minL))))
      let last = this.state.last[randomNumberL]
      const age = Math.floor(Math.random() * 100);
      const number = Math.floor(Math.random() * 99999999);
      let person = {
        first: first,
        last: last,
        age: age,
        number: number
      }
      names.push(person)
      this.setState({ names })
      if (names.length == "10") {
        names.splice(0, 1);
      }
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        {this.state.names.map((name, index) => {
          return (
            <p key={index}>{name.first} {name.last} {name.age} {name.number}</p>
          )
        })}
      </div>
    );
  }
}