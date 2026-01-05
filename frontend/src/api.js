import axios from 'axios';

// Configuration
const API_URL = 'http://localhost:8000';

/**
 * Uploads an image to the backend for prediction.
 * 
 * @param {File} imageFile - The file object to upload
 * @returns {Promise<Object>} - The JSON response from backend
 */
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
        // Return a structured error object if axios error has response
        if (error.response && error.response.data) {
            return { status: 'failed', error: error.response.data.detail || 'Server error' };
        }
        return { status: 'failed', error: 'Network or Server Error' };
    }
};
