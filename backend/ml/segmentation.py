import cv2
import numpy as np

def estimate_food_area(image_np: np.ndarray) -> float:
    """
    Estimates the visible food area in pixels using simple HSV segmentation.
    
    Args:
        image_np: Numpy array of the image (BGR format from OpenCV)
    
    Returns:
        float: Estimated area in pixels
    """
    # Convert to HSV
    hsv = cv2.cvtColor(image_np, cv2.COLOR_BGR2HSV)
    
    # Simple heuristic: Food is often "colorful" (saturation) or "dark/bright" enough
    # Background is often white/grey/black (low saturation)
    # We'll use a generic mask for demo purposes. 
    # In a real app, this would need class-specific thresholds or a Segmentation NN.
    
    # Filter out low saturation (background/plates/napkins often)
    # Saturation: 25-255
    # Value: 20-255 (avoid extremely dark shadows)
    lower_bound = np.array([0, 25, 20])
    upper_bound = np.array([179, 255, 255])
    
    mask = cv2.inRange(hsv, lower_bound, upper_bound)
    
    # Morphological operations to clean up noise
    kernel = np.ones((5,5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    
    # Count non-zero pixels
    food_pixels = cv2.countNonZero(mask)
    
    return float(food_pixels)
