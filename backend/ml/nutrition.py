from typing import Dict

def calculate_nutrition(food_class: str, weight_g: float) -> Dict[str, float]:
    """
    Calculates nutrition facts based on food class and estimated weight.
    
    Args:
        food_class: The predicted food name
        weight_g: The estimated weight in grams
        
    Returns:
        Dict: {calories, protein, carbs, fat}
    """
    
    # Nutrition data per 100g (Approximate values)
    # Source: Generic USDA data or similar averages
    NUTRITION_PER_100G = {
        "pizza": {"calories": 266, "protein": 11, "carbs": 33, "fat": 10},
        "hamburger": {"calories": 295, "protein": 17, "carbs": 24, "fat": 14},
        "french_fries": {"calories": 312, "protein": 3.4, "carbs": 41, "fat": 15},
        "fried_rice": {"calories": 163, "protein": 5.5, "carbs": 32, "fat": 2.3},
        "samosa": {"calories": 260, "protein": 3.5, "carbs": 24, "fat": 17} # High fat due to frying
    }
    
    defaults = {"calories": 200, "protein": 5, "carbs": 20, "fat": 10}
    info_100g = NUTRITION_PER_100G.get(food_class, defaults)
    
    ratio = weight_g / 100.0
    
    return {
        "calories": int(info_100g["calories"] * ratio),
        "protein": round(info_100g["protein"] * ratio, 1),
        "carbs": round(info_100g["carbs"] * ratio, 1),
        "fat": round(info_100g["fat"] * ratio, 1)
    }
