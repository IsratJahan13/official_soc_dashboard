import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import exitIcon from "./assets/exit.svg";
import "./styles/Reset.css";
import "./styles/App.css";
import Header from "./components/Header";
import LogIns from "./components/LogIns";
import UnusualDataTransfers from "./components/UnusualDataTransfers";
import DeviationsFromNormalBehavior from "./components/DaviationsFromNormalBehavior";
import Malware from "./components/Malware";
import AuthenticationVerificationEvents from "./components/AuthenticationVerificationEvents";
import ServerLogs from "./components/ServerLogs";
import FirewallLogs from "./components/FirewallLogs";
import RouterLogs from "./components/RouterLogs";
import WorkstationLogs from "./components/WorkstationLogs";

const Home = () => (
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

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <main className="main-section">
          <section className="left-sidebar">
            <nav>
              <ul className="nav-li-items">
                <li>
                  <Link to="/">Etusivu</Link>
                </li>
                <li>
                  <Link to="/server-logs">Palvelinlokit</Link>
                </li>
                <li>
                  <Link to="/firewall-logs">Palomuurin lokit</Link>
                </li>
                <li>
                  <Link to="/router-logs">Reitittimen lokit</Link>
                </li>
                <li>
                  <Link to="/workstation-logs">Työaseman lokit</Link>
                </li>
              </ul>
            </nav>
            <button className="exit-button">
              <span>
                <figure className="mode-frame">
                  <img className="exit-icon" src={exitIcon}></img>
                </figure>
              </span>
              Exit
            </button>
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
