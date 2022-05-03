import React from 'react';
import './style.css';

import DelightList from './components/DelightList';
import EditDelightModal from './components/EditDelightModal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poolDelights: this.loadPool(),
      editModalShow: false,
      editModalTarget: this.makeEmptyDelight(),
      editModalIndex: -1,
      termOne: 'to-taste',
      termTwo: '',
    };
  }

  componentDidMount() {
    // ..
  }

  componentDidUpdate(prevProps) {
    // you're supposed to compare props in here? hmm
    // is there a useEffect-like way to watch state from a class-based component, instead of doing it blindly like this?

    // TODO: avoid running this for simple term changes
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

  makeEmptyDelight() {
    return {
      name: '',
      description: '',
      imageUrl: '',
      tags: [''],
    };
  }

  onSelect = (delight) => {
    console.log(`Delight ${delight.name} clicked for selection.`);

    // of the two terms currently being filtered for, add the one that's missing to the item
    // ..but not if it's an empty string

    const tagOneExists = delight.tags.reduce((state, next) => {
      return state || next.includes(this.state.termOne);
    }, false);

    const tagTwoExists = delight.tags.reduce((state, next) => {
      return state || next.includes(this.state.termTwo);
    }, false);

    const termToAdd =
      !tagOneExists && this.state.termOne != ''
        ? this.state.termOne
        : !tagTwoExists && this.state.termTwo != ''
        ? this.state.termTwo
        : '';

    if (termToAdd != '') {
      const delightIndex = this.state.poolDelights.findIndex(
        (d) => d.name === delight.name
      );

      delight.tags.push(termToAdd);

      function spliceArray(array) {
        var newArray = [...array];
        newArray.splice(delightIndex, 1, delight);
        return newArray;
      }

      this.setState((prevState) => ({
        poolDelights: spliceArray(prevState.poolDelights),
      }));
    }
  };

  onEditStart = (term, delight) => {
    // this invokes the edit modal, pre-filling fields if we're editing an existing one
    // editModalNew, editModalIndex

    console.log(delight);

    //check if delight is null!!!

    const targetDelightIndex = this.state.poolDelights.findIndex(
      (d) => d.name == delight.name
    );

    if (targetDelightIndex > -1) {
      console.log(`index of current delight is ${targetDelightIndex}`);
      this.setState({
        editModalTarget: delight,
        editModalIndex: targetDelightIndex,
      });
    } else {
      this.setState({
        editModalTarget: this.makeEmptyDelight(),
        editModalIndex: -1,
      });
    }
    this.setState({ editModalShow: true });
  };

  onEditEnd = (save) => {
    // dismiss the modal and call the function which actually adds it
    // untested!

    console.log(`onEditEnd with save state ${save}`);

    if (save) {
      // poolDelights[editModalIndex] = editModalTarget

      function spliceArray(oldDelights, newDelight) {
        var newArray = [...oldDelights];
        if (editModalIndex > -1) {
          console.log(`Splicing into pool delights at ${editModalIndex}`);
          newArray.splice(this.state.editModalIndex, 1, newDelight);
        } else {
          if (
            !this.state.poolDelights.some((d) => d.name === newDelight.name)
          ) {
            console.log('Absent from pool delights, appending to array');
            newArray.push(newDelight);
          }
        }
        return newArray;
      }

      this.setState((prevState) => ({
        poolDelights: spliceArray(prevState.poolDelights, editModalTarget),
      }));
    }

    this.setState({ editModalShow: false });
  };

  onNameChange = (name) => {
    console.log('onNameChange');

    function updateDelightName(d, newName) {
      var newDelight = d;
      newDelight.name = newName;
      return newDelight;
    }

    this.setState((prevState) => ({
      editModalTarget: updateDelightName(prevState.editModalTarget, name),
    }));
  };

  /*onAdd = (term, delight) => {
    // this should auto-add the filter term as a tag, if present

    console.log(
      `Item clicked for addition from section with term ${term} (using dummy delight for now).`
    );
    const newDelight = {
      name: 'Dummy',
      description: 'Test',
      imageUrl: 'https://andrewbackhouse.com/res/reeds.jpg',
      tags: ['test', 'test2'],
    };

    if (term.length > 0) {
      if (
        !newDelight.tags.reduce((state, next) => {
          return state || next.includes(term);
        }, false)
      ) {
        newDelight.tags.push(term);
      }
    }

    if (!this.state.poolDelights.some((d) => d.name === newDelight.name)) {
      console.log('Absent from pool delights');

      this.setState((prevState) => ({
        poolDelights: [...prevState.poolDelights, newDelight],
      }));
    }
  };*/

  onUntag = (delight, term) => {
    console.log(`Delight ${delight.name} clicked for ${term} tag removal.`);

    // TODO: refactor this bit, some redundancy
    //  & think about the term == foundTag check

    const tagExists = delight.tags.reduce((state, next) => {
      return state || next.includes(term);
    }, false);

    const foundTag = delight.tags.filter((t) => t.includes(term));

    if (tagExists && term.length > 0 && term == foundTag) {
      const delightIndex = this.state.poolDelights.findIndex(
        (d) => d.name === delight.name
      );

      const tagIndex = delight.tags.findIndex((t) => t == term);
      delight.tags.splice(tagIndex, 1);

      function spliceArray(delights) {
        var newArray = [...delights];
        newArray.splice(delightIndex, 1, delight);
        return newArray;
      }

      this.setState((prevState) => ({
        poolDelights: spliceArray(prevState.poolDelights),
      }));
    }

    // keeping this for actual deletion (from edit modal)
    /*this.setState((prevState) => ({
      poolDelights: prevState.poolDelights.filter((d) => d !== delight),
    }));*/
  };

  onDelete = (delight) => {
    this.setState((prevState) => ({
      poolDelights: prevState.poolDelights.filter((d) => d !== delight),
    }));
  };

  onTermChangeOne = (term) => {
    console.log('onTermChangeOne, term is ' + term);
    this.setState({ termOne: term });
  };

  onTermChangeTwo = (term) => {
    console.log('onTermChangeTwo, term is ' + term);
    this.setState({ termTwo: term });
  };

  render() {
    return (
      <div>
        {this.state.editModalShow ? (
          <EditDelightModal
            editModalTarget={this.state.editModalTarget}
            onNameChange={this.onNameChange}
            onEditEnd={this.onEditEnd}
          />
        ) : (
          ''
        )}
        <div className="ui raised very padded text container segment">
          <DelightList
            name="To taste"
            term={this.state.termOne}
            onTermChange={this.onTermChangeOne}
            targetTag={this.state.termTwo}
            delights={this.state.poolDelights}
            onSelect={this.onSelect}
            onEditStart={this.onEditStart}
            onUntag={this.onUntag}
            onDelete={this.onDelete}
            onDrag={this.onPathDrag}
          />

          <div className="ui divider"></div>

          <DelightList
            name="The buffet"
            term={this.state.termTwo}
            onTermChange={this.onTermChangeTwo}
            targetTag={this.state.termOne}
            delights={this.state.poolDelights}
            onSelect={this.onSelect}
            onEditStart={this.onEditStart}
            onUntag={this.onUntag}
            onDelete={this.onDelete}
            onDrag={this.onPoolDrag}
          />
        </div>
      </div>
    );
  }
}

export default App;
