# digital_twin.py

def simulate_scenario(scenario):

    # Current station state
    solar = 35.0
    wind = 20.0
    load = 50.0

    battery_soc = 72.0
    battery_capacity = 100.0

    battery_temperature = 25.0

    diesel_available = True
    diesel_capacity = 40.0

    critical_load = 30.0

    # Apply what-if scenario
    if scenario == "low_solar":
        solar = 10.0

    elif scenario == "low_wind":
        wind = 5.0

    elif scenario == "high_load":
        load = 70.0

    elif scenario == "low_battery":
        battery_soc = 25.0

    elif scenario == "diesel_failure":
        diesel_available = False

    # Renewable energy available
    renewable_power = solar + wind

    # Calculate energy surplus/deficit
    energy_balance = renewable_power - load

    diesel_used = 0.0
    battery_used = 0.0
    battery_charged = 0.0

    # If renewable energy is greater than load
    if energy_balance >= 0:

        surplus = energy_balance

        # Charge battery with available surplus
        available_battery_capacity = (
            battery_capacity * (100 - battery_soc) / 100
        )

        battery_charged = min(
            surplus,
            available_battery_capacity
        )

        battery_soc += (
            battery_charged / battery_capacity
        ) * 100

    # If renewable energy is not enough
    else:

        deficit = abs(energy_balance)

        # Available battery energy
        available_battery_energy = (
            battery_capacity * battery_soc / 100
        )

        battery_used = min(
            deficit,
            available_battery_energy
        )

        battery_soc -= (
            battery_used / battery_capacity
        ) * 100

        remaining_deficit = deficit - battery_used

        # Diesel backup
        if remaining_deficit > 0 and diesel_available:

            diesel_used = min(
                remaining_deficit,
                diesel_capacity
            )

            remaining_deficit -= diesel_used

        # Remaining power shortage
        power_shortage = max(
            0,
            remaining_deficit
        )

    # If there was no shortage
    if energy_balance >= 0:
        power_shortage = 0

    # Check whether critical loads can be maintained
    critical_load_status = (
        "Maintained"
        if (renewable_power + battery_used + diesel_used) >= critical_load
        else "At Risk"
    )

    # Overall system status
    if power_shortage > 0:
        system_status = "POWER SHORTAGE"
    else:
        system_status = "STABLE"

    return {
        "scenario": scenario,

        "solar_generation_kw": round(solar, 2),
        "wind_generation_kw": round(wind, 2),
        "load_demand_kw": round(load, 2),

        "renewable_generation_kw": round(
            renewable_power, 2
        ),

        "battery_soc_percent": round(
            battery_soc, 2
        ),

        "battery_temperature_c": battery_temperature,

        "battery_used_kw": round(
            battery_used, 2
        ),

        "battery_charged_kw": round(
            battery_charged, 2
        ),

        "diesel_used_kw": round(
            diesel_used, 2
        ),

        "power_shortage_kw": round(
            power_shortage, 2
        ),

        "critical_load": critical_load,

        "critical_load_status": critical_load_status,

        "system_status": system_status
    }
