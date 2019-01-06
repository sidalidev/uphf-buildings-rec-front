import React, { Component } from 'react'
import './App.css'
import { getBuildingIdentity } from './services/buildings'

class App extends Component {
  state = {
    isLoading: false,
    buildingIdentity: '',
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    })
    try {
      const { data } = await getBuildingIdentity()
      this.setState({
        buildingIdentity: data,
        isLoading: false,
      })
    } catch (error) {
      console.error('getBuildingIdentity ERROR', error)
      this.setState({
        isLoading: false,
      })
    }
  }
  render() {
    const { isLoading, buildingIdentity } = this.state
    return (
      <div className="App">
        {isLoading ? (
          <h1>Veuillez patienter...</h1>
        ) : (
          <h1>{buildingIdentity}</h1>
        )}
      </div>
    )
  }
}

export default App
