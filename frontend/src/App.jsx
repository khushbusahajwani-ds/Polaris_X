import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
 useEffect(() => {
  const getEnergyData = () => {
    fetch("http://127.0.0.1:8000/api/energy")
      .then((response) => response.json())
      .then((data) => {
        setSolar(data.solar);
        setWind(data.wind);
        setBattery(data.battery);
        setDemand(data.demand);
        setTemperature(data.temperature);
      })
      .catch((error) => {
        console.error("Backend connection error:", error);
      });
  };

  getEnergyData();

  const interval = setInterval(getEnergyData, 4000);

  return () => clearInterval(interval);
}, []);

  const [temperature, setTemperature] = useState(-18);
  const [demand, setDemand] = useState(68);
  useEffect(() => {
  const interval = setInterval(() => {
    setDemand((value) =>
      Math.max(50, Math.min(85, value + (Math.random() > 0.5 ? 1 : -1)))
    );
  }, 4000);

  return () => clearInterval(interval);
}, []);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [solar, setSolar] = useState(428);
const [wind, setWind] = useState(316);
  useEffect(() => {
  const interval = setInterval(() => {
    setSolar((value) => Math.max(390, Math.min(460, value + Math.floor(Math.random() * 11) - 5)));
    setWind((value) => Math.max(280, Math.min(350, value + Math.floor(Math.random() * 9) - 4)));
  }, 3000);

  return () => clearInterval(interval);
}, []);

  const renewable = 82;
  const [battery, setBattery] = useState(76);
  useEffect(() => {
  const interval = setInterval(() => {
    setBattery((value) =>
      Math.max(55, Math.min(90, value + (Math.random() > 0.5 ? 1 : -1)))
    );
  }, 4000);

  return () => clearInterval(interval);
}, []);

  const predictedLoad = Math.round(demand * 8.4);
  const batteryStress = temperature < -25 ? "High" : temperature < -10 ? "Medium" : "Low";

  return (
    <div className="polaris-app">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-symbol">✦</div>

          <div>
            <h2>POLARIS<span> X</span></h2>
            <p>ENERGY INTELLIGENCE</p>
          </div>
        </div>

        <div className="station-status">
          <span className="online-dot"></span>

          <div>
            <strong>Station Online</strong>
            <small>Polar Research Base</small>
          </div>
        </div>

        <nav className="navigation">

          <button className="nav-button active">
            <span>⌂</span>
            Dashboard
          </button>

          <button className="nav-button">
            <span>◈</span>
            Energy Forecast
          </button>

          <button className="nav-button">
            <span>◇</span>
            Digital Twin
          </button>

          <button className="nav-button">
            <span>⚙</span>
            Optimization
          </button>

          <button className="nav-button">
            <span>◉</span>
            Live Monitoring
          </button>

          <button className="nav-button">
            <span>⚠</span>
            Alerts
          </button>

        </nav>

        <div className="sidebar-footer">
          <div className="security-icon">✓</div>

          <div>
            <strong>Safety Layer Active</strong>
            <small>All critical loads protected</small>
          </div>
        </div>

      </aside>


      {/* ================= MAIN ================= */}
      <main className="main-content">

        {/* HEADER */}

        <header className="top-header">

          <div>
            <p className="overline">SMART ENERGY COMMAND CENTER</p>

            <h1>
              POLARIS X <span>Dashboard</span>
            </h1>

            <p className="header-description">
              AI-powered energy intelligence for polar research stations
            </p>
          </div>


          <div className="header-right">

            <div className="weather-widget">
              <div className="snow-icon">❄</div>

              <div>
                <strong>{temperature}°C</strong>
                <small>Polar Conditions</small>
              </div>
            </div>

            <div className="live-status">
              <span></span>
              LIVE
            </div>

            <div className="profile">
              PX
            </div>

          </div>

        </header>


        {/* ================= KPI CARDS ================= */}

        <section className="kpi-grid">

          <div className="kpi-card solar">

            <div className="kpi-heading">
              <div className="kpi-icon">☀</div>

              <span className="status-badge good">
                +12.4%
              </span>
            </div>

            <p>Solar Generation</p>

            <h2>
              {solar}<small>kW</small>
            </h2>

            <div className="kpi-bar">
              <div style={{ width: "72%" }}></div>
            </div>

            <small className="card-note">
              Renewable source
            </small>

          </div>


          <div className="kpi-card wind">

            <div className="kpi-heading">
              <div className="kpi-icon">≋</div>

              <span className="status-badge good">
                Stable
              </span>
            </div>

            <p>Wind Generation</p>

            <h2>
              {wind} <small>kW</small>
            </h2>

            <div className="kpi-bar">
              <div style={{ width: "61%" }}></div>
            </div>

            <small className="card-note">
              Wind conditions normal
            </small>

          </div>


          <div className="kpi-card battery">

            <div className="kpi-heading">
              <div className="kpi-icon">▰</div>

              <span className="status-badge healthy">
                Healthy
              </span>
            </div>

            <p>Battery State</p>

            <h2>
              {battery}<small>%</small>
            </h2>

            <div className="kpi-bar">
              <div style={{ width: `${battery}%` }}></div>
            </div>

            <small className="card-note">
              2.4 MWh available
            </small>

          </div>


          <div className="kpi-card demand">

            <div className="kpi-heading">
              <div className="kpi-icon">⚡</div>

              <span className="status-badge warning">
                Monitor
              </span>
            </div>

            <p>Energy Demand</p>
           <h2>
            {demand} <small>kW</small>
          </h2> 

            <div className="kpi-bar">
              <div style={{ width: "54%" }}></div>
            </div>

            <small className="card-note">
              Within safe operating range
            </small>

          </div>

        </section>


        {/* ================= MAIN VISUAL AREA ================= */}

        <section className="main-grid">

          {/* ENERGY FLOW */}

          <div className="panel energy-panel">

            <div className="panel-header">

              <div>
                <span className="section-tag blue">
                  LIVE ENERGY FLOW
                </span>

                <h2>Power Generation & Distribution</h2>
              </div>

              <span className="time-label">
                Updated just now
              </span>

            </div>


            <div className="energy-flow">

              <div className="source source-solar">
                <div className="source-icon">☀</div>

                <strong>Solar</strong>

                <span>{solar}kW</span>

                <div className="flow-line yellow"></div>
              </div>


              <div className="source source-wind">
                <div className="source-icon">≋</div>

                <strong>Wind</strong>

                <span>{wind} kW</span>

                <div className="flow-line blue"></div>
              </div>


              <div className="station-core">

                <div className="core-ring">

                  <div className="core-center">
                    <strong>{solar+wind}</strong>
                    <span>kW</span>
                  </div>

                </div>

                <p>Total Generation</p>

              </div>


              <div className="source source-battery">
                <div className="source-icon">▰</div>

                <strong>Battery</strong>

                <span>{battery} <small>% </small></span>
                

                <div className="flow-line green"></div>
              </div>


              <div className="source source-load">
                <div className="source-icon">⚡</div>

                <strong>Station Load</strong>

                <span>{demand} kW</span>

                <div className="flow-line purple"></div>
              </div>

            </div>


            <div className="energy-summary">

              <div>
                <span>Renewable contribution</span>
                <strong className="green-text">82%</strong>
              </div>

              <div>
                <span>Diesel dependency</span>
                <strong>4%</strong>
              </div>

              <div>
                <span>Grid stability</span>
                <strong className="green-text">Excellent</strong>
              </div>

            </div>

          </div>


          {/* AI PANEL */}

          <div className="panel ai-panel">

            <div className="panel-header">

              <div>
                <span className="section-tag purple">
                  AI / ML ENGINE
                </span>

                <h2>Energy Forecast</h2>
              </div>

              <span className="ai-status">
                AI ACTIVE
              </span>

            </div>


            <div className="ai-confidence">

              <div className="confidence-circle">

                <strong>94.7%</strong>
                <span>confidence</span>

              </div>

              <div>
                <strong>High confidence prediction</strong>

                <p>
                  Next 6 hours show stable renewable generation.
                </p>
              </div>

            </div>


            <div className="forecast-chart">

              <div className="chart-lines"></div>

              <div className="forecast-wave"></div>

              <div className="chart-dot d1"></div>
              <div className="chart-dot d2"></div>
              <div className="chart-dot d3"></div>
              <div className="chart-dot d4"></div>
              <div className="chart-dot d5"></div>

            </div>


            <div className="ai-metrics">

              <div>
                <span>Predicted demand</span>
                <strong>+4.8%</strong>
              </div>

              <div>
                <span>Renewable share</span>
                <strong>82%</strong>
              </div>

            </div>


            <div className="model-name">
              <span>Model</span>
              <strong>XGBoost</strong>
              <span>Forecast Engine</span>
            </div>

          </div>

        </section>


        {/* ================= LOWER SECTION ================= */}

        <section className="lower-grid">


          {/* DIGITAL TWIN */}

          <div className="panel simulation-panel">

            <div className="panel-header">

              <div>
                <span className="section-tag orange">
                  DIGITAL TWIN
                </span>

                <h2>What-If Simulation</h2>
              </div>

              <span className="simulation-status">
                SIMULATOR READY
              </span>

            </div>


            <p className="panel-description">
              Test weather and demand scenarios before applying
              decisions to the real station.
            </p>


            <div className="simulation-controls">

              <div className="slider-control">

                <div>
                  <span>Temperature</span>
                  <strong>{temperature}°C</strong>
                </div>

                <input
                  type="range"
                  min="-40"
                  max="10"
                  value={temperature}
                  onChange={(e) =>
                    setTemperature(Number(e.target.value))
                  }
                />

              </div>


              <div className="slider-control">

                <div>
                  <span>Energy Demand</span>
                  <strong>{demand}%</strong>
                </div>

                <input
                  type="range"
                  min="20"
                  max="100"
                  value={demand}
                  onChange={(e) =>
                    setDemand(Number(e.target.value))
                  }
                />

              </div>

            </div>


            <button
              className={`simulation-button ${
                simulationRunning ? "running" : ""
              }`}
              onClick={() =>
                setSimulationRunning(!simulationRunning)
              }
            >
              {simulationRunning
                ? "● Simulation Running"
                : "Run What-If Simulation →"}
            </button>


            <div className="simulation-results">

              <div>
                <span>Predicted Load</span>
                <strong>{predictedLoad} kW</strong>
              </div>

              <div>
                <span>Renewable Share</span>
                <strong>{renewable}%</strong>
              </div>

              <div>
                <span>Battery Stress</span>

                <strong
                  className={
                    batteryStress === "High"
                      ? "red-text"
                      : batteryStress === "Medium"
                      ? "orange-text"
                      : "green-text"
                  }
                >
                  {batteryStress}
                </strong>

              </div>

            </div>

          </div>


          {/* OPTIMIZATION */}

          <div className="panel optimization-panel">

            <div className="panel-header">

              <div>
                <span className="section-tag green">
                  OPTIMIZATION ENGINE
                </span>

                <h2>Energy Dispatch</h2>
              </div>

              <span className="optimized">
                OPTIMIZED
              </span>

            </div>


            <div className="dispatch-list">

              <div className="dispatch-item">

                <div className="dispatch-label">
                  <span className="dispatch-icon solar-bg">☀</span>
                  Solar
                </div>

                <div className="dispatch-track">
                  <div style={{ width: "72%" }}></div>
                </div>

                <strong>72%</strong>

              </div>


              <div className="dispatch-item">

                <div className="dispatch-label">
                  <span className="dispatch-icon wind-bg">≋</span>
                  Wind
                </div>

                <div className="dispatch-track">
                  <div style={{ width: "58%" }}></div>
                </div>

                <strong>58%</strong>

              </div>


              <div className="dispatch-item">

                <div className="dispatch-label">
                  <span className="dispatch-icon battery-bg">▰</span>
                  Battery
                </div>

                <div className="dispatch-track">
                  <div style={{ width: "32%" }}></div>
                </div>

                <strong>32%</strong>

              </div>


              <div className="dispatch-item">

                <div className="dispatch-label">
                  <span className="dispatch-icon diesel-bg">⚡</span>
                  Diesel
                </div>

                <div className="dispatch-track">
                  <div style={{ width: "14%" }}></div>
                </div>

                <strong>14%</strong>

              </div>

            </div>


            <div className="optimization-footer">

              <span>Optimization objective</span>

              <strong>
                Minimum diesel + maximum renewable
              </strong>

            </div>

          </div>


          {/* SYSTEM HEALTH */}

          <div className="panel health-panel">

            <div className="panel-header">

              <div>
                <span className="section-tag red">
                  SAFETY LAYER
                </span>

                <h2>System Health</h2>
              </div>

              <span className="healthy-badge">
                NORMAL
              </span>

            </div>


            <div className="health-list">

              <div>
                <span>
                  <i></i>
                  Smart Sensors
                </span>

                <strong>ONLINE</strong>
              </div>

              <div>
                <span>
                  <i></i>
                  AI Engine
                </span>

                <strong>ONLINE</strong>
              </div>

              <div>
                <span>
                  <i></i>
                  MQTT Network
                </span>

                <strong>ONLINE</strong>
              </div>

              <div>
                <span>
                  <i></i>
                  Critical Loads
                </span>

                <strong>PROTECTED</strong>
              </div>

            </div>


            <div className="last-alert">
              <span>✓</span>

              <div>
                <strong>No critical anomalies</strong>
                <small>System checked 12 seconds ago</small>
              </div>
            </div>

          </div>

        </section>


        {/* FOOTER */}

        <footer className="footer">

          <span>POLARIS X</span>

          <p>
            Predict • Simulate • Optimize • Protect
          </p>

          <span>v1.0 Prototype</span>

        </footer>

      </main>

    </div>
  );
}

export default App;