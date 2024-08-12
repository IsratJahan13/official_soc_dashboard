import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import exitIcon from "./assets/exit.svg";
import "./styles/Reset.css";
import "./styles/App.css";
import Header from "./components/Header";
import LogIns from "./components/LogIns";
import UnusualDataTransfers from "./components/UnusualDataTransfers";
import DeviationsFromNormalBehavior from "./components/DeviationsFromNormalBehavior";
import Malware from "./components/Malware";
import AuthenticationVerificationEvents from "./components/AuthenticationVerificationEvents";
import ServerLogs from "./components/ServerLogs";
import FirewallLogs from "./components/FirewallLogs";
import RouterLogs from "./components/RouterLogs";
import WorkstationLogs from "./components/WorkstationLogs";

const Home = () => {
  return (
    <>
      <div className="flex-row">
        <div className="flex-column">
          <LogIns />
          <AuthenticationVerificationEvents />
          <Malware />
        </div>
        <div className="flex-column">
          <UnusualDataTransfers />
          <DeviationsFromNormalBehavior />
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router basename="/official_soc_dashboard">
      <>
        <Header />
        <main className="main-section">
          <section className="left-sidebar">
            <nav>
              <ul className="nav-li-items">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Etusivu
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/server-logs"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Palvelinlokit
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/firewall-logs"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Palomuurin lokit
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/router-logs"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Reitittimen lokit
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/workstation-logs"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Työaseman lokit
                  </NavLink>
                </li>
              </ul>
            </nav>
          </section>
          <section className="graphs-section">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/server-logs" element={<ServerLogs />} />
              <Route path="/firewall-logs" element={<FirewallLogs />} />
              <Route path="/router-logs" element={<RouterLogs />} />
              <Route path="/workstation-logs" element={<WorkstationLogs />} />
            </Routes>
          </section>
        </main>
      </>
    </Router>
  );
};

export default App;
