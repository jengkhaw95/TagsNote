import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ isOpen, children, setModal }) {
  const handleCloseModalShortcuts = (e) => {
    const closeOnKeys = [27];
    if (closeOnKeys.includes(e.keyCode)) {
      setModal(false);
    }
    return;
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => handleCloseModalShortcuts(e));
    return () => {
      window.removeEventListener("keydown", (e) =>
        handleCloseModalShortcuts(e)
      );
    };
  }, []);

  return isOpen
    ? ReactDOM.createPortal(
        <div
          onClick={() => setModal(false)}
          className="fixed top-0 w-screen min-h-screen z-20 bg-opacity-10 bg-gray-800 flex flex-col items-center "
          style={{ paddingTop: "10vh" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg  shadow-sm"
            style={{ maxHeight: "80vh" }}
          >
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
}
