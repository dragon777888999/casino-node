import React from "react";
import HelmetManager from "../../comp/HelmetManager";
import DemoHeader from "../../comp/demo/DemoHeader";
import "../../styles/pages/winratio.scss";
import Header from "./winRatio/Header";
import SubHeader from "./winRatio/SubHeader";
import Table from "./winRatio/Table";

import useIsDemoModeActive from "../../utils/demo/useIsDemoModeActive";

const WinRatio = () => {

  const isDemoModeActive = useIsDemoModeActive();

  return (
    <div className={`wr_wrap${isDemoModeActive ? ' demo' : ''}`}>
      <HelmetManager
        title="Win Ratio"
        description="Win Ratio Tournament: Join the Exclusive Competition to Analyze Your Win Ratio and Performance Metrics. Compete with Top Traders and Gamers to Showcase Your Skills and Earn Rewards."
        keywords="Crypto tournament, Best crypto traders, top crypto traders, top crypto gamers, trading bot, earn rewards, Up vs Down"
        canonical="/win_ratio"
      />

      <DemoHeader pathName="/win_ratio" />

      <div className="top_bg" />
      <Header />
      <SubHeader />
      <Table />
    </div>
  );

};

export default WinRatio;
