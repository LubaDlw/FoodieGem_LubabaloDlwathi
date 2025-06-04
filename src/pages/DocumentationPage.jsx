import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Star, 
  MapPin, 
  Users, 
  Trophy, 
  Heart, 
  Plus,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Smartphone,
  Settings
} from 'lucide-react';

import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/DocumentationPage.css';

const DocumentationSection = ({ title, icon: Icon, children, isOpen, onToggle }) => (
  <div className="doc-section">
    <button className="doc-section-header" onClick={onToggle}>
      <div className="doc-section-title">
        <Icon size={20} className="doc-section-icon" />
        <h3>{title}</h3>
      </div>
      {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
    </button>
    {isOpen && (
      <div className="doc-section-content">
        {children}
      </div>
    )}
  </div>
);

const DocumentationPage = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({
    gettingStarted: true,
    discovering: false,
    favorites: false,
    profile: false,
    gamification: false,
    tips: false
  });

  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const handleBackToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="documentation-page">
      <Header 
        title="Documentation" 
        leftIcon={ArrowLeft}
        onLeftClick={handleBackToProfile}
      />

      <div className="documentation-container">
        <div className="doc-hero">
          <div className="doc-hero-icon">
            <BookOpen size={32} />
          </div>
          <h2>FoodieGem Documentation</h2>
          <p>Documentation and Design Changes for FoodieGem</p>
        </div>
<DocumentationSection
          title="Changes & Features"
          icon={Search}
          isOpen={openSections.discovering}
          onToggle={() => toggleSection('discovering')}
        >
          <div className="doc-content">
            <h4>Changes Made</h4>
            <p>
              Key changes made to the FoodieGem app from the design: One of the key changes is that of the user flow in the submit gem section, originally, I had planned to include some validation system, however, I found that to be not needed for this assignment, instead gems are automatically approved so as the user fills the required sections and inputs
            </p>

            <h4>UI/UX Changes</h4>
            <p>
              The following enhancments were made to improve user experience:
            </p>
            <ul>
              <li>Additional navigation buttons on pages such as restaurant detail page, category etc, to facillitate better navigation</li>
              <li>Increased size and balanced spacing to ensure content is easy to engage with </li>
              <li>Increased Interactive Elements</li>
              <li>Gamification </li>
              <li>Firebase Database to increase prformance + load states</li>
            </ul>

           
          </div>
        </DocumentationSection>
        <DocumentationSection
          title="Getting Started"
          icon={Smartphone}
          isOpen={openSections.gettingStarted}
          onToggle={() => toggleSection('gettingStarted')}
        >
          <div className="doc-content">
            <h4>Welcome to the App!</h4>
            <p>
              FoodieGem helps you find amazing dining experiences in your area. 
              Whether you're looking for a quick bite or a special dinner, FoodieGem has got you covered.
            </p>
            
            <h4>Core Features</h4>
            <ul>
              <li><strong>Browse:</strong> Browse restaurants with detailed information and photos</li>
              <li><strong>Discover:</strong> Discover gems based on categories</li>
              <li><strong>Favorites:</strong> Save restaurants you love for easy access</li>
              <li><strong>Profile Gamification:</strong> Track your dining journey and achievements</li>
              <li><strong>User Submission</strong> Allow users to submit their own Gems to app</li>
            </ul>

            <h4>Navigation</h4>
            <p>
              Use the bottom navigation bar to switch between different sections of the app. 
              The five main tabs are: Home, Explore, ALl, Promos, and Profile.
            </p>
          </div>
        </DocumentationSection>

        <DocumentationSection
          title="Discovering Restaurants"
          icon={Search}
          isOpen={openSections.discovering}
          onToggle={() => toggleSection('discovering')}
        >
          <div className="doc-content">
            <h4>Browse Restaurants</h4>
            <p>
              The Home tab shows you a curated list of restaurants. You can scroll through 
              to see different options, each showing key information like cuisine type, rating, 
              and distance from your location as well as promotions occuring at a certain time.
            </p>

            <h4>Restaurant Details</h4>
            <p>
              Tap on any restaurant card to see detailed information including:
            </p>
            <ul>
              <li>Full description and specialties</li>
              <li>Menu </li>
              <li>Location and contact information</li>
              <li>Opening hours</li>
              <li>Photo gallery</li>
            </ul>

            <h4>Search & Filters</h4>
            <p>
              Search to find specific categories or cuisines.
            </p>
          </div>
        </DocumentationSection>

        <DocumentationSection
          title="Managing Favorites"
          icon={Heart}
          isOpen={openSections.favorites}
          onToggle={() => toggleSection('favorites')}
        >
          <div className="doc-content">
            <h4>Adding Favorites</h4>
            <p>
              When you find a restaurant you love, tap the heart icon to add it to your favorites. 
              You can do this from the restaurant list or the detailed restaurant page.
            </p>

            <h4>Viewing Favorites</h4>
            <p>
              Access all your favorite restaurants from the Favorites tab or from your Profile page. 
              Your favorites are organized for easy browsing and quick access.
            </p>

            <h4>Managing Your List</h4>
            <p>
              To remove a restaurant from favorites, simply tap the heart icon again. 
              Your favorites list helps you keep track of places you want to visit or revisit.
            </p>
          </div>
        </DocumentationSection>

        <DocumentationSection
          title="Your Profile"
          icon={Users}
          isOpen={openSections.profile}
          onToggle={() => toggleSection('profile')}
        >
          <div className="doc-content">
            <h4>Profile Overview</h4>
            <p>
              Your profile shows your dining journey, including statistics about your app usage, 
              favorite restaurants, and achievements you've earned.
            </p>

            <h4>Submit a Gem</h4>
            <p>
              Know a great restaurant that's not in our app? Use the "Submit a Gem" feature 
              to recommend it to other users. We review all submissions and add quality restaurants 
              to our database.
            </p>

            <h4>Quick Stats</h4>
            <p>Your profile displays important metrics:</p>
            <ul>
              <li><strong>Submitted Gems:</strong> Restaurants you've recommended</li>
              <li><strong>Game Points:</strong> Points earned through app engagement</li>
              <li><strong>Badges:</strong> Achievements unlocked based on your activity</li>
            </ul>
          </div>
        </DocumentationSection>

        <DocumentationSection
          title="Gamification & Rewards"
          icon={Trophy}
          isOpen={openSections.gamification}
          onToggle={() => toggleSection('gamification')}
        >
          <div className="doc-content">
            <h4>Earning Points</h4>
            <p>
              Engage with the app to earn points! You get points for activities like:
            </p>
            <ul>
              <li>Adding restaurants to favorites</li>
              <li>Submitting restaurant recommendations</li>
              <li>Regular app usage</li>
              <li>Discovering new restaurants</li>
            </ul>

            <h4>Badges & Achievements</h4>
            <p>
              Unlock badges by reaching certain milestones. These could include having 
              a certain number of favorites, submitting gems, or being an active user.
            </p>

            <h4>Levels & Progress</h4>
            <p>
              Your engagement level reflects how actively you use the app. Higher levels 
              unlock special features and recognition within the community.
            </p>
          </div>
        </DocumentationSection>

        <DocumentationSection
          title="Tips & Best Practices"
          icon={Settings}
          isOpen={openSections.tips}
          onToggle={() => toggleSection('tips')}
        >
          <div className="doc-content">
            <h4>Making the Most of the App</h4>
            <ul>
              <li>Enable location services for personalized restaurant recommendations</li>
              <li>Regularly check your favorites - restaurants update their information</li>
              <li>Submit gems for hidden restaurants you discover</li>
              <li>Use the map view to find restaurants in specific areas</li>
              <li>Check restaurant hours before visiting</li>
            </ul>
          </div>
        </DocumentationSection>

        <div className="doc-footer">
          <p>Lubabalo Bhungane Dlwathi - 2546125 - Interactive Media 4 - DIGA4015</p>
          <button className="back-to-profile-btn" onClick={handleBackToProfile}>
            <ArrowLeft size={16} />
            Back to Profile
          </button>
        </div>
      </div>

      <BottomNavigation activeTab="profile" />
    </div>
  );
};

export default DocumentationPage;