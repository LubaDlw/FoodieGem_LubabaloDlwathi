// src/pages/SubmitGemPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  MapPin,
  Clock,
  DollarSign,
  Star,
  FileText,
  Tag,
  Loader2,
  Check
} from 'lucide-react';

import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/SubmitGemPage.css';

// ← Import updated service (no image-file upload, just URL strings)
import { submitRestaurant } from '../services/restaurantsService';

const SubmitGemPage = () => {
  const { user, incrementSubmittedGems } = useAuth();
  const navigate = useNavigate();

  // Form state:
  const [formData, setFormData] = useState({
    name: '',
    promo: '',
    avgCost: '',
    openTime: '',
    description: '',
    category: [],
    rating: 0,
    location: ''
  });

  // Instead of File objects, we store URL strings:
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [additionalImageUrls, setAdditionalImageUrls] = useState(['']); // start with one empty field

  // Loading / success state:
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = [
    'Fast Food',
    'Fine Dining',
    'Casual Dining',
    'Cafe',
    'Bar',
    'Pizza',
    'Sushi',
    'Italian',
    'Mexican',
    'Indian',
    'Chinese',
    'American',
    'Mediterranean',
    'Thai',
    'Korean',
    'Japanese',
    'Vegetarian',
    'Vegan'
  ];

  // ──────────────────────────────────────────────────────────────────────────
  // Input handlers
  // ──────────────────────────────────────────────────────────────────────────

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryToggle = (category) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category]
    }));
  };

  const handleRatingClick = (ratingValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: ratingValue
    }));
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Image-URL handlers
  // ──────────────────────────────────────────────────────────────────────────

  // Main Image URL
  const handleMainImageUrlChange = (e) => {
    setMainImageUrl(e.target.value);
  };

  // Additional Image URLs (up to 5)
  const handleAdditionalImageUrlChange = (index, value) => {
    setAdditionalImageUrls((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const addAnotherImageField = () => {
    if (additionalImageUrls.length < 5) {
      setAdditionalImageUrls((prev) => [...prev, '']);
    }
  };

  const removeImageField = (index) => {
    setAdditionalImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Submission handler
  // ──────────────────────────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) Basic validation:
    //    - Name must not be blank
    //    - MainImageUrl must look like a URL
    //    - At least one category selected
    if (!formData.name.trim()) {
      alert('Restaurant name is required');
      return;
    }
    if (!mainImageUrl.trim()) {
      alert('Please enter a main image URL');
      return;
    }
    if (formData.category.length === 0) {
      alert('Please select at least one category');
      return;
    }

    // (Optional) Minimal URL validation:
    try {
      new URL(mainImageUrl.trim());
    } catch {
      alert('Main image URL is not a valid URL');
      return;
    }

    // Validate each additional URL if provided (ignore empty strings)
    for (let urlStr of additionalImageUrls) {
      if (urlStr.trim()) {
        try {
          new URL(urlStr.trim());
        } catch {
          alert(`Invalid URL in Additional Images: ${urlStr}`);
          return;
        }
      }
    }

    setLoading(true);

    try {
      // 2) Build the “restaurantData” object
      const restaurantData = {
        name: formData.name.trim(),
        promo: formData.promo.trim(),
        avgCost: formData.avgCost.trim(),
        openTime: formData.openTime.trim(),
        description: formData.description.trim(),
        category: formData.category,         // array of strings
        rating: Number(formData.rating),     // number
        location: formData.location.trim()   // string
      };

      // 3) Filter out any empty additional‐image fields:
      const cleanedAdditionalImageUrls = additionalImageUrls
        .map((u) => u.trim())
        .filter((u) => u.length > 0);

      // 4) Call our service helper, which simply writes Firestore with the URL strings:
      const result = await submitRestaurant(
        restaurantData,
        mainImageUrl.trim(),
        cleanedAdditionalImageUrls,
        user.uid
      );

      if (result.success) {
        // 5) Increment “submittedGems” & “gamePoints” in the user’s profile
        await incrementSubmittedGems();

        // 6) Show success screen then redirect to /profile
        setSuccess(true);
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        console.error('submitRestaurant returned an error:', result.error);
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      alert('Error submitting restaurant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Success screen
  // ──────────────────────────────────────────────────────────────────────────

  if (success) {
    return (
      <div className="submit-gem-page">
        <Header title="Gem Submitted!" />
        <div className="success-container">
          <div className="success-icon">
            <Check size={48} />
          </div>
          <h2>Restaurant Submitted Successfully!</h2>
          <p>Thank you for sharing your gem with the community!</p>
          <div className="success-loader">
            <Loader2 className="spinner" size={24} />
            <span>Redirecting to profile...</span>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Main “Submit a Gem” form
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <div className="submit-gem-page">
      <Header title="Submit a Gem" showBack={true} onBack={() => navigate('/profile')} />

      <div className="submit-container">
        <form onSubmit={handleSubmit} className="submit-form">
          {/* ─── Basic Information ──────────────────────────────────────────────── */}
          <div className="form-section">
            <h3>Basic Information</h3>

            <div className="form-group">
              <label>Restaurant Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter restaurant name"
                required
              />
            </div>

            <div className="form-group">
              <label>Promotional Text</label>
              <input
                type="text"
                name="promo"
                value={formData.promo}
                onChange={handleInputChange}
                placeholder="e.g., Best pizza in town!"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Average Cost</label>
                <div className="input-with-icon">
                  <DollarSign size={20} />
                  <input
                    type="text"
                    name="avgCost"
                    value={formData.avgCost}
                    onChange={handleInputChange}
                    placeholder="e.g., $20-30"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Opening Hours</label>
                <div className="input-with-icon">
                  <Clock size={20} />
                  <input
                    type="text"
                    name="openTime"
                    value={formData.openTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 9AM-10PM"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Location</label>
              <div className="input-with-icon">
                <MapPin size={20} />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter address or area"
                />
              </div>
            </div>
          </div>

          {/* ─── Description ─────────────────────────────────────────────────────── */}
          <div className="form-section">
            <h3>Description</h3>
            <div className="form-group">
              <div className="input-with-icon">
                <FileText size={20} />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about this restaurant..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* ─── Categories ───────────────────────────────────────────────────────── */}
          <div className="form-section">
            <h3>Categories *</h3>
            <div className="categories-grid">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`category-tag ${
                    formData.category.includes(category) ? 'selected' : ''
                  }`}
                  onClick={() => handleCategoryToggle(category)}
                >
                  <Tag size={16} />
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* ─── Rating ───────────────────────────────────────────────────────────── */}
          <div className="form-section">
            <h3>Your Rating</h3>
            <div className="rating-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-button ${
                    star <= formData.rating ? 'selected' : ''
                  }`}
                  onClick={() => handleRatingClick(star)}
                >
                  <Star
                    size={24}
                    fill={star <= formData.rating ? '#FFD700' : 'none'}
                  />
                </button>
              ))}
              <span className="rating-text">
                {formData.rating > 0 ? `${formData.rating}/5` : 'Tap to rate'}
              </span>
            </div>
          </div>

          {/* ─── Main Image URL ─────────────────────────────────────────────────── */}
          <div className="form-section">
            <h3>Main Image URL *</h3>
            <div className="form-group">
              <input
                type="url"
                name="mainImageUrl"
                value={mainImageUrl}
                onChange={handleMainImageUrlChange}
                placeholder="https://example.com/your-main-image.jpg"
                required
              />
              <small>Paste a publicly accessible image URL here</small>
            </div>
          </div>

          {/* ─── Additional Image URLs (optional, up to 5) ──────────────────────── */}
          <div className="form-section">
            <h3>Additional Image URLs (Optional)</h3>
            {additionalImageUrls.map((urlStr, index) => (
              <div key={index} className="form-group additional-image-url-group">
                <input
                  type="url"
                  placeholder="https://example.com/another-image.jpg"
                  value={urlStr}
                  onChange={(e) => handleAdditionalImageUrlChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="remove-image-field-btn"
                  onClick={() => removeImageField(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            {additionalImageUrls.length < 5 && (
              <button
                type="button"
                className="add-image-field-btn"
                onClick={addAnotherImageField}
              >
                + Add Another Image URL
              </button>
            )}
            <small>You can submit up to 5 additional images by pasting their URLs.</small>
          </div>

          {/* ─── Submit Button ───────────────────────────────────────────────────── */}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="spinner" size={20} />
                Submitting Gem...
              </>
            ) : (
              <>
                <Check size={20} />
                Submit Gem
              </>
            )}
          </button>
        </form>
      </div>

      <BottomNavigation activeTab="profile" />
    </div>
  );
};

export default SubmitGemPage;
