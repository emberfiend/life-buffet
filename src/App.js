import React from 'react';
import './style.css';

class App extends React.Component {
  state = { pool: [], path: [] };

  // const user = JSON.parse(localStorage.getItem('user'));
  // localStorage.setItem('user', JSON.stringify({ name: 'Felix' }));

  componentDidMount() {
    const loadedPool = JSON.parse(localStorage.getItem('pool'));
    if (loadedPool.length == 0) {
      console.log('a');
      this.populateNewPool();
    } else {
      console.log('b');
      this.setState({ pool: loadedPool });
    }
  }

  populateNewPool = () => {
    const newPool = [
      {
        name: 'Draw',
        description: 'Put lines on paper using lead!',
        imageAnchor:
          "<a id='bnjhGnVERRxnEe1by7BYcg' class='gie-single' href='http://www.gettyimages.com/detail/1249850687' target='_blank' style='color:#a7a7a7;text-decoration:none;font-weight:normal !important;border:none;display:inline-block;'>Embed from Getty Images</a><script>window.gie=window.gie||function(c){(gie.q=gie.q||[]).push(c)};gie(function(){gie.widgets.load({id:'bnjhGnVERRxnEe1by7BYcg',sig:'XApUJcMMCw7ny7ZYAmnnWno7ibWhQDDzQz5-4Jmdat4=',w:'300px',h:'300px',items:'1249850687',caption: true ,tld:'com',is360: false })});</script><script src='//embed-cdn.gettyimages.com/widgets.js' charset='utf-8' async></script>",
        tags: ['indoors', 'outdoors', 'creative', 'cheap'],
      },
      {
        name: 'Skateboard',
        description: 'Ride your sweet chrome into the sunset!',
        imageAnchor:
          "<a id='bnjhGnVERRxnEe1by7BYcg' class='gie-single' href='http://www.gettyimages.com/detail/1249850687' target='_blank' style='color:#a7a7a7;text-decoration:none;font-weight:normal !important;border:none;display:inline-block;'>Embed from Getty Images</a><script>window.gie=window.gie||function(c){(gie.q=gie.q||[]).push(c)};gie(function(){gie.widgets.load({id:'bnjhGnVERRxnEe1by7BYcg',sig:'XApUJcMMCw7ny7ZYAmnnWno7ibWhQDDzQz5-4Jmdat4=',w:'300px',h:'300px',items:'1249850687',caption: true ,tld:'com',is360: false })});</script><script src='//embed-cdn.gettyimages.com/widgets.js' charset='utf-8' async></script>",
        tags: ['outdoors', 'skill', 'risk-moderate'],
      },
    ];
    this.setState({
      pool: newPool,
    });
    localStorage.setItem('pool', JSON.stringify(newPool));
  };

  // invoking this just after changing state doesn't work - something about lifecycle
  saveToLocalStorage = () => {
    localStorage.setItem('pool', JSON.stringify(this.state.pool));
    localStorage.setItem('path', JSON.stringify(this.state.path));
  };

  onDelightAdd = (delight) => {};

  render() {
    return (
      <div>
        <h1>Hello StackBlitz!</h1>
        <p>Start editiaaang to see some magic happen :)</p>
      </div>
    );
  }
}

export default App;
