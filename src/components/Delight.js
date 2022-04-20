import React from 'react';

const Delight = ({ key, onDelightSelect, delight }) => {
  // delight: name, description, imageUrl, tags

  const renderedTags = delight.tags.map((tag) => {
    return <span>{tag} </span>;
  });

  return (
    <div onClick={() => onDelightSelect(delight)} className="card">
      <img
        alt={delight.name}
        className="ui image"
        src={delight.imageUrl}
        width="100%"
        height="100px"
      />
      <div className="content">
        <div className="header">{delight.name}</div>
        <div>{delight.description}</div>
        <div>Tags: {renderedTags}</div>
      </div>
    </div>
  );
};

export default Delight;
