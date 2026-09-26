from fastapi import APIRouter

router = APIRouter()

@router.get("/optimization")
def get_optimization():
    return {
        "solar": 72,
        "wind": 58,
        "battery": 32,
        "diesel": 14
    }