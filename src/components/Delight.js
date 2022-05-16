import React from 'react';

const Delight = ({
  delight,
  ownTag,
  targetTag,
  onSelect,
  onEditStart,
  onUntag,
  onDelete,
  onDrag,
}) => {
  // delight: name, description, imageUrls[], tags[]

  const renderedTags = delight.tags.map((tag) => {
    return <span key={tag}>{tag} </span>;
  });

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const randomImageUrl =
    delight.imageUrls[getRandomInt(delight.imageUrls.length)];

  const hasTargetTag = delight.tags.reduce((state, next) => {
    return state || next.includes(targetTag);
  }, false);

  /*const hasOwnTag = delight.tags.reduce((state, next) => {
    return state || next.includes(ownTag);
  }, false);*/

  const isNotEmpty = ownTag.length > 0 ? true : false;
  const isRemovable =
    isNotEmpty && delight.tags.filter((t) => t == ownTag).length > 0;

  return (
    <div className="card">
      <img
        alt={delight.name}
        className="ui image"
        src={randomImageUrl}
        width="100%"
        height="100px"
        style={{ objectFit: 'cover' }}
      />
      <div className="content">
        <div className="ui grid">
          <div className="nine wide column">
            <div className="header">{delight.name}</div>
          </div>
          <div className="one wide column">
            <i
              onClick={() => onEditStart(ownTag, delight)}
              className="edit icon"
            ></i>
          </div>
          <div className="one wide column">
            <i
              onClick={() => onSelect(delight)}
              className={!hasTargetTag ? `plus icon` : ''}
            ></i>
          </div>
          <div className="one wide column">
            <i
              onClick={() => onUntag(delight)}
              className={isRemovable ? `minus icon` : ``}
            ></i>
          </div>
          <div className="one wide column">
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
