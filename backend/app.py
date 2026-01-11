from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from ml.inference import predict_food

app = FastAPI(title="Food Nutrition Estimator")

# Enable CORS for React Frontend (default port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, set to specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration

@app.get("/")
def health_check():
    return {"status": "running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Endpoint to process food image and return nutrition info.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        contents = await file.read()
        
        result = predict_food(contents)
        
        # Flattening structure to match requested output format exactly
        response = {
            "food": result["food"],
            "confidence": result["confidence"],
            "portion_scale": result["portion_scale"],
            "approx_weight_g": result["approx_weight_g"],
            "calories": result["nutrition"]["calories"],
            "protein": result["nutrition"]["protein"],
            "carbs": result["nutrition"]["carbs"],
            "fat": result["nutrition"]["fat"]
        }
        return response
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))