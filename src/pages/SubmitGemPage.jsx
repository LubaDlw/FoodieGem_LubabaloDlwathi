// src/pages/SubmitGemPage.jsx (Refactored Main Component)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, DollarSign, FileText, Check, Loader2 } from 'lucide-react';

import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import FormSection from '../components/SubmitGem/FormSection';
import FormInput from '../components/SubmitGem/FormInput';
import CategorySelector from '../components/SubmitGem/CategorySelector';
import RatingSelector from '../components/SubmitGem/RatingSelector';
import ImageUrlInput from '../components/SubmitGem/ImageUrlInput';
import AdditionalImageUrls from '../components/SubmitGem/AdditionalImageUrls';
import SuccessScreen from '../components/SubmitGem/SuccessScreen';
import { useSubmitGem } from '../hooks/useSubmitGem';
import { categories } from '../utils/categories';
import '../styles/SubmitGemPage.css';

const SubmitGemPage = () => {
  const navigate = useNavigate();
  const {
    formData,
    mainImageUrl,
    additionalImageUrls,
    loading,
    success,
    handleInputChange,
    handleCategoryToggle,
    handleRatingClick,
    handleMainImageUrlChange,
    handleAdditionalImageUrlChange,
    addAnotherImageField,
    removeImageField,
    handleSubmit
  } = useSubmitGem();

  if (success) {
    return <SuccessScreen />;
  }

  return (
    <div className="submit-gem-page">
      <Header 
        title="Submit a Gem" 
        showBack={true} 
        onBack={() => navigate('/profile')} 
      />

      <div className="submit-container">
        <form onSubmit={handleSubmit} className="submit-form">
          {/* Basic Information */}
          <FormSection title="Basic Information">
            <FormInput
              label="Restaurant Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter restaurant name"
              required
            />

            <FormInput
              label="Promotional Text"
              name="promo"
              value={formData.promo}
              onChange={handleInputChange}
              placeholder="e.g., Best pizza in town!"
            />

            <div className="form-row">
              <FormInput
                label="Average Cost"
                name="avgCost"
                value={formData.avgCost}
                onChange={handleInputChange}
                placeholder="e.g., $20-30"
                icon={DollarSign}
              />

              <FormInput
                label="Opening Hours"
                name="openTime"
                value={formData.openTime}
                onChange={handleInputChange}
                placeholder="e.g., 9AM-10PM"
                icon={Clock}
              />
            </div>

            <FormInput
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter address or area"
              icon={MapPin}
            />
          </FormSection>

          {/* Description */}
          <FormSection title="Description">
            <FormInput
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell us about this restaurant..."
              rows={4}
              icon={FileText}
            />
          </FormSection>

          {/* Categories */}
          <FormSection title="Categories *">
            <CategorySelector
              categories={categories}
              selectedCategories={formData.category}
              onToggle={handleCategoryToggle}
            />
          </FormSection>

          {/* Rating */}
          <FormSection title="Your Rating">
            <RatingSelector
              rating={formData.rating}
              onRatingClick={handleRatingClick}
            />
          </FormSection>

          {/* Main Image URL */}
          <FormSection title="Main Image URL *">
            <ImageUrlInput
              value={mainImageUrl}
              onChange={handleMainImageUrlChange}
              placeholder="https://example.com/your-main-image.jpg"
              required
              helperText="Paste a publicly accessible image URL here"
            />
          </FormSection>

          {/* Additional Image URLs */}
          <FormSection title="Additional Image URLs (Optional)">
            <AdditionalImageUrls
              imageUrls={additionalImageUrls}
              onUrlChange={handleAdditionalImageUrlChange}
              onAdd={addAnotherImageField}
              onRemove={removeImageField}
            />
          </FormSection>

          {/* Submit Button */}
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