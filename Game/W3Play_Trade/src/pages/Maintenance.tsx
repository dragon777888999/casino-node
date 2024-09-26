import React from "react";
import APP from "../app";

const Maintenance = () => (
    <div className="maintenance_wrap">
        <p className="header">{APP.term('maintenance_header')}</p>
        <img src='https://static.wixstatic.com/media/5b2f3d_f83b1aef65ef41b6af2f9ac63b078f7b~mv2.gif' className="main_img" />
        <p>
            <em>{APP.term("maintenance_desc")}</em>
        </p>
    </div>
)

export default Maintenance;