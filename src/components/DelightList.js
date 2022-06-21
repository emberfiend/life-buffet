import React, { useState, useEffect } from 'react';
import Delight from './Delight';

const DelightList = ({
  name,
  term,
  onTermChange,
  targetTag,
  delights,
  onSelect,
  onEditStart,
  onUntag,
  onDelete,
  onDrag,
}) => {
  //const [term, setTerm] = useState(defaultFilter);
  const [filteredDelights, setFilteredDelights] = useState([]);

  console.log('term is ' + term);

  useEffect(() => {
    let newDelights = delights; // structuredClone(delights);
    let terms = term.toLowerCase().split(',');

    for (var i = 0; i < terms.length; i++) {
      newDelights = newDelights.filter((d) => {
        let thisTerm = terms[i].trim();
        let negated = false;

        if (thisTerm.length > 1 && thisTerm[0] == '!') {
          negated = true;
          thisTerm = thisTerm.substring(1, thisTerm.length);
        } else if (
          thisTerm.length > 4 &&
          thisTerm.substring(0, 4).toLowerCase() == 'not '
        ) {
          negated = true;
          thisTerm = thisTerm.substring(4, thisTerm.length);
        }

        function checkPresence(searchTerm) {
          if (
            d.name.toLowerCase().includes(searchTerm) ||
            d.description.toLowerCase().includes(searchTerm)
          ) {
            return true;
          } else {
            return d.tags.reduce((state, next) => {
              return state || next.includes(searchTerm);
            }, false);
          }
        }

        let result = checkPresence(thisTerm);
        return negated ? !result : result;
      });
    }

    setFilteredDelights(newDelights);
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
        onEditStart={onEditStart}
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
              placeholder="Search for one or more terms. Use 'not' to exclude terms. Eg: 'creative, not risky, can-be-solo'"
              onChange={(e) => onTermChange(e.target.value)}
            />
          </div>
          <div
            className="two wide ui button"
            onClick={() => onEditStart(term, null)}
          >
            Add
          </div>
        </div>
      </form>
      <div className="ui cards">{renderedDelights}</div>
    </React.Fragment>
  );
};

export default DelightList;
