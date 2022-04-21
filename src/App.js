import React from 'react';
import './style.css';

import DelightList from './components/DelightList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poolDelights: this.loadPool(),
      pathDelights: this.loadPath(),
    };
  }

  componentDidMount() {
    // ..
  }

  loadPool = () => {
    if (localStorage.getItem('pool') === null) {
      console.log('No pool in localstorage - generating items');
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

  loadPath = () => {
    if (localStorage.getItem('path') === null) {
      console.log('No path in localstorage - generating empty');
      const newPath = [];
      localStorage.setItem('path', JSON.stringify(newPath));
      return newPath;
    } else {
      console.log('Loading path from localstorage');
      return JSON.parse(localStorage.getItem('path'));
    }
  };

  // invoking this just after changing state doesn't work - something about lifecycle
  saveToLocalStorage = () => {
    localStorage.setItem('pool', JSON.stringify(this.state.poolDelights));
    localStorage.setItem('path', JSON.stringify(this.state.pathDelights));
  };

  onAdd = (delight) => {};

  onSelect = (delight) => {
    //this.setState({ selectedVideo: video });
    console.log(`Delight ${delight.name} clicked for selection.`);
  };

  onDelete = (delight) => {
    //this.setState({ selectedVideo: video });
    console.log(`Delight ${delight.name} clicked for deletion.`);
  };

  render() {
    return (
      <div>
        <DelightList
          name="Your path"
          delights={this.state.pathDelights}
          onSelect={this.onSelect}
          onAdd={this.onAdd}
          onDelete={this.onDelete}
          onDrag={this.onDrag}
        />
        <DelightList
          name="The buffet"
          delights={this.state.poolDelights}
          onSelect={this.onSelect}
          onAdd={this.onAdd}
          onDelete={this.onDelete}
          onDrag={this.onDrag}
        />
      </div>
    );
  }
}

export default App;
