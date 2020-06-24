import React, { Component } from 'react';
import 'tachyons';
import './App.css';
import './components/Navigation/Navigation'
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Form from './components/Form/Form';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: '42dcd324123f4c26b2782b5dcdd623c6'
});


const particlesParams = {
  "particles": {
    "number": {
      "value": 100
    },
    "size": {
      "value": 3
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false
    }
  }


  calculateFaceLocation = (data) => {
    const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('InputImage')
    const height = Number(image.height);
    const width = Number(image.width);
    return {
      leftCol: ClarifaiFace.left_col * width,
      topRow: ClarifaiFace.top_row * height,
      rightCol: width - (ClarifaiFace.right_col * width),
      bottomRow: height - (ClarifaiFace.bottom_row * height)
    }
  }

  displayfaceBox = (box) => {
    console.log(box);
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayfaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signOut'){
      this.setState({isSignedIn: false});
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, box, imageUrl, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesParams} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <Form onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signIn'
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    )
  };
}

export default App;
