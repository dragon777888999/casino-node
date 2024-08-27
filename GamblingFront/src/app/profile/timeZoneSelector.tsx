// components/TimeZoneSelector.js
import React, { useState } from "react";
import { Switch } from "@nextui-org/react";

const TimeZoneSelector = () => {
  const [timeZone, setTimeZone] = useState("UTC -07:00");
  const [isCurrentZone, setIsCurrentZone] = useState(true);
  const [isSelected, setIsSelected] = useState(true);
  const [isHidden, setIsHidden] = useState(true);
  const handleTimeZoneChange = (e) => {
    setTimeZone(e.target.value);
  };

  const handleToggle = () => {
    setIsCurrentZone(!isCurrentZone);
  };
  const timeZones = [
    "UTC -12:00",
    "UTC -11:00",
    "UTC -10:00",
    "UTC -09:00",
    "UTC -08:00",
    "UTC -07:00",
    "UTC -06:00",
    "UTC -05:00",
    "UTC -04:00",
    "UTC -03:00",
    "UTC -02:00",
    "UTC -01:00",
    "UTC 00:00",
    "UTC +01:00",
    "UTC +02:00",
    "UTC +03:00",
    "UTC +04:00",
    "UTC +05:00",
    "UTC +06:00",
    "UTC +07:00",
    "UTC +08:00",
    "UTC +09:00",
    "UTC +10:00",
    "UTC +12:00",
    "UTC +13:00",
    "UTC +14:00",
    // Add more time zones as needed
  ];

  return (
    <div
      className="flex items-center gap-3 p-1"
      style={{
        borderRadius: "5px",
      }}
    >
      <label>{timeZone}</label>
      {!isHidden && (
        <select
          value={timeZone}
          onChange={handleTimeZoneChange}
          disabled={isCurrentZone}
          style={{
            backgroundColor: "rgb(43 51 68)",
            color: "#fff",
            border: "none",
            padding: "10px 10px",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        >
          {timeZones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      )}
      <div className="flex flex-col gap-2">
        <Switch
          size="sm"
          isSelected={isSelected}
          onValueChange={() => {
            setIsSelected(!isSelected);
            handleToggle();
          }}
        >
          <label style={{ color: "#89899f" }}>Current Time Zone</label>
        </Switch>
      </div>
    </div>
  );
};

export default TimeZoneSelector;
