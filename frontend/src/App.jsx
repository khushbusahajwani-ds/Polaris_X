import { useEffect, useState } from "react";
import "./App.css";

const API = "https://polaris-x-backend.onrender.com";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  // ================= LIVE BACKEND DATA =================

  const [temperature, setTemperature] = useState(-18);
  const [demand, setDemand] = useState(68);
  const [solar, setSolar] = useState(428);
  const [wind, setWind] = useState(316);
  const [battery, setBattery] = useState(76);

  const [backendOnline, setBackendOnline] = useState(false);
  const [lastUpdate, setLastUpdate] = useState("--");

  // ================= FORECAST =================

  const [forecast, setForecast] = useState({
    confidence: 94.7,
    predictedDemand: 4.8,
    renewableShare: 82,
    model: "XGBoost",
  });

  // ================= OPTIMIZATION =================

  const [optimization, setOptimization] = useState({
    solar: 72,
    wind: 58,
    battery: 32,
    diesel: 14,
  });

  // ================= DIGITAL TWIN =================

  const [scenarioTemperature, setScenarioTemperature] =
    useState(-18);

  const [scenarioDemand, setScenarioDemand] =
    useState(68);

  const [simulationRunning, setSimulationRunning] =
    useState(false);

  // =====================================================
  // LIVE ENERGY BACKEND
  // =====================================================

  useEffect(() => {
    const getEnergyData = async () => {
      try {
        const response = await fetch(`${API}/api/energy`);

        if (!response.ok) {
          throw new Error("Energy API failed");
        }

        const data = await response.json();

        setSolar(data.solar);
        setWind(data.wind);
        setBattery(data.battery);
        setDemand(data.demand);
        setTemperature(data.temperature);

        setBackendOnline(true);

        setLastUpdate(
          new Date().toLocaleTimeString()
        );
      } catch (error) {
        console.error("Backend connection error:", error);
        setBackendOnline(false);
      }
    };

    getEnergyData();

    // NEW DATA EVERY 4 SECONDS
    const interval = setInterval(
      getEnergyData,
      4000
    );

    return () => clearInterval(interval);
  }, []);

  // =====================================================
  // FORECAST BACKEND
  // =====================================================

  useEffect(() => {
    const getForecast = async () => {
      try {
        const response = await fetch(`${API}/api/forecast`);

        if (!response.ok) return;

        const data = await response.json();

        setForecast({
          confidence: data.confidence,
          predictedDemand:
            data.predicted_demand_change,
          renewableShare:
            data.renewable_share,
          model: data.model,
        });
      } catch (error) {
        console.error("Forecast API error:", error);
      }
    };

    getForecast();

    const interval = setInterval(
      getForecast,
      10000
    );

    return () => clearInterval(interval);
  }, []);

  // =====================================================
  // OPTIMIZATION BACKEND
  // =====================================================

  useEffect(() => {
    const getOptimization = async () => {
      try {
        const response = await fetch(`${API}/api/optimization`);

        if (!response.ok) return;

        const data = await response.json();

        setOptimization({
          solar: data.solar,
          wind: data.wind,
          battery: data.battery,
          diesel: data.diesel,
        });
      } catch (error) {
        console.error(
          "Optimization API error:",
          error
        );
      }
    };

    getOptimization();

    const interval = setInterval(
      getOptimization,
      10000
    );

    return () => clearInterval(interval);
  }, []);

  // =====================================================
  // DIGITAL TWIN
  // =====================================================

  const predictedLoad = Math.round(
    scenarioDemand * 8.4
  );

  const batteryStress =
    scenarioTemperature < -25
      ? "High"
      : scenarioTemperature < -10
      ? "Medium"
      : "Low";

  const runSimulation = () => {
    setSimulationRunning(true);

    setTimeout(() => {
      setSimulationRunning(false);
    }, 2000);
  };

  // =====================================================
  // NAVIGATION
  // =====================================================

  const navigate = (page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  // =====================================================
  // SIDEBAR
  // =====================================================

  const Sidebar = () => (
    <aside className="sidebar">

      <div className="brand">
        <div className="brand-symbol">✦</div>

        <div>
          <h2>
            POLARIS<span> X</span>
          </h2>

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

        <button
          className={`nav-button ${
            activePage === "dashboard"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("dashboard")}
        >
          <span>⌂</span>
          Dashboard
        </button>

        <button
          className={`nav-button ${
            activePage === "forecast"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("forecast")}
        >
          <span>◈</span>
          Energy Forecast
        </button>

        <button
          className={`nav-button ${
            activePage === "digital-twin"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("digital-twin")}
        >
          <span>◇</span>
          Digital Twin
        </button>

        <button
          className={`nav-button ${
            activePage === "optimization"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("optimization")}
        >
          <span>⚙</span>
          Optimization
        </button>

        <button
          className={`nav-button ${
            activePage === "monitoring"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("monitoring")}
        >
          <span>◉</span>
          Live Monitoring
        </button>

        <button
          className={`nav-button ${
            activePage === "alerts"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("alerts")}
        >
          <span>⚠</span>
          Alerts
        </button>

      </nav>

      <div className="sidebar-footer">

        <div className="security-icon">
          ✓
        </div>

        <div>
          <strong>
            Safety Layer Active
          </strong>

          <small>
            All critical loads protected
          </small>
        </div>

      </div>

    </aside>
  );

  // =====================================================
  // HEADER
  // =====================================================

  const Header = ({ title, description }) => (
    <header className="top-header">

      <div>

        <p className="overline">
          SMART ENERGY COMMAND CENTER
        </p>

        <h1>
          POLARIS X <span>{title}</span>
        </h1>

        <p className="header-description">
          {description}
        </p>

      </div>

      <div className="header-right">

        <div className="weather-widget">

          <div className="snow-icon">
            ❄
          </div>

          <div>
            <strong>
              {temperature}°C
            </strong>

            <small>
              Polar Conditions
            </small>
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
  );

  // =====================================================
  // KPI
  // =====================================================

  const Kpis = () => (
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
          {solar}
          <small>kW</small>
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
          {wind}
          <small>kW</small>
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
          {battery}
          <small>%</small>
        </h2>

        <div className="kpi-bar">
          <div
            style={{
              width: `${battery}%`,
            }}
          ></div>
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
          {demand}
          <small>kW</small>
        </h2>

        <div className="kpi-bar">
          <div style={{ width: "54%" }}></div>
        </div>

        <small className="card-note">
          Within safe operating range
        </small>

      </div>

    </section>
  );

  // =====================================================
  // DASHBOARD
  // =====================================================

  const Dashboard = () => (
    <>
      <Header
        title="Dashboard"
        description="AI-powered energy intelligence for polar research stations"
      />

      <Kpis />

      <section className="main-grid">

        <div className="panel energy-panel">

          <div className="panel-header">

            <div>
              <span className="section-tag blue">
                LIVE ENERGY FLOW
              </span>

              <h2>
                Power Generation & Distribution
              </h2>
            </div>

            <span className="time-label">
              Updated {lastUpdate}
            </span>

          </div>

          <div className="energy-flow">

            <div className="source source-solar">
              <div className="source-icon">
                ☀
              </div>

              <strong>Solar</strong>

              <span>
                {solar} kW
              </span>

              <div className="flow-line yellow"></div>
            </div>

            <div className="source source-wind">
              <div className="source-icon">
                ≋
              </div>

              <strong>Wind</strong>

              <span>
                {wind} kW
              </span>

              <div className="flow-line blue"></div>
            </div>

            <div className="station-core">

              <div className="core-ring">

                <div className="core-center">

                  <strong>
                    {solar + wind}
                  </strong>

                  <span>kW</span>

                </div>

              </div>

              <p>Total Generation</p>

            </div>

            <div className="source source-battery">

              <div className="source-icon">
                ▰
              </div>

              <strong>Battery</strong>

              <span>
                {battery}%
              </span>

              <div className="flow-line green"></div>

            </div>

            <div className="source source-load">

              <div className="source-icon">
                ⚡
              </div>

              <strong>Station Load</strong>

              <span>
                {demand} kW
              </span>

              <div className="flow-line purple"></div>

            </div>

          </div>

          <div className="energy-summary">

            <div>
              <span>
                Renewable contribution
              </span>

              <strong className="green-text">
                82%
              </strong>
            </div>

            <div>
              <span>
                Diesel dependency
              </span>

              <strong>4%</strong>
            </div>

            <div>
              <span>
                Grid stability
              </span>

              <strong className="green-text">
                Excellent
              </strong>
            </div>

          </div>

        </div>

        <div className="panel ai-panel">

          <div className="panel-header">

            <div>

              <span className="section-tag purple">
                AI / ML ENGINE
              </span>

              <h2>
                Energy Forecast
              </h2>

            </div>

            <span className="ai-status">
              AI ACTIVE
            </span>

          </div>

          <div className="ai-confidence">

            <div className="confidence-circle">

              <strong>
                {forecast.confidence}%
              </strong>

              <span>
                confidence
              </span>

            </div>

            <div>

              <strong>
                High confidence prediction
              </strong>

              <p>
                Next 6 hours show stable
                renewable generation.
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
              <span>
                Predicted demand
              </span>

              <strong>
                +{forecast.predictedDemand}%
              </strong>
            </div>

            <div>
              <span>
                Renewable share
              </span>

              <strong>
                {forecast.renewableShare}%
              </strong>
            </div>

          </div>

          <div className="model-name">

            <span>Model</span>

            <strong>
              {forecast.model}
            </strong>

            <span>
              Forecast Engine
            </span>

          </div>

        </div>

      </section>

      <section className="lower-grid">

        <div className="panel simulation-panel">

          <div className="panel-header">

            <div>

              <span className="section-tag orange">
                DIGITAL TWIN
              </span>

              <h2>
                What-If Simulation
              </h2>

            </div>

            <span className="simulation-status">
              SIMULATOR READY
            </span>

          </div>

          <p className="panel-description">
            Test weather and demand scenarios before
            applying decisions to the real station.
          </p>

          <div className="simulation-controls">

            <div className="slider-control">

              <div>

                <span>Temperature</span>

                <strong>
                  {scenarioTemperature}°C
                </strong>

              </div>

              <input
                type="range"
                min="-40"
                max="10"
                value={scenarioTemperature}
                onChange={(e) =>
                  setScenarioTemperature(
                    Number(e.target.value)
                  )
                }
              />

            </div>

            <div className="slider-control">

              <div>

                <span>Energy Demand</span>

                <strong>
                  {scenarioDemand}%
                </strong>

              </div>

              <input
                type="range"
                min="20"
                max="100"
                value={scenarioDemand}
                onChange={(e) =>
                  setScenarioDemand(
                    Number(e.target.value)
                  )
                }
              />

            </div>

          </div>

          <button
            className={`simulation-button ${
              simulationRunning
                ? "running"
                : ""
            }`}
            onClick={runSimulation}
          >
            {simulationRunning
              ? "● Simulation Running"
              : "Run What-If Simulation →"}
          </button>

          <div className="simulation-results">

            <div>
              <span>Predicted Load</span>

              <strong>
                {predictedLoad} kW
              </strong>
            </div>

            <div>
              <span>Renewable Share</span>

              <strong>82%</strong>
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

        <div className="panel optimization-panel">

          <div className="panel-header">

            <div>

              <span className="section-tag green">
                OPTIMIZATION ENGINE
              </span>

              <h2>
                Energy Dispatch
              </h2>

            </div>

            <span className="optimized">
              OPTIMIZED
            </span>

          </div>

          <div className="dispatch-list">

            {[
              ["solar-bg", "☀", "Solar", optimization.solar],
              ["wind-bg", "≋", "Wind", optimization.wind],
              ["battery-bg", "▰", "Battery", optimization.battery],
              ["diesel-bg", "⚡", "Diesel", optimization.diesel],
            ].map(([bg, icon, name, value]) => (
              <div className="dispatch-item" key={name}>

                <div className="dispatch-label">

                  <span
                    className={`dispatch-icon ${bg}`}
                  >
                    {icon}
                  </span>

                  {name}

                </div>

                <div className="dispatch-track">

                  <div
                    style={{
                      width: `${value}%`,
                    }}
                  ></div>

                </div>

                <strong>
                  {value}%
                </strong>

              </div>
            ))}

          </div>

          <div className="optimization-footer">

            <span>
              Optimization objective
            </span>

            <strong>
              Minimum diesel + maximum renewable
            </strong>

          </div>

        </div>

        <SystemHealth />

      </section>

      <Footer />
    </>
  );

  // =====================================================
  // FORECAST
  // =====================================================

  const ForecastPage = () => (
    <>
      <Header
        title="Energy Forecast"
        description="AI-powered prediction of station demand and renewable generation"
      />

      <Kpis />

      <section className="main-grid">

        <div className="panel ai-panel">

          <div className="panel-header">

            <div>

              <span className="section-tag purple">
                AI / ML ENGINE
              </span>

              <h2>
                Energy Forecast
              </h2>

            </div>

            <span className="ai-status">
              AI ACTIVE
            </span>

          </div>

          <div className="ai-confidence">

            <div className="confidence-circle">

              <strong>
                {forecast.confidence}%
              </strong>

              <span>
                confidence
              </span>

            </div>

            <div>

              <strong>
                {forecast.model}
              </strong>

              <p>
                Predicted demand change:
                <strong>
                  {" "}
                  +{forecast.predictedDemand}%
                </strong>
              </p>

              <p>
                Renewable share:
                <strong>
                  {" "}
                  {forecast.renewableShare}%
                </strong>
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
              <span>Live Solar</span>
              <strong>{solar} kW</strong>
            </div>

            <div>
              <span>Live Wind</span>
              <strong>{wind} kW</strong>
            </div>

          </div>

        </div>

        <div className="panel health-panel">

          <div className="panel-header">

            <div>

              <span className="section-tag blue">
                LIVE INPUTS
              </span>

              <h2>
                Forecast Conditions
              </h2>

            </div>

          </div>

          <div className="health-list">

            <div>
              <span>Temperature</span>
              <strong>{temperature}°C</strong>
            </div>

            <div>
              <span>Demand</span>
              <strong>{demand} kW</strong>
            </div>

            <div>
              <span>Solar</span>
              <strong>{solar} kW</strong>
            </div>

            <div>
              <span>Wind</span>
              <strong>{wind} kW</strong>
            </div>

            <div>
              <span>Battery</span>
              <strong>{battery}%</strong>
            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );

  // =====================================================
  // DIGITAL TWIN
  // =====================================================

  const DigitalTwinPage = () => (
    <>
      <Header
        title="Digital Twin"
        description="Simulate extreme weather and demand scenarios before implementation"
      />

      <section className="lower-grid">

        <div className="panel simulation-panel">

          <div className="panel-header">

            <div>

              <span className="section-tag orange">
                DIGITAL TWIN
              </span>

              <h2>
                What-If Simulation
              </h2>

            </div>

            <span className="simulation-status">
              {simulationRunning
                ? "SIMULATION RUNNING"
                : "SIMULATOR READY"}
            </span>

          </div>

          <p className="panel-description">
            Adjust conditions and observe predicted
            system behaviour.
          </p>

          <div className="simulation-controls">

            <div className="slider-control">

              <div>
                <span>Temperature</span>

                <strong>
                  {scenarioTemperature}°C
                </strong>
              </div>

              <input
                type="range"
                min="-40"
                max="10"
                value={scenarioTemperature}
                onChange={(e) =>
                  setScenarioTemperature(
                    Number(e.target.value)
                  )
                }
              />

            </div>

            <div className="slider-control">

              <div>
                <span>Energy Demand</span>

                <strong>
                  {scenarioDemand}%
                </strong>
              </div>

              <input
                type="range"
                min="20"
                max="100"
                value={scenarioDemand}
                onChange={(e) =>
                  setScenarioDemand(
                    Number(e.target.value)
                  )
                }
              />

            </div>

          </div>

          <button
            className={`simulation-button ${
              simulationRunning
                ? "running"
                : ""
            }`}
            onClick={runSimulation}
          >
            {simulationRunning
              ? "● Simulation Running"
              : "Run What-If Simulation →"}
          </button>

          <div className="simulation-results">

            <div>
              <span>Predicted Load</span>

              <strong>
                {predictedLoad} kW
              </strong>
            </div>

            <div>
              <span>Renewable Share</span>

              <strong>
                82%
              </strong>
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

        <div className="panel health-panel">

          <div className="panel-header">

            <div>

              <span className="section-tag blue">
                LIVE BASELINE
              </span>

              <h2>
                Current Station
              </h2>

            </div>

          </div>

          <div className="health-list">

            <div>
              <span>Temperature</span>
              <strong>{temperature}°C</strong>
            </div>

            <div>
              <span>Demand</span>
              <strong>{demand} kW</strong>
            </div>

            <div>
              <span>Solar</span>
              <strong>{solar} kW</strong>
            </div>

            <div>
              <span>Wind</span>
              <strong>{wind} kW</strong>
            </div>

            <div>
              <span>Battery</span>
              <strong>{battery}%</strong>
            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );

  // =====================================================
  // OPTIMIZATION
  // =====================================================

  const OptimizationPage = () => (
    <>
      <Header
        title="Optimization"
        description="Multi-source energy dispatch and renewable-first optimization"
      />

      <section className="lower-grid">

        <div className="panel optimization-panel">

          <div className="panel-header">

            <div>

              <span className="section-tag green">
                OPTIMIZATION ENGINE
              </span>

              <h2>
                Energy Dispatch
              </h2>

            </div>

            <span className="optimized">
              OPTIMIZED
            </span>

          </div>

          <div className="dispatch-list">

            {[
              ["solar-bg", "☀", "Solar", optimization.solar],
              ["wind-bg", "≋", "Wind", optimization.wind],
              ["battery-bg", "▰", "Battery", optimization.battery],
              ["diesel-bg", "⚡", "Diesel", optimization.diesel],
            ].map(([bg, icon, name, value]) => (
              <div className="dispatch-item" key={name}>

                <div className="dispatch-label">

                  <span
                    className={`dispatch-icon ${bg}`}
                  >
                    {icon}
                  </span>

                  {name}

                </div>

                <div className="dispatch-track">

                  <div
                    style={{
                      width: `${value}%`,
                    }}
                  ></div>

                </div>

                <strong>
                  {value}%
                </strong>

              </div>
            ))}

          </div>

          <div className="optimization-footer">

            <span>
              Optimization objective
            </span>

            <strong>
              Minimum diesel + maximum renewable
            </strong>

          </div>

        </div>

        <div className="panel energy-panel">

          <div className="panel-header">

            <div>

              <span className="section-tag blue">
                LIVE INPUT
              </span>

              <h2>
                Current Energy Balance
              </h2>

            </div>

          </div>

          <div className="energy-summary">

            <div>
              <span>Solar</span>
              <strong>{solar} kW</strong>
            </div>

            <div>
              <span>Wind</span>
              <strong>{wind} kW</strong>
            </div>

            <div>
              <span>Battery</span>
              <strong>{battery}%</strong>
            </div>

            <div>
              <span>Demand</span>
              <strong>{demand} kW</strong>
            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );

  // =====================================================
  // LIVE MONITORING
  // DIFFERENT FROM DASHBOARD
  // =====================================================

  const MonitoringPage = () => (
    <>
      <Header
        title="Live Monitoring"
        description="Real-time station telemetry and sensor health"
      />

      <section className="kpi-grid">

        <div className="kpi-card solar">

          <div className="kpi-heading">
            <div className="kpi-icon">☀</div>

            <span className="status-badge good">
              LIVE
            </span>
          </div>

          <p>Solar Sensor</p>

          <h2>
            {solar}
            <small>kW</small>
          </h2>

          <small className="card-note">
            Backend telemetry
          </small>

        </div>

        <div className="kpi-card wind">

          <div className="kpi-heading">
            <div className="kpi-icon">≋</div>

            <span className="status-badge good">
              LIVE
            </span>
          </div>

          <p>Wind Sensor</p>

          <h2>
            {wind}
            <small>kW</small>
          </h2>

          <small className="card-note">
            Backend telemetry
          </small>

        </div>

        <div className="kpi-card battery">

          <div className="kpi-heading">
            <div className="kpi-icon">▰</div>

            <span className="status-badge healthy">
              LIVE
            </span>
          </div>

          <p>Battery Sensor</p>

          <h2>
            {battery}
            <small>%</small>
          </h2>

          <small className="card-note">
            Storage telemetry
          </small>

        </div>

        <div className="kpi-card demand">

          <div className="kpi-heading">
            <div className="kpi-icon">⚡</div>

            <span className="status-badge warning">
              LIVE
            </span>
          </div>

          <p>Demand Sensor</p>

          <h2>
            {demand}
            <small>kW</small>
          </h2>

          <small className="card-note">
            Station load telemetry
          </small>

        </div>

      </section>

      <section className="main-grid">

        <div className="panel energy-panel">

          <div className="panel-header">

            <div>

              <span className="section-tag blue">
                REAL-TIME TELEMETRY
              </span>

              <h2>
                Sensor Readings
              </h2>

            </div>

            <span className="time-label">
              {backendOnline
                ? `CONNECTED • ${lastUpdate}`
                : "BACKEND OFFLINE"}
            </span>

          </div>

          <div className="health-list">

            <div>
              <span>
                Solar Generation
              </span>

              <strong>
                {solar} kW
              </strong>
            </div>

            <div>
              <span>
                Wind Generation
              </span>

              <strong>
                {wind} kW
              </strong>
            </div>

            <div>
              <span>
                Battery State
              </span>

              <strong>
                {battery}%
              </strong>
            </div>

            <div>
              <span>
                Station Demand
              </span>

              <strong>
                {demand} kW
              </strong>
            </div>

            <div>
              <span>
                Temperature
              </span>

              <strong>
                {temperature}°C
              </strong>
            </div>

          </div>

        </div>

        <SystemHealth />

      </section>

      <Footer />
    </>
  );

  // =====================================================
  // SYSTEM HEALTH
  // =====================================================

  function SystemHealth() {
    return (
      <div className="panel health-panel">

        <div className="panel-header">

          <div>

            <span className="section-tag red">
              SAFETY LAYER
            </span>

            <h2>
              System Health
            </h2>

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

            <strong>
              {backendOnline
                ? "ONLINE"
                : "OFFLINE"}
            </strong>
          </div>

          <div>
            <span>
              <i></i>
              AI Engine
            </span>

            <strong>
              ONLINE
            </strong>
          </div>

          <div>
            <span>
              <i></i>
              MQTT Network
            </span>

            <strong>
              ONLINE
            </strong>
          </div>

          <div>
            <span>
              <i></i>
              Critical Loads
            </span>

            <strong>
              PROTECTED
            </strong>
          </div>

        </div>

        <div className="last-alert">

          <span>✓</span>

          <div>

            <strong>
              No critical anomalies
            </strong>

            <small>
              Live monitoring active
            </small>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // ALERTS
  // =====================================================

  const AlertsPage = () => (
    <>
      <Header
        title="Alerts"
        description="Safety layer, early warnings and critical-load protection"
      />

      <section className="lower-grid">

        <SystemHealth />

        <div className="panel optimization-panel">

          <div className="panel-header">

            <div>

              <span className="section-tag orange">
                LIVE CONDITIONS
              </span>

              <h2>
                Current Station Status
              </h2>

            </div>

          </div>

          <div className="dispatch-list">

            <div className="dispatch-item">
              <div className="dispatch-label">
                Temperature
              </div>

              <strong>
                {temperature}°C
              </strong>
            </div>

            <div className="dispatch-item">
              <div className="dispatch-label">
                Energy Demand
              </div>

              <strong>
                {demand} kW
              </strong>
            </div>

            <div className="dispatch-item">
              <div className="dispatch-label">
                Battery
              </div>

              <strong>
                {battery}%
              </strong>
            </div>

            <div className="dispatch-item">
              <div className="dispatch-label">
                Renewable Generation
              </div>

              <strong>
                {solar + wind} kW
              </strong>
            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );

  // =====================================================
  // FOOTER
  // =====================================================

  const Footer = () => (
    <footer className="footer">

      <span>POLARIS X</span>

      <p>
        Predict • Simulate • Optimize • Protect
      </p>

      <span>
        v1.0 Prototype
      </span>

    </footer>
  );

  // =====================================================
  // PAGE ROUTER
  // =====================================================

  const renderPage = () => {
    switch (activePage) {

      case "forecast":
        return <ForecastPage />;

      case "digital-twin":
        return <DigitalTwinPage />;

      case "optimization":
        return <OptimizationPage />;

      case "monitoring":
        return <MonitoringPage />;

      case "alerts":
        return <AlertsPage />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="polaris-app">

      <Sidebar />

      <main className="main-content">
        {renderPage()}
      </main>

    </div>
  );
}

export default App;
