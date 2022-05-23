import React from 'react';
import { saveTemplateAsFile } from './utility';
import basicDelights from './basic-delights.json';
import './style.css';

import DelightList from './components/DelightList';
import EditDelightModal from './components/EditDelightModal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poolDelights: this.loadPool(),
      importedDelights: [],
      editModalShow: false,
      editModalTarget: this.makeFreshDelight(),
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
    //localStorage.setItem('path', JSON.stringify(this.state.pathDelights));
  };

  loadPool = () => {
    if (localStorage.getItem('pool') === null) {
      console.log('No pool in localstorage - generating items');
      const newPool = basicDelights;
      localStorage.setItem('pool', JSON.stringify(newPool));
      return newPool;
    } else {
      console.log('Loading pool from localstorage');
      return JSON.parse(localStorage.getItem('pool'));
    }
  };

  // see https://en.wikipedia.org/wiki/JSDoc

  /**
   * Creates a fresh delight.
   *
   * @param {string} term Optionally defines a term to be added to the tag list upon creation.
   * @return {Object} The freshly-made Delight.
   */
  makeFreshDelight(term) {
    return {
      name: '',
      description: '',
      imageUrls: [],
      tags: [term == undefined ? '' : term],
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

  // ### EditDelightModal functions ###

  // TODO: refactor these - there must be a way to at least inline the update function
  onNameChange = (name) => {
    console.log('onNameChange');

    function updateDelightName(d, newName) {
      d.name = newName;
      return d;
    }

    this.setState((prevState) => ({
      editModalTarget: updateDelightName(prevState.editModalTarget, name),
    }));
  };

  onDescriptionChange = (description) => {
    console.log('onDescriptionChange');

    function updateDelightDescription(d, newDescription) {
      d.description = newDescription;
      return d;
    }

    this.setState((prevState) => ({
      editModalTarget: updateDelightDescription(
        prevState.editModalTarget,
        description
      ),
    }));
  };

  onTagAdd = (tag) => {
    console.log('onTagAdd');

    function addTagIfAbsent(delight, tag) {
      const tagExists = delight.tags.reduce((state, next) => {
        return state || next === tag;
      }, false);

      if (!tagExists) {
        delight.tags.push(tag);
      }
      return delight;
    }

    this.setState((prevState) => ({
      editModalTarget: addTagIfAbsent(prevState.editModalTarget, tag),
    }));
  };

  onTagDelete = (tag) => {
    console.log('onTagDelete');

    function filterTag(delight, tag) {
      delight.tags = delight.tags.filter((u) => u !== tag);
      return delight;
    }

    this.setState((prevState) => ({
      editModalTarget: filterTag(prevState.editModalTarget, tag),
    }));
  };

  onImageUrlAdd = (imageUrl) => {
    console.log('onImageUrlAdd');

    function addImageUrlIfAbsent(delight, newImageUrl) {
      const imageUrlExists = delight.imageUrls.reduce((state, next) => {
        return state || next === newImageUrl;
      }, false);

      if (!imageUrlExists) {
        delight.imageUrls.push(newImageUrl);
      }
      return delight;
    }

    this.setState((prevState) => ({
      editModalTarget: addImageUrlIfAbsent(prevState.editModalTarget, imageUrl),
    }));
  };

  onImageUrlDelete = (imageUrl) => {
    console.log('onImageUrlDelete');

    function filterUrl(delight, imageUrl) {
      delight.imageUrls = delight.imageUrls.filter((u) => u !== imageUrl);
      return delight;
    }

    this.setState((prevState) => ({
      editModalTarget: filterUrl(prevState.editModalTarget, imageUrl),
    }));
  };

  onEditStart = (term, delight) => {
    // this invokes the edit modal, pre-filling fields if we're editing an existing one
    // editModalNew, editModalIndex

    console.log('onEditStart');

    if (delight != null) {
      const targetDelightIndex = this.state.poolDelights.findIndex(
        (d) => d.name == delight.name
      );

      console.log(`Editing existing delight at index ${targetDelightIndex}`);

      this.setState({
        // need to edit a copy to allow cancelling - spread { ...delight } was almost good enough, but it was retaining references to the old tag and imageUrl arrays
        editModalTarget: structuredClone(delight),
        editModalIndex: targetDelightIndex,
      });
    } else {
      console.log('Editing new delight');
      this.setState({
        editModalTarget: this.makeFreshDelight(term), // already happens
        editModalIndex: -1,
      });
    }
    this.setState({ editModalShow: true });
  };

  // BUG: a newly-added tag or imageUrl is saved to the edited delight, even if you cancel out (onEditEnd(false)) of the edit dialogue
  // possibly related to localStorage save/load?

  onEditEnd = (save) => {
    // dismiss the modal and call the function which actually adds it

    console.log(`onEditEnd with save state ${save}`);

    if (save) {
      // careful here: can't refer to (normal) state because of where it's being used
      function spliceIntoOrAppendToArray(oldDelights, newDelight, index) {
        var newArray = [...oldDelights]; // TODO: not a deep copy - think about consequences
        if (index > -1) {
          console.log(`Splicing into pool delights at ${index}`);
          newArray.splice(index, 1, newDelight);
        } else {
          if (!oldDelights.some((d) => d.name === newDelight.name)) {
            console.log('Absent from pool delights, appending to array');
            newArray.push(newDelight);
          }
        }
        return newArray;
      }

      this.setState((prevState) => ({
        poolDelights: spliceIntoOrAppendToArray(
          prevState.poolDelights,
          prevState.editModalTarget,
          prevState.editModalIndex
        ),
      }));
    }

    this.setState({ editModalShow: false });
  };

  // ### data management functions ###

  onImportOverwrite = () => {
    this.onImport(true);
  };

  onImportWithoutOverwrite = () => {
    this.onImport(false);
  };

  // overwrite: determines whether name-matched delights will have their contents overwritten
  onImport = (overwrite) => {
    function appendNewItemsToArray(oldDelights, importedDelights, overwrite) {
      /*var newArray = [...oldDelights];
      if (index > -1) {
        console.log(`Splicing into pool delights at ${index}`);
        newArray.splice(index, 1, newDelight);
      } else {
        if (!oldDelights.some((d) => d.name === newDelight.name)) {
          console.log('Absent from pool delights, appending to array');
          newArray.push(newDelight);
        }
      }
      return newArray;*/

      //console.log(oldDelights);
      //console.log(importedDelights);
      //console.log(importedDelights[0]);
      //console.log(importedDelights[1]);

      var newArray = structuredClone(oldDelights);
      if (importedDelights.length > 0) {
        // TODO: something more rock n roll than a for loop
        for (var i = 0; i < importedDelights.length; i++) {
          const importedDelight = importedDelights[i];
          //console.log(importedDelight);
          const exists = newArray.some((d) => d.name === importedDelight.name);
          if (!exists) {
            newArray.push(importedDelight);
          } else if (overwrite) {
            newArray[
              newArray.findIndex((d) => d.name === importedDelight.name)
            ] = importedDelight;
          }
        }
      }
      return newArray;
    }

    this.setState((prevState) => ({
      poolDelights: appendNewItemsToArray(
        prevState.poolDelights,
        prevState.importedDelights,
        overwrite
      ),
    }));
  };

  onImportField = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = (e) => {
      //console.log('e.target.result', e.target.result);
      //console.log(JSON.parse(e.target.result));
      this.setState({ importedDelights: JSON.parse(e.target.result) });
    };
  };

  onExport = () => {
    saveTemplateAsFile('delights.json', this.state.poolDelights);
  };

  onSortAZ = () => {
    function sortDelights(unsortedDelights) {
      const unsortedDelightsClone = structuredClone(unsortedDelights);
      unsortedDelightsClone.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      return unsortedDelightsClone;
    }

    this.setState((prevState) => ({
      poolDelights: sortDelights(prevState.poolDelights),
    }));
  };

  render() {
    return (
      <div>
        {this.state.editModalShow ? (
          <EditDelightModal
            editModalTarget={this.state.editModalTarget}
            onNameChange={this.onNameChange}
            onDescriptionChange={this.onDescriptionChange}
            onTagAdd={this.onTagAdd}
            onTagDelete={this.onTagDelete}
            onImageUrlAdd={this.onImageUrlAdd}
            onImageUrlDelete={this.onImageUrlDelete}
            onEditEnd={this.onEditEnd}
          />
        ) : (
          ''
        )}
        <div className="ui text container" style={{ minWidth: '95%' }}>
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
          <div>
            <div className="align-center" style={{ padding: '0.5em 1em' }}>
              <div className="two wide ui button" onClick={this.onSortAZ}>
                Sort A-Z
              </div>
            </div>
            <div className="align-center" style={{ padding: '0.5em 1em' }}>
              <input type="file" onChange={this.onImportField} />
              <div
                className="two wide ui button"
                onClick={this.onImportWithoutOverwrite}
              >
                Import
              </div>
              <div
                className="two wide ui button"
                onClick={this.onImportOverwrite}
              >
                Import and overwrite
              </div>
            </div>
            <div className="align-center" style={{ padding: '0.5em 1em' }}>
              <div className="two wide ui button" onClick={this.onExport}>
                Export
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
