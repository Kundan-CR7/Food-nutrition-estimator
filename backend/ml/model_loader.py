import torch
import torch.nn as nn
from torchvision import models
import os

class ModelLoader:
    _instance = None
    _model = None

    @classmethod
    def get_model(cls, model_path: str):
        if cls._model is None:
            print(f"Loading model from {model_path}...")
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model file not found at {model_path}")
            
            # Initialize MobileNetV2 architecture
            # Assuming the model was trained with 5 classes as per requirements
            model = models.mobilenet_v2(weights=None)
            num_ftrs = model.classifier[1].in_features
            model.classifier[1] = nn.Linear(num_ftrs, 5)
            
            # Load weights
            # map_location='cpu' ensures we can run on CPU even if trained on GPU
            state_dict = torch.load(model_path, map_location=torch.device('cpu'))
            model.load_state_dict(state_dict)
            
            model.eval()
            cls._model = model
            print("Model loaded successfully.")
        
        return cls._model
