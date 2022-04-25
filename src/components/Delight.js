import React from 'react';

const Delight = ({
  delight,
  ownTag,
  targetTag,
  onSelect,
  onUntag,
  onDelete,
  onDrag,
}) => {
  // delight: name, description, imageUrl, tags

  const renderedTags = delight.tags.map((tag) => {
    return <span key={tag}>{tag} </span>;
  });

  const hasTargetTag = delight.tags.reduce((state, next) => {
    return state || next.includes(targetTag);
  }, false);

  const isNotEmpty = ownTag.length > 0 ? true : false;
  const isRemovable =
    isNotEmpty && delight.tags.filter((t) => t == ownTag).length > 0;

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
          <div className="nine wide column">
            <div className="header">{delight.name}</div>
          </div>
          <div className="two wide column">
            <i
              onClick={() => onSelect(delight)}
              className={!hasTargetTag ? `plus icon` : ''}
            ></i>
          </div>
          <div className="two wide column">
            <i
              onClick={() => onUntag(delight)}
              className={isRemovable ? `minus icon` : ``}
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
