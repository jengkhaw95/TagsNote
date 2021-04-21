import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

export default function BackToSettingsNavButton() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? (
    <div className="flex justify-center items-center">
      <Link to="/settings">
        <AiOutlineArrowLeft className="text-lg mr-2" />
      </Link>
    </div>
  ) : null;
}
