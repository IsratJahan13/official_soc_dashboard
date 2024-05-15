import { useState } from "react";
// import reactLogo from './assets/react.svg'
import exitIcon from "./assets/exit.svg";
import "./styles/Reset.css";
import "./styles/App.css";
import Header from "./components/Header";
import LogIns from "./components/LogIns";
import UnusualDataTransfers from "./components/UnusualDataTransfers";
import DeviationsFromNormalBehavior from "./components/DaviationsFromNormalBehavior";
import Malware from "./components/Malware";
import AuthenticationVerificationEvents from "./components/AuthenticationVerificationEvents";

const App = () => {
  return (
    <>
      <Header />
      <main className="main-section">
        <section className="left-sidebar">
          <nav>
            <ul className="nav-li-items">
              <li>Navigation</li>
              <li>Navigation</li>
              <li>Navigation</li>
              <li>Navigation</li>
              <li>Navigation</li>
              <li>Navigation</li>
              <li>Navigation</li>
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
          <div className="flex-row"></div>
        </section>
      </main>
    </>
  );
};

export default App;
