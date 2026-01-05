def calculate_portion_scale(visible_food_area_pixels: float, image_width: int, image_height: int) -> float:
    """
    Calculates portion scale relative to a "standard serving".
    
    Args:
        visible_food_area_pixels: Number of pixels detected as food
        image_width: Width of image
        image_height: Height of image
        
    Returns:
        float: Portion scale (e.g. 1.0 = standard, 0.5 = half, 1.5 = one and a half)
    """
    total_image_area = image_width * image_height
    
    # Hypothesis: A Standard Serving typically takes up ~30% of the frame 
    # in a close-up food photo.
    # This is a HEURISTIC approximation.
    STANDARD_SERVING_COVERAGE_RATIO = 0.30
    
    coverage_ratio = visible_food_area_pixels / total_image_area
    
    # Portion scale = (actual coverage / standard coverage)
    # We clamp it reasonable bounds (0.1 to 3.0) to avoid outliers
    portion_scale = coverage_ratio / STANDARD_SERVING_COVERAGE_RATIO
    
    # Round to 1 decimal place
    return round(max(0.1, min(portion_scale, 3.0)), 2)

def estimate_weight(food_class: str, portion_scale: float) -> int:
    """
    Estimates weight in grams based on class and portion scale.
    
    Args:
        food_class: The predicted class name
        portion_scale: The calculated portion scale
        
    Returns:
        int: Estimated weight in grams
    """
    
    # Standard serving sizes in grams (Approximate)
    STANDARD_WEIGHTS_G = {
        "pizza": 250,        # 1-2 slices
        "hamburger": 220,    # 1 burger
        "french_fries": 150, # Medium fries
        "fried_rice": 200,   # 1 cup
        "samosa": 80         # 1-2 pieces
    }
    
    base_weight = STANDARD_WEIGHTS_G.get(food_class, 150) # default 150g
    
    return int(base_weight * portion_scale)
