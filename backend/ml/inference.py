import torch
import torch.nn.functional as F
from PIL import Image
import numpy as np
import cv2
from torchvision import transforms
from .model_loader import ModelLoader
from .segmentation import estimate_food_area
from .portion import calculate_portion_scale, estimate_weight
from .nutrition import calculate_nutrition

# Define inference transforms (must match training)
inference_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

CLASS_NAMES = ['french_fries', 'fried_rice', 'hamburger', 'pizza', 'samosa'] # Alphabetical usually

def predict_food(image_bytes: bytes, model_path: str):
    """
    Full inference pipeline:
    1. Load Model
    2. Preprocess Image
    3. Run Inference
    4. Segment & Portion Estimate
    5. Nutrition Calculation
    """
    
    # 1. Load Model
    model = ModelLoader.get_model(model_path)
    
    # 2. Preprocess
    # Need PIL Image for Torch transforms
    import io
    pil_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    tensor_img = inference_transforms(pil_image).unsqueeze(0) # Batch dim
    
    # Need OpenCV Image for Segmentation (Preserve original dims or resize consistently?)
    # We will use the PIL image converted to numpy for segmentation to keep it simple.
    # Note: PIL is RGB, OpenCV expects BGR usually, but our seg logic converts to HSV anyway.
    # However, opencv reads BGR. So we convert RGB->BGR
    opencv_img = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
    
    # 3. Inference
    with torch.no_grad():
        outputs = model(tensor_img)
        probabilities = F.softmax(outputs, dim=1)
        confidence, predicted_idx = torch.max(probabilities, 1)
        
    predicted_class = CLASS_NAMES[predicted_idx.item()]
    conf_score = confidence.item()
    
    # 4. Segmentation & Portion
    img_h, img_w = opencv_img.shape[:2]
    food_area_pixels = estimate_food_area(opencv_img)
    portion_scale = calculate_portion_scale(food_area_pixels, img_w, img_h)
    estimated_weight = estimate_weight(predicted_class, portion_scale)
    
    # 5. Nutrition
    nutrition_facts = calculate_nutrition(predicted_class, estimated_weight)
    
    return {
        "food": predicted_class,
        "confidence": round(conf_score, 4),
        "portion_scale": portion_scale,
        "approx_weight_g": estimated_weight,
        "nutrition": nutrition_facts
    }
