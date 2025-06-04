// src/hooks/useSubmitGem.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { submitRestaurant } from '../services/restaurantsService';

export const useSubmitGem = () => {
  const { user, incrementSubmittedGems } = useAuth();
  const navigate = useNavigate();

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

  const [mainImageUrl, setMainImageUrl] = useState('');
  const [additionalImageUrls, setAdditionalImageUrls] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (categoryName) => {
    setFormData(prev => ({
      ...prev,
      category: prev.category.includes(categoryName)
        ? prev.category.filter(c => c !== categoryName)
        : [...prev.category, categoryName]
    }));
  };

  const handleRatingClick = (ratingValue) => {
    setFormData(prev => ({ ...prev, rating: ratingValue }));
  };

  const handleMainImageUrlChange = (e) => {
    setMainImageUrl(e.target.value);
  };

  const handleAdditionalImageUrlChange = (index, value) => {
    setAdditionalImageUrls(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const addAnotherImageField = () => {
    if (additionalImageUrls.length < 5) {
      setAdditionalImageUrls(prev => [...prev, '']);
    }
  };

  const removeImageField = (index) => {
    setAdditionalImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!user?.uid) {
      alert('You must be logged in to submit a gem');
      return false;
    }

    if (!formData.name.trim()) {
      alert('Restaurant name is required');
      return false;
    }

    if (!mainImageUrl.trim()) {
      alert('Please enter a main image URL');
      return false;
    }

    if (formData.category.length === 0) {
      alert('Please select at least one category');
      return false;
    }

    // URL validation
    try {
      new URL(mainImageUrl.trim());
    } catch {
      alert('Main image URL is not a valid URL');
      return false;
    }

    for (let urlStr of additionalImageUrls) {
      if (urlStr.trim()) {
        try {
          new URL(urlStr.trim());
        } catch {
          alert(`Invalid URL in Additional Images: ${urlStr}`);
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const restaurantData = {
        name: formData.name.trim(),
        promo: formData.promo.trim(),
        avgCost: formData.avgCost.trim(),
        openTime: formData.openTime.trim(),
        description: formData.description.trim(),
        category: formData.category,
        rating: Number(formData.rating),
        location: formData.location.trim()
      };

      const cleanedAdditionalImageUrls = additionalImageUrls
        .map(u => u.trim())
        .filter(u => u.length > 0);

      console.log('Submitting restaurant with user ID:', user.uid);

      const result = await submitRestaurant(
        restaurantData,
        mainImageUrl.trim(),
        cleanedAdditionalImageUrls,
        user.uid
      );

      if (result.success) {
        console.log('Restaurant submitted successfully, incrementing gems...');
        
        try {
          await incrementSubmittedGems();
          console.log('Gems incremented successfully');
        } catch (gemError) {
          console.error('Error incrementing gems:', gemError);
        }

        setSuccess(true);
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        console.error('submitRestaurant returned an error:', result.error);
        alert('Failed to submit restaurant. Please try again.');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      alert('Error submitting restaurant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};
