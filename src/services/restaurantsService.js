// handle rest submissiond
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

export const submitRestaurant = async (
  restaurantData,
  mainImageUrl,         // string URL (instead of File)  //hero image
  additionalImageUrls = [], // array of string URLs  //scrooll iumages
  userId
) => {
  try {
    // Firebase restuarnt data validation:
    const finalRestaurantData = {
      // Core fields (string values or arrays) coming from the form:
      name: restaurantData.name,
      promo: restaurantData.promo || '',
      avgCost: restaurantData.avgCost || '',
      openTime: restaurantData.openTime || '',
      description: restaurantData.description,
      category: restaurantData.category,     // array of strings
      rating: restaurantData.rating,         // number
      location: restaurantData.location || '',

      // Directly use the URLs that the user pasted:
      image: mainImageUrl,                   // main image URL string
      images: additionalImageUrls,           // array of string URLs

      // Metadata fields:
      submittedBy: userId,
      submittedAt: serverTimestamp(),        // Firestore timestamp
      approved: false,                       // default to “false”
      likes: 0,                              // default to zero
      reviews: []                            // empty array initially
    };

    // 2) Write to Firestore using restaurantData.name as the document ID:
    const restaurantRef = doc(db, 'restaurants', restaurantData.name);
    await setDoc(restaurantRef, finalRestaurantData);

    return { success: true, id: restaurantData.name };
  } catch (error) {
    console.error('Error submitting restaurant:', error);
    return { success: false, error: error.message };
  }
};

/**
 * (Other “read” utilities remain unchanged.)
 */
export const getAllRestaurants = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'restaurants'));
    const restaurants = [];
    querySnapshot.forEach((doc) => {
      restaurants.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return restaurants;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

export const getRestaurantById = async (id) => {
  try {
    const docRef = doc(db, 'restaurants', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    throw error;
  }
};

export const getRestaurantsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, 'restaurants'),
      where('category', 'array-contains', category)
    );
    const querySnapshot = await getDocs(q);
    const restaurants = [];
    querySnapshot.forEach((doc) => {
      restaurants.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return restaurants;
  } catch (error) {
    console.error('Error fetching restaurants by category:', error);
    throw error;
  }
};

export const getTopRatedRestaurants = async (limitCount = 10) => {
  try {
    const q = query(
      collection(db, 'restaurants'),
      orderBy('rating', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const restaurants = [];
    querySnapshot.forEach((doc) => {
      restaurants.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return restaurants;
  } catch (error) {
    console.error('Error fetching top rated restaurants:', error);
    throw error;
  }
};

export const getRestaurantsByUser = async (userId) => {
  try {
    const q = query(
      collection(db, 'restaurants'),
      where('submittedBy', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const restaurants = [];
    querySnapshot.forEach((doc) => {
      restaurants.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return restaurants;
  } catch (error) {
    console.error('Error fetching user restaurants:', error);
    throw error;
  }
};

export const searchRestaurants = async (searchTerm) => {
  try {
    // Simple “contains” search on name or description
    const querySnapshot = await getDocs(collection(db, 'restaurants'));
    const restaurants = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (
        data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        restaurants.push({
          id: doc.id,
          ...data
        });
      }
    });
    return restaurants;
  } catch (error) {
    console.error('Error searching restaurants:', error);
    throw error;
  }
};
