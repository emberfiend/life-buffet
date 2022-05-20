import React, { useState } from 'react';

const EditDelightModal = ({
  editModalTarget,
  onNameChange,
  onDescriptionChange,
  onTagAdd,
  onTagDelete,
  onImageUrlAdd,
  onImageUrlDelete,
  onEditEnd,
}) => {
  // editModalTarget MAY already be a delight; prefill fields if it is
  // retain the edit-in-progress in the editModalTarget object, can save it to localStorage even
  // but when it comes to actually committing it to the main pool, be careful with name collisions

  // editModalTarget.hasOwnProperty('name')
  // should sanity check this
  console.log(editModalTarget);
  const editMode = editModalTarget.name.length > 0;

  const [newImageUrl, setNewImageUrl] = useState('');

  const onNewImageUrlChange = (imageUrl) => {
    setNewImageUrl(imageUrl);
  };

  const [newTag, setNewTag] = useState('');

  const onNewTagChange = (tag) => {
    setNewTag(tag);
  };

  var renderedTags = editModalTarget.tags.map((t) => {
    return (
      <div class="item">
        <div class="content">
          {t}{' '}
          <i
            onClick={() => onTagDelete(t)}
            className="trash icon"
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
      </div>
    );
  });

  var renderedImageUrls = editModalTarget.imageUrls.map((iu) => {
    return (
      <div class="item">
        <div class="content">
          {iu} &nbsp;
          <a href={iu} target="_blank">
            <i className="clone icon"></i>
          </a>
          <i
            onClick={() => onImageUrlDelete(iu)}
            className="trash icon"
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
      </div>
    );
  });

  return (
    <div className="ui active modal">
      <div class="header">{editMode ? 'Edit' : 'Add'} Delight</div>
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
            <label>Image URLs</label>
            <div className="fields">
              <div className="fourteen wide field">
                <input
                  type="text"
                  name="imageurls"
                  placeholder="Add one or more image URLs. No hotlinking! Only files you or lifebuffet hosts."
                  defaultValue={newImageUrl}
                  onChange={(e) => onNewImageUrlChange(e.target.value)}
                />
              </div>
              <div className="two wide">
                <div
                  className="ui button"
                  onClick={() => onImageUrlAdd(newImageUrl)}
                >
                  Add
                </div>
              </div>
            </div>
          </div>
          <div class="ui mini vertical divided list">{renderedImageUrls}</div>
          <div className="field">
            <label>Tags</label>
            <div className="fields">
              <div className="six wide field">
                <input
                  type="text"
                  name="tags"
                  placeholder="Add tags for your delight. Tags help discoverability!"
                  defaultValue={newTag}
                  onChange={(e) => onNewTagChange(e.target.value)}
                />
              </div>
              <div
                className="two wide ui button"
                onClick={() => onTagAdd(newTag)}
              >
                Add
              </div>
              <div class="eight wide ui mini horizontal divided list">
                {renderedTags}
              </div>
            </div>
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
