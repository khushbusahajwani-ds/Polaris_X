from fastapi import APIRouter
import random

router = APIRouter()

# Starting values
solar = 428
wind = 316
battery = 76
demand = 68
temperature = -18


def move_value(current, minimum, maximum, max_change):
    change = random.randint(-max_change, max_change)

    # Make sure it actually moves
    if change == 0:
        change = random.choice([-1, 1])

    new_value = current + change

    return max(minimum, min(maximum, new_value))


@router.get("/energy")
def get_energy():
    global solar, wind, battery, demand, temperature

    # Small realistic movement
    solar = move_value(
        solar,
        400,
        450,
        3
    )

    wind = move_value(
        wind,
        290,
        340,
        3
    )

    battery = max(50,battery -random.randint(1,2)
    )

    demand = move_value(
        demand,
        60,
        78,
        2
    )

    temperature = move_value(
        temperature,
        -22,
        -15,
        1
    )

    return {
        "solar": solar,
        "wind": wind,
        "battery": battery,
        "demand": demand,
        "temperature": temperature
    }