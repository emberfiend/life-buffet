import React from 'react';
import './style.css';

import Path from './components/Path';
import Pool from './components/Pool';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { poolDelights: this.loadPool(), pathDelights: [] };
  }

  /*state = {
    poolDelights: this.loadPool(), //JSON.parse(localStorage.getItem('pool'))
    pathDelights: [],
  };*/

  //if (this.state.poolDelights.length == 0) {

  //}

  // const user = JSON.parse(localStorage.getItem('user'));
  // localStorage.setItem('user', JSON.stringify({ name: 'Felix' }));

  componentDidMount() {
    //this.setState({ poolDelights: this.loadPool() });
    //console.log("App > componentDidMount > poolDelights")
    //console.log(this.state.poolDelights);
    //console.log("App > componentDidMount > loadPool()")
    //console.log(this.loadPool());
  }

  loadPool = () => {
    if (localStorage.getItem('pool') === null) {
      console.log('No pool in localstorage - generating');
      const newPool = [
        {
          name: 'Draw',
          description: 'Put lines on paper using lead!',
          imageUrl: 'https://andrewbackhouse.com/res/reeds.jpg',
          tags: ['indoors', 'outdoors', 'creative', 'cheap'],
        },
        {
          name: 'Skateboard',
          description: 'Ride your sweet chrome into the sunset!',
          imageUrl: 'https://andrewbackhouse.com/res/reeds.jpg',
          tags: ['outdoors', 'skill', 'risk-moderate'],
        },
      ];
      localStorage.setItem('pool', JSON.stringify(newPool));
      return newPool;
    } else {
      console.log('Loading pool from localstorage');
      return JSON.parse(localStorage.getItem('pool'));
    }
  };

  // invoking this just after changing state doesn't work - something about lifecycle
  saveToLocalStorage = () => {
    localStorage.setItem('pool', JSON.stringify(this.state.poolDelights));
    localStorage.setItem('path', JSON.stringify(this.state.pathDelights));
  };

  onDelightAdd = (delight) => {};

  onDelightSelect = (delight) => {
    //this.setState({ selectedVideo: video });
    console.log('Delight clicked.');
  };

  render() {
    return (
      <div>
        <Path />
        <Pool
          delights={this.state.poolDelights}
          onDelightSelect={this.onDelightSelect}
        />
      </div>
    );
  }
}

export default App;
