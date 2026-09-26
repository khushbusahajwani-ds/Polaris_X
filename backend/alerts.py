from fastapi import APIRouter

router = APIRouter()


@router.get("/alerts")
def get_alerts(
    battery: int = 76,
    solar: int = 428,
    wind: int = 316,
    demand: int = 68,
    temperature: int = -18
):
    alerts = []

    if battery < 60:
        alerts.append({
            "level": "WARNING",
            "title": "Low Battery",
            "message": f"Battery level is {battery}%. Backup power may be required."
        })

    if demand > solar + wind:
        alerts.append({
            "level": "CRITICAL",
            "title": "High Load",
            "message": "Current demand is higher than renewable generation."
        })

    if temperature < -21:
        alerts.append({
            "level": "WARNING",
            "title": "Extreme Temperature",
            "message": f"Station temperature is {temperature}°C."
        })

    if solar < 410 and wind < 300:
        alerts.append({
            "level": "WARNING",
            "title": "Low Renewable Generation",
            "message": "Solar and wind generation are currently low."
        })

    if not alerts:
        alerts.append({
            "level": "NORMAL",
            "title": "System Normal",
            "message": "No immediate energy risks detected."
        })

    return {
        "count": len(alerts),
        "alerts": alerts
    }