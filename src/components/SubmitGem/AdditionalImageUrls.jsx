import React from 'react';

const AdditionalImageUrls = ({ 
  imageUrls, 
  onUrlChange, 
  onAdd, 
  onRemove, 
  maxImages = 5 
}) => (
  <div className="additional-images-section">
    {imageUrls.map((urlStr, index) => (
      <div key={index} className="form-group additional-image-url-group">
        <input
          type="url"
          placeholder="https://example.com/another-image.jpg"
          value={urlStr}
          onChange={(e) => onUrlChange(index, e.target.value)}
        />
        <button
          type="button"
          className="remove-image-field-btn"
          onClick={() => onRemove(index)}
        >
          Remove
        </button>
      </div>
    ))}
    {imageUrls.length < maxImages && (
      <button
        type="button"
        className="add-image-field-btn"
        onClick={onAdd}
      >
        + Add Another Image URL
      </button>
    )}
    <small>You can submit up to {maxImages} additional images by pasting their URLs.</small>
  </div>
);

export default AdditionalImageUrls;