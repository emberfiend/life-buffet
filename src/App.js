import React from 'react';
import './style.css';

class App extends React.Component {
  state = { delights: [], selectedDelights: [] };

  createInitialDelights = () => {
    
  };

  onDelightAdd = (delight) => {};

  render() {
    return (
      <div>
        <h1>Hello StackBlitz!</h1>
        <p>Start editiang to see some magic happen :)</p>
      </div>
    );
  }
}

export default App;
