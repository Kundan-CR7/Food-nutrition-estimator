import torch
import torch.nn as nn
from torchvision import models
import os

class ModelLoader:
    _model = None

    @classmethod
    def get_model(cls, model_path: str, device: torch.device):
        if cls._model is None:
            print(f"[INFO] Loading model from {model_path}...")

            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model file not found at {model_path}")

            # Initialize MobileNetV2
            model = models.mobilenet_v2(weights=None)
            num_ftrs = model.classifier[1].in_features
            model.classifier[1] = nn.Linear(num_ftrs, 5)

            # Load weights safely
            state_dict = torch.load(model_path, map_location=device)
            model.load_state_dict(state_dict)

            # Move to device and eval mode
            model.to(device)
            model.eval()

            cls._model = model
            print("[INFO] Model loaded successfully.")

        return cls._model
