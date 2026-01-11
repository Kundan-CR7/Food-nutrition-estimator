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


DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"[INFO] Using device: {DEVICE}")

MODEL_PATH = "model/mobilenet_food.pth"

MODEL = ModelLoader.get_model(MODEL_PATH, DEVICE)

inference_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

CLASS_NAMES = [
    'french_fries',
    'fried_rice',
    'hamburger',
    'pizza',
    'samosa'
]

def predict_food(image_bytes: bytes):
    """
    Full inference pipeline:
    1. Preprocess image
    2. Model inference (GPU/CPU)
    3. Segmentation
    4. Portion estimation
    5. Nutrition calculation
    """

    import io
    pil_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    tensor_img = inference_transforms(pil_image)
    tensor_img = tensor_img.unsqueeze(0).to(DEVICE)  # (1, C, H, W)

    opencv_img = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

    with torch.no_grad():
        outputs = MODEL(tensor_img)
        probs = F.softmax(outputs, dim=1)
        confidence, predicted_idx = torch.max(probs, dim=1)

    predicted_class = CLASS_NAMES[predicted_idx.item()]
    confidence_score = confidence.item()

    img_h, img_w = opencv_img.shape[:2]
    food_area_pixels = estimate_food_area(opencv_img)

    portion_scale = calculate_portion_scale(
        food_area_pixels, img_w, img_h
    )
    estimated_weight = estimate_weight(
        predicted_class, portion_scale
    )

    nutrition_facts = calculate_nutrition(
        predicted_class, estimated_weight
    )

    return {
        "food": predicted_class,
        "confidence": round(confidence_score, 4),
        "portion_scale": round(portion_scale, 4),
        "approx_weight_g": round(estimated_weight, 2),
        "nutrition": nutrition_facts
    }
