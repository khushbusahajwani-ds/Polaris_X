from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from digital_twin import simulate_scenario

app = FastAPI(
    title="POLARIS-X API",
    description="POLARIS-X Energy Management Backend",
    version="1.0.0"
)

# Allow the React frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "POLARIS-X Backend is running"
    }


@app.get("/digital-twin/{scenario}")
def digital_twin(scenario: str):

    allowed_scenarios = [
        "normal",
        "low_solar",
        "low_wind",
        "high_load",
        "low_battery",
        "diesel_failure"
    ]

    if scenario not in allowed_scenarios:
        return {
            "error": "Invalid scenario",
            "available_scenarios": allowed_scenarios
        }

    return simulate_scenario(scenario)
