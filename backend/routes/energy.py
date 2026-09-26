from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/energy")
def get_energy():
    return {
        "solar": random.randint(380, 450),
        "wind": random.randint(280, 340),
        "battery": random.randint(65, 85),
        "demand": random.randint(60, 80),
        "temperature": -18
    }