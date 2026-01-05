import axios from 'axios';
const API_URL = 'https://food-nutrition-estimator.onrender.com';

export const predictFood = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await axios.post(`${API_URL}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during prediction:", error);
    throw error;
  }
};
