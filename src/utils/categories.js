// src/data/categories.js

export const categories = [
  { id: 1, name: "Date Night", image: "../assets/topRated.jpg" },
  { id: 2, name: "Budget Friendly", image: "../assets/seafood.jpg" },
  { id: 3, name: "Hidden Gems", image: "../assets/gourmetCat.jpg" },
  { id: 4, name: "Near You", image: "../assets/asianfood.jpg" },
  { id: 5, name: "Study / Work Spots", image: "../assets/fastfood.jpg" },
  { id: 6, name: "Family Friendly", image: "../assets/budgetBites.jpg" },
  { id: 7, name: "Breakfast / Brunch", image: "../assets/asianfood.jpg" },
  { id: 8, name: "Fine Dining", image: "../assets/asianfood.jpg" },
  { id: 9, name: "Casual Eats / Café", image: "../assets/asianfood.jpg" },
  { id: 10, name: "Bar & Lounge", image: "../assets/lateNight.jpg" },
  { id: 11, name: "Ethnic / World Cuisine", image: "../assets/dateNight.jpg" },
  { id: 12, name: "Healthy / Vegetarian & Vegan", image: "../assets/student.jpg" }
];

// Utility function to get random categories
export const getRandomCategories = (count = 4) => {
  const shuffled = [...categories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
