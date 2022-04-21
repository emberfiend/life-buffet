import React, { useState, useEffect } from 'react';
import Delight from './Delight';

const DelightList = ({ name, delights, onSelect, onAdd, onDelete, onDrag }) => {
  const [term, setTerm] = useState('');
  const [filteredDelights, setFilteredDelights] = useState([]);

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
  }, [term]);

  const renderedDelights = filteredDelights.map((delight) => {
    return (
      <Delight
        key={delight.name}
        delight={delight}
        onSelect={onSelect}
        onDelete={onDelete}
        onDrag={onDrag}
      />
    );
  });

  return (
    <React.Fragment>
      <h1>{name}</h1>
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

export default DelightList;
