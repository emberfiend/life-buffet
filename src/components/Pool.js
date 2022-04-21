import React, { useState, useEffect, useLayoutEffect } from 'react';
import Delight from './Delight';

const Pool = ({ delights, onDelightSelect }) => {
  const [term, setTerm] = useState('');
  const [filteredDelights, setFilteredDelights] = useState([]); //() => [...delights]

  // OK, rubber duck time. I getting content in delights only on the second render due to setState in componentDidMount in App. (I can't figure out how to send it through on the first render because I can't run loadPool (in App) while setting poolDelights' default value.) this means that Pool > useEffect [] has no access to it (only fires on the first render). setFilteredDelights is only happening when term changes (via useEffect). what do. 
  // solution: turns out if you break out the constructor() it'll let you call methods from that. woop!

  console.log('Pool > delights');
  console.log(delights);
  console.log('Pool > filteredDelights');
  console.log(filteredDelights);

  /*useEffect(() => {
    console.log('Pool > useEffect [] > delights');
    console.log(delights);
  }, []);*/

  useEffect(() => {
    setFilteredDelights(
      delights.filter((d) => {
        const lowerTerm = term.toLowerCase();
        if (
          d.name.toLowerCase().includes(lowerTerm) ||
          d.description.toLowerCase().includes(lowerTerm)
        ) {
          return true;
        } else {
          return d.tags.reduce((state, next) => {
            return state || next.includes(lowerTerm);
          }, false);
        }
      })
    );
    //console.log(filteredDelights);
  }, [term]);

  if (filteredDelights.length == 0) {
    //setFilteredDelights(delights);
  }
  // this syntax works?? so this gets the initial render working, but any time the array filters down to zero it just goes back to the full list
  //const renderedDelights = (filteredDelights.length > 0 ? filteredDelights : delights).map((delight) => {

  //console.log(filteredDelights);
  const renderedDelights = filteredDelights.map((delight) => {
    return (
      <Delight
        key={delight.name}
        onDelightSelect={onDelightSelect}
        delight={delight}
      />
    );
  });

  return (
    <React.Fragment>
      <h1>Delights</h1>
      <form className="ui form">
        <div className="field">
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </form>
      <div className="ui cards">{renderedDelights}</div>
    </React.Fragment>
  );
};

export default Pool;
