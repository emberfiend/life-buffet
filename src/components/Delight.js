import React from 'react';

const Delight = ({ delight, isPath, onSelect, onDelete, onDrag }) => {
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
        <div className="ui grid">
          <div className="eleven wide column">
            <div className="header">{delight.name}</div>
          </div>
          <div className="two wide column">
            <i
              onClick={() => onSelect(delight)}
              className={!isPath ? `plus icon` : ''}
            ></i>
          </div>
          <div className="two wide column">
            <i onClick={() => onDelete(delight)} className="trash icon"></i>
          </div>
        </div>
        <div>{delight.description}</div>
        <div>Tags: {renderedTags}</div>
      </div>
    </div>
  );
};

export default Delight;
