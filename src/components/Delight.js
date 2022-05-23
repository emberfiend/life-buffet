import React, { useState, useEffect } from 'react';

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

  const hasTargetTag = delight.tags.reduce((state, next) => {
    return state || next.includes(targetTag);
  }, false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // TODO: optimize by skipping this if the delight is off-screen
  useEffect(() => {
    const intervalId = setInterval(() => {
      //console.log('image update, currentIndex is ' + currentImageIndex);
      if (currentImageIndex === delight.imageUrls.length - 1) {
        setCurrentImageIndex(0);
      } else {
        //console.log(`calling setCII with ${currentImageIndex + 1}`);
        setCurrentImageIndex(currentImageIndex + 1);
      }
    }, 2500 + getRandomInt(10000));

    return () => clearInterval(intervalId);
  }); // empty array omitted here - we want a re-run at every render

  /*const hasOwnTag = delight.tags.reduce((state, next) => {
    return state || next.includes(ownTag);
  }, false);*/

  const isNotEmpty = ownTag.length > 0 ? true : false;
  const isRemovable =
    isNotEmpty && delight.tags.filter((t) => t == ownTag).length > 0;

  return (
    <div className="card" style={{ maxWidth: '30%' }}>
      <img
        alt={delight.name}
        className="ui image"
        src={delight.imageUrls[currentImageIndex]}
        width="100%"
        height="100px"
        style={{ objectFit: 'cover' }}
      />
      <div className="content">
        <div className="align-center" style={{ marginBottom: '0.8em' }}>
          <i
            onClick={() => onEditStart(ownTag, delight)}
            className="edit icon"
            style={{ cursor: 'pointer' }}
          ></i>
          <i
            onClick={() => onSelect(delight)}
            className={!hasTargetTag ? `plus icon` : ''}
            style={{ cursor: 'pointer' }}
          ></i>
          <i
            onClick={() => onUntag(delight)}
            className={isRemovable ? `minus icon` : ``}
            style={{ cursor: 'pointer' }}
          ></i>
          <i
            onClick={() => onDelete(delight)}
            className="trash icon"
            style={{ cursor: 'pointer' }}
          ></i>
        </div>

        <div className="header">{delight.name}</div>

        <div>{delight.description}</div>
        <div className="smaller-text">Tags: {renderedTags}</div>
      </div>
    </div>
  );
};

export default Delight;
