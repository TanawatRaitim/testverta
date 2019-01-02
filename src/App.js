import React, { Component } from 'react'
import BmiForm from './BmiForm'
import AllPerson from './AllPerson'


class App extends Component {
  render() {
    return (
    <div className="App container">
        <BmiForm />
        <AllPerson />
    </div>
    )
  }
}
export default App