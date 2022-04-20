import React, { useState, useEffect } from 'react';
import Delight from './Delight';

const Pool = ({ delights, onDelightSelect }) => {
  const [term, setTerm] = useState('');
  const [filteredDelights, setFilteredDelights] = useState([]);

  useEffect(() => {
    setFilteredDelights(
      delights.filter((d) => {
        if (
          d.name.toLowerCase().includes(term.toLowerCase()) ||
          d.description.toLowerCase().includes(term.toLowerCase()) ||
          d.tags.includes(term.toLowerCase())
        ) {
          return true;
        } else {
          return d.tags.reduce((prev, curr) => {
            prev || curr.includes(term), false;
          });
        }
      })
    );
    console.log(filteredDelights);
  }, [term]);

  const onTermSubmit = (e) => {
    e.preventDefault();
  };

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
      <h1>Deliaghts</h1>
      <form onSubmit={onTermSubmit} className="ui form">
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
