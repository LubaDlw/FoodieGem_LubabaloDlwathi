// categories const

export const categories = [
  { id: 1, name: "Date Night", image: "../assets/date-night.png"},
  { id: 2, name: "Budget Friendly", image: "../assets/budgetBites.jpg" },
  { id: 3, name: "Hidden Gems", image: "../assets/gem.png" },
 // { id: 4, name: "Near You", image: "../assets/nearYou.jpg" }, //Removed due to scope
  { id: 5, name: "Study / Work Spots", image: "../assets/mortarboard.png" },
  { id: 6, name: "Family Friendly", image: "../assets/family.jpg" },
  { id: 7, name: "Breakfast / Brunch", image: "../assets/breakfast.png" },
  { id: 8, name: "Fine Dining", image: "../assets/fine-dining.png" },
  { id: 9, name: "Casual Eats / Café", image: "../assets/asianfood.jpg" },
  { id: 10, name: "Bar & Lounge", image: "../assets/cocktail.jpg" },
  { id: 11, name: "Ethnic / World Cuisine", image: "../assets/map.png" },
  { id: 12, name: "Healthy / Vegetarian & Vegan", image: "../assets/healthy.jpg" }
];

// Utility function to get random categories
export const getRandomCategories = (count = 4) => {
  const shuffled = [...categories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
