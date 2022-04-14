import React from 'react';
import Delight from './Delight';

const Pool = ({ delights, onDelightSelect }) => {
  //console.log(delights);

  const renderedDelights = delights.map((delight) => {
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
      <h1>Delight pool</h1>
      <div className="ui relaxed divided list">{renderedDelights}</div>
    </React.Fragment>
  );
};

export default Pool;
