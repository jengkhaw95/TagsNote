import React from "react";
import BackToSettingsNavButton from "./BackToSettingsNavButton";

export default function SettingsPageHeader({ header }) {
  return (
    <div className="flex items-center my-2">
      <BackToSettingsNavButton />
      <h1>{header}</h1>
    </div>
  );
}
