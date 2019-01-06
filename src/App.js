import React, { Component } from 'react'
import './App.css'
import { getBuildingIdentity } from './services/buildings'

class App extends Component {
  state = {
    isLoading: false,
    imageToIdentify: null,
    imageToIdentifyPreviwUrl: '',
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

  importImageToIdentify = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]
    reader.onloadend = () => {
      this.setState({
        imageToIdentify: file,
        imageToIdentifyPreviwUrl: reader.result,
      })
    }
    reader.readAsDataURL(file)
  }
  render() {
    const {
      isLoading,
      buildingIdentity,
      imageToIdentify,
      imageToIdentifyPreviwUrl,
    } = this.state
    return (
      <div className="App">
        <input
          onChange={this.importImageToIdentify}
          type="file"
          src={imageToIdentify}
          alt="Importer l'image a identifier"
        />
        {imageToIdentifyPreviwUrl ? (
          <img src={imageToIdentifyPreviwUrl} alt="à identifier" />
        ) : null}
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
