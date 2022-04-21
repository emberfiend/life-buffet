import React from 'react';

const Delight = ({ delight, onSelect, onDelete, onDrag }) => {
  // delight: name, description, imageUrl, tags

  const renderedTags = delight.tags.map((tag) => {
    return <span key={tag}>{tag} </span>;
  });

  return (
    <div className="card">
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
        <i onClick={() => onSelect(delight)} className="plus icon"></i>
        <i onClick={() => onDelete(delight)} className="trash icon"></i>
      </div>
    </div>
  );
};

export default Delight;
