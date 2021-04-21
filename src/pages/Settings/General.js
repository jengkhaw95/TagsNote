import React, { useState } from "react";
import { AiOutlineBorder } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import useLocalStorage from "../../hooks/useLocalStorage";
import SettingsPageHeader from "./SettingsPageHeader";

export default function General() {
  const [_, { removeAllItems: rn }] = useLocalStorage("notes");
  const [__, { removeAllItems: rt }] = useLocalStorage("tags");
  const [config, { addItem }] = useLocalStorage("config", {});
  return (
    <>
      <SettingsPageHeader header="General" />
      <div className="p-4 rounded-lg border my-4">
        <h3 className="pb-3 border-b">Theme</h3>
        <div className="flex items-center justify-between py-2 ">
          <label htmlFor="bookmarkColor" className="w-full flex items-center">
            <BsBookmark
              className="mr-2"
              style={{ color: config.bookmarkColor || "#000" }}
            />
            Bookmark
          </label>
          <input
            className="h-6 w-6 ml-2 bg-transparent"
            type="color"
            name="bookmarkColor"
            id="bookmarkColor"
            defaultValue={config.bookmarkColor || "#000"}
            value={config.bookmarkColor || "#000"}
            onChange={(e) => {
              addItem({ bookmarkColor: e.target.value });
            }}
          />
        </div>
        <div className="flex items-center justify-between py-2 ">
          <label htmlFor="checkboxColor" className="w-full flex items-center">
            <AiOutlineBorder
              className="mr-2"
              style={{ color: config.checkboxColor || "#000" }}
            />
            Checkbox
          </label>
          <input
            className="h-6 w-6 ml-2 bg-transparent"
            type="color"
            name="checkboxColor"
            id="checkboxColor"
            defaultValue={config.checkboxColor || "#000"}
            value={config.checkboxColor || "#000"}
            onChange={(e) => {
              addItem({ checkboxColor: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="p-4 rounded-lg border my-4">
        <h3 className="pb-3 border-b">Reset All Data</h3>
        <p className="py-2">
          Reset all saved data on this device. It can not be undone.
        </p>
        <div className="flex my-2">
          <button
            className="border"
            onClick={() => {
              rn();
              rt();
            }}
          >
            Reset Data
          </button>
        </div>
      </div>
    </>
  );
}
