import React from 'react';
import './style.css';

import Path from './components/Path';
import Pool from './components/Pool';

class App extends React.Component {
  state = { poolDelights: [], pathDelights: [] };

  // const user = JSON.parse(localStorage.getItem('user'));
  // localStorage.setItem('user', JSON.stringify({ name: 'Felix' }));

  componentDidMount() {
    if (localStorage.getItem('pool') === null) {
      console.log('No pool in localstorage - generating');
      this.populateNewPool();
    } else {
      console.log('Loading pool from localstorage');
      this.setState({ poolDelights: JSON.parse(localStorage.getItem('pool')) });
    }
  }

  populateNewPool = () => {
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
    this.setState({
      poolDelights: newPool,
    });
    localStorage.setItem('pool', JSON.stringify(newPool));
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
