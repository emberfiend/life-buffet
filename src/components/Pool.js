import React, { useState, useEffect, useLayoutEffect } from 'react';
import Delight from './Delight';

const Pool = ({ delights, onDelightSelect }) => {
  const [term, setTerm] = useState('');
  const [filteredDelights, setFilteredDelights] = useState([]);

  useEffect(() => {
    //setTerm('');
    console.log('boop');
    console.log(delights);
  }, []);

  useEffect(() => {
    setFilteredDelights(
      delights.filter((d) => {
        if (
          d.name.toLowerCase().includes(term.toLowerCase()) ||
          d.description.toLowerCase().includes(term.toLowerCase())
        ) {
          return true;
        } else {
          return d.tags.reduce((state, next) => {
            return state || next.includes(term);
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
