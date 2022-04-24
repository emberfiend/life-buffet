import React from 'react';
import './style.css';

import DelightList from './components/DelightList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poolDelights: this.loadPool(),
      pathDelights: this.loadPath(),
      addModalShow: false,
      addModalTarget: '',
    };
  }

  componentDidMount() {
    // ..
  }

  componentDidUpdate() {
    // you're supposed to compare props in here? hmm
    // is there a useEffect-like way to watch state from a class-based component, instead of doing it blindly like this?
    //console.log('componentDidUpdate');
    //console.log(this.state.poolDelights);
    this.saveToLocalStorage();
  }

  saveToLocalStorage = () => {
    console.log('saveToLocalStorage');
    localStorage.setItem('pool', JSON.stringify(this.state.poolDelights));
    localStorage.setItem('path', JSON.stringify(this.state.pathDelights));
  };

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

  // exclusively for adding a pool delight to the path pool
  onPoolSelect = (delight) => {
    //this.setState({ selectedVideo: video });
    console.log(`Delight ${delight.name} clicked for selection.`);

    if (!this.state.pathDelights.some((d) => d.name === delight.name)) {
      console.log('Absent from path delights');

      // can't array.push as it modifies in-place
      this.setState((prevState) => ({
        pathDelights: [...prevState.pathDelights, delight],
      }));
    }
  };

  onPathAdd = () => {
    console.log(`Path clicked for addition - using dummy delight for now.`);

    const newDelight = {
      name: 'Dummy',
      description: 'Test',
      imageUrl: 'https://andrewbackhouse.com/res/reeds.jpg',
      tags: ['test', 'test2'],
    };

    if (!this.state.pathDelights.some((d) => d.name === newDelight.name)) {
      console.log('Absent from pool delights');

      this.setState((prevState) => ({
        pathDelights: [...prevState.pathDelights, newDelight],
      }));
    }
  };

  onPoolAdd = () => {
    console.log(`Pool clicked for addition - using dummy delight for now.`);
    const newDelight = {
      name: 'Dummy',
      description: 'Test',
      imageUrl: 'https://andrewbackhouse.com/res/reeds.jpg',
      tags: ['test', 'test2'],
    };

    if (!this.state.poolDelights.some((d) => d.name === newDelight.name)) {
      console.log('Absent from pool delights');

      this.setState((prevState) => ({
        poolDelights: [...prevState.poolDelights, newDelight],
      }));
    }
  };

  onPathDelete = (delight) => {
    console.log(`Path delight ${delight.name} clicked for deletion.`);

    // array.filter returns a newly created array
    this.setState((prevState) => ({
      pathDelights: prevState.pathDelights.filter((d) => d !== delight),
    }));
  };

  onPoolDelete = (delight) => {
    console.log(`Pool delight ${delight.name} clicked for deletion.`);

    this.setState((prevState) => ({
      poolDelights: prevState.poolDelights.filter((d) => d !== delight),
    }));
  };

  render() {
    return (
      <div className="ui raised very padded text container segment">
        {this.state.addModalShow ? (
          <AddDelightModal target={this.state.addModalTarget} />
        ) : (
          ''
        )}

        <DelightList
          name="To taste"
          isPath={true}
          delights={this.state.pathDelights}
          onSelect={this.onPathSelect}
          onAdd={this.onPathAdd}
          onDelete={this.onPathDelete}
          onDrag={this.onPathDrag}
        />

        <div className="ui divider"></div>

        <DelightList
          name="The buffet"
          isPath={false}
          delights={this.state.poolDelights}
          onSelect={this.onPoolSelect}
          onAdd={this.onPoolAdd}
          onDelete={this.onPoolDelete}
          onDrag={this.onPoolDrag}
        />
      </div>
    );
  }
}

export default App;
