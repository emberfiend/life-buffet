import React, { useState, useEffect } from 'react';
import Delight from './Delight';

const DelightList = ({
  name,
  term,
  onTermChange,
  targetTag,
  delights,
  onSelect,
  onAdd,
  onUntag,
  onDelete,
  onDrag,
}) => {
  //const [term, setTerm] = useState(defaultFilter);
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
  }, [term, delights]); // needs to watch delights too, to refilter when it changes

  const onUntagHelper = (delight) => {
    onUntag(delight, term);
  };

  const renderedDelights = filteredDelights.map((delight) => {
    return (
      <Delight
        key={delight.name}
        delight={delight}
        ownTag={term}
        targetTag={targetTag}
        onSelect={onSelect}
        onUntag={onUntagHelper}
        onDelete={onDelete}
        onDrag={onDrag}
      />
    );
  });

  return (
    <React.Fragment>
      <h1>{name}</h1>
      <form className="ui form">
        <div className="fields">
          <div className="fourteen wide field">
            <input
              type="text"
              value={term}
              onChange={(e) => onTermChange(e.target.value)}
            />
          </div>
          <div className="two wide ui button" onClick={() => onAdd(term)}>
            Add
          </div>
        </div>
      </form>
      <div className="ui cards">{renderedDelights}</div>
    </React.Fragment>
  );
};

export default DelightList;
