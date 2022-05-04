import React from 'react';

const EditDelightModal = ({ editModalTarget, onNameChange, onDescriptionChange, onImageUrlChange, onEditEnd }) => {
  // editModalTarget MAY already be a delight; prefill fields if it is
  // retain the edit-in-progress in the editModalTarget object, can save it to localStorage even
  // but when it comes to actually committing it to the main pool, be careful with name collisions

  // editModalTarget.hasOwnProperty('name')
  // should sanity check this
  console.log(editModalTarget);
  const editMode = editModalTarget.name.length > 0;

  var renderedTags = editModalTarget.tags.map((t) => {
    return (
      <div class="item">
        <div class="content">
          {t}
        </div>
      </div>
    );
  });

  return (
    <div className="ui active modal">
      <div class="header">
        {editMode ? 'Edit' : 'Add'} Delight
      </div>
      <form className="ui form">
        <div className="ui segment">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name your delight. Must be unique!"
              value={editModalTarget.name}
              onChange={(e) => onNameChange(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Describe your delight."
              defaultValue={editModalTarget.description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Image URL</label>
            <input
              type="text"
              name="imageurl"
              placeholder="Give an image URL. No hotlinking! Only files you host."
              defaultValue={editModalTarget.imageUrl}
              onChange={(e) => onImageUrlChange(e.target.value)}
            />
          </div>
          <div className="eight wide field">
            <label>Tags</label>
            <input
              type="text"
              name="tags"
              placeholder="Add tags for your delight. Tags help discoverability!"
              defaultValue="" 
              onChange={}
            />
          </div>
          <div class="eight wide ui mini horizontal divided list">
            {renderedTags}
          </div>
        </div>
      </form>
      <div class="actions">
        <div class="ui approve button" onClick={() => onEditEnd(true)}>
          Save
        </div>
        <div class="ui cancel button" onClick={() => onEditEnd(false)}>
          Cancel
        </div>
      </div>
    </div>
  );
};

export default EditDelightModal;
