from fastapi import APIRouter

router = APIRouter()

@router.get("/forecast")
def get_forecast():
    return {
        "confidence": 94.7,
        "predicted_demand_change": 4.8,
        "renewable_share": 82,
        "model": "XGBoost"
    }