import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import UrlValidator from "../../helper/UrlValidator";
import useLocalStorage from "../../hooks/useLocalStorage";
import { v4 } from "uuid";
import {
  AiOutlineCheckCircle,
  AiOutlineCopy,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import Modal from "../../components/Modal";
import SettingsPageHeader from "./SettingsPageHeader";
import Container from "../../components/Container";
import { useMediaQuery } from "react-responsive";

export default function Endpoints() {
  const [apiData, { addItem, replaceItemByID }] = useLocalStorage("apiData");
  const [formOpen, setFormOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const currentAPI = useRef();

  return (
    <>
      <SettingsPageHeader header={"API Endpoints"} />

      <div className="flex my-2">
        <button
          className="border text-sm text-gray-600"
          onClick={() => {
            setFormOpen(true);
          }}
        >
          Add
        </button>
      </div>
      <ApiTable
        apiData={apiData}
        currentAPI={currentAPI}
        setInfoOpen={setInfoOpen}
      />

      <Modal isOpen={formOpen} setModal={setFormOpen}>
        <ApiInputTester addItem={addItem} apiData={apiData} />
      </Modal>
      <Modal isOpen={infoOpen} setModal={setInfoOpen}>
        <ApiInfo
          currentAPI={currentAPI}
          apiData={apiData}
          setInfoOpen={setInfoOpen}
          replaceItemByID={replaceItemByID}
        />
      </Modal>
    </>
  );
}

const ApiInfo = ({ currentAPI, apiData, setInfoOpen, replaceItemByID }) => {
  const [api, setApi] = useState();
  const urlRef = useRef();
  const isHeightToSmall = useMediaQuery({ maxHeight: 639 });
  const handleReverify = async () => {
    const r = await axios(
      api.url
      //  ,{
      //  timeout: 10000,
      //  timeoutErrorMessage: "Request Timeout - Request exceeded 10s.",
      //}
    );
    console.log(r.data);
    let status;
    if (r.status === 200) {
      console.log("Successfully Verified");
      if (r.headers["content-type"].includes("application/json")) {
        const payload = api.key ? r.data[api.key] : r.data;
        console.log(payload);
        if (!payload) {
          alert("Payload is empty, please check key");
          status = "Empty";
          replaceItemByID(api.id, {
            ...api,
            status,
            lastChecked: Date.now(),
            id: api.id,
          });
          return;
        }
        alert("The API is working!");
        console.log("allgoodsofar");
        status = "Ok";
        replaceItemByID(api.id, {
          ...api,
          status,
          lastChecked: Date.now(),
          payload,
          id: api.id,
        });
        return;
      }
      status = "Invalid";
      replaceItemByID(api.id, {
        ...api,
        status,
        lastChecked: Date.now(),
        id: api.id,
      });
      alert("Response not JSON");
      return;
    }
    alert("Invalid Request");
    status = "Failed";
    replaceItemByID(api.id, {
      ...api,
      status,
      lastChecked: Date.now(),
      id: api.id,
    });
  };

  useEffect(() => {
    setApi(apiData.filter((a) => a.id === currentAPI.current)[0]);
  }, [currentAPI.current]);

  return (
    <div className="p-4">
      {api ? (
        <>
          <h2 className="mb-2">API Data - {api.name}</h2>

          <div className="my-2">
            <div className="flex flex-col">
              <label>Name</label>
              <input type="text" readOnly={true} value={api.name} />
            </div>
          </div>
          <div className="my-2">
            <label>Url</label>
            <div className="flex justify-between space-x-2">
              <input
                ref={urlRef}
                className="w-full"
                type="text"
                readOnly={true}
                value={api.url}
              />
              <button
                className="outline-none border"
                onClick={(e) => {
                  urlRef.current.select();
                  document.execCommand("copy");
                  e.currentTarget.focus();
                }}
              >
                <AiOutlineCopy />
              </button>
            </div>
          </div>

          {!isHeightToSmall && (
            <code className="w-full">
              <pre
                style={{ height: "30vh" }}
                className="block my-2 max-w-xs w-full sm:max-w-prose h-80 overflow-auto text-sm rounded bg-gray-100"
              >
                {JSON.stringify(api.payload, null, "\t")}
              </pre>
            </code>
          )}
          <div className="flex justify-between mt-4">
            <button
              className="border text-gray-600"
              onClick={() => {
                setInfoOpen(false);
              }}
            >
              Close
            </button>
            <button
              className="border text-gray-600"
              onClick={() => {
                handleReverify();
              }}
            >
              Re-Verify
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

const ApiTable = ({ apiData, currentAPI, setInfoOpen }) => (
  <div className="table table-fixed border-separate w-full rounded-t overflow-hidden">
    <div className="w-full table-header-group overflow-hidden">
      <div className="table-row">
        <div className="w-2/12 table-cell border border-r-0 bg-gray-50 border-gray-200 p-2 rounded-l-lg text-gray-600 font-normal overflow-hidden text-sm text-left ">
          Name
        </div>
        <div className="w-2/12 table-cell border-t border-b bg-gray-50 border-gray-200 p-2 text-gray-600 font-normal overflow-hidden text-sm text-left">
          Key
        </div>
        <div className="w-6/12 table-cell border-t border-b bg-gray-50 border-gray-200 p-2 text-gray-600 font-normal overflow-hidden text-sm text-left">
          Url
        </div>
        <div className="w-2/12 table-cell border border-l-0 bg-gray-50 border-gray-200 p-2 rounded-r-lg text-gray-600 font-normal overflow-hidden text-sm text-left">
          Status
        </div>
      </div>
    </div>
    {apiData.map((ad, i) => (
      <div
        className="table-row cursor-pointer"
        key={ad.id}
        data-id={ad.id}
        onClick={(e) => {
          console.log(e.currentTarget.dataset.id);
          currentAPI.current = e.currentTarget.dataset.id;
          setInfoOpen(true);
        }}
      >
        <div
          className={`table-cell border-gray-200 p-2 text-gray-600 font-normal text-sm text-left overflow-hidden whitespace-nowrap ${
            i !== 0 ? "border-t" : "border-none"
          }`}
        >
          {ad.name}
        </div>
        <div
          className={`table-cell border-gray-200 p-2 text-gray-600 font-normal text-sm text-left overflow-hidden whitespace-nowrap ${
            i !== 0 ? "border-t" : "border-none"
          }`}
        >
          {ad.key || "-"}
        </div>
        <div
          className={`min-w-1/2 table-cell border-gray-200 p-2 text-gray-600 font-normal text-sm text-left overflow-hidden whitespace-nowrap ${
            i !== 0 ? "border-t" : "border-none"
          }`}
        >
          {ad.url}
        </div>
        <div
          className={`table-cell border-gray-200 p-2 text-gray-600 font-normal capitalize text-sm text-left overflow-hidden whitespace-nowrap ${
            i !== 0 ? "border-t" : "border-none"
          }`}
        >
          {ad.status}
        </div>
      </div>
    ))}
  </div>
);

const ApiInputTester = ({ apiData, addItem }) => {
  const defaultApi = { name: "", url: "", key: "" };
  const [api, setApi] = useState({ name: "", url: "", key: "" });
  const [err, setErr] = useState({ name: "", url: "", key: "" });

  const handleOnChange = (e) => {
    setApi((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  };

  const handleError = (obj) => {
    setErr((prev) => ({ ...prev, ...obj }));
  };

  const clearApi = (n = "") => {
    if (!n) {
      setApi(defaultApi);
      return;
    }
    setApi((prev) => ({ ...prev, [n]: "" }));
  };

  const verifyAPI = async ({ url, name, key }) => {
    if (!name || !url) {
      if (!name) {
        handleError({ name: "Please set name" });
      }
      if (!url) {
        handleError({ url: "Please fill in url" });
      }
      setTimeout(() => handleError({ name: "", url: "", key: "" }), 2000);
      return;
    }

    try {
      const r = await axios(url, {
        timeout: 10000,
        timeoutErrorMessage: "Request Timeout - Request exceeded 10s.",
      });
      let status;
      console.log(r);
      if (r.status === 200) {
        console.log("Successfully Verified");
        if (r.headers["content-type"].includes("application/json")) {
          const keys = key.split(".").filter((k) => !!k);
          const payload = keys.reduce((a, b) => a[b], r.data);
          //const payload = key ? r.data[key] : r.data;z
          console.log(payload);
          if (!payload) {
            alert("Payload is empty, please check key");
            handleError({ key: "No data with this key" });
            return;
          }
          status = "Ok";
          addItem({
            ...api,
            status,
            lastChecked: Date.now(),
            payload,
            id: v4(),
          });
          clearApi();
          return;
        }
        alert("Response not JSON");
        clearApi("url");
        return;
      }
      alert("Invalid Request");
      clearApi("url");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 w-96">
      <h2 className="mb-2">Add API Endpoint</h2>
      <div className="relative mb-4">
        <label>Name</label>
        <input
          className={`block rounded-l outline-none border px-1.5 py-1 w-full text-sm ${
            err.name ? "border-red-500" : null
          }`}
          type="text"
          name="name"
          value={api.name}
          onChange={(e) => {
            const name = e.target.value.trim();
            if (apiData.filter((d) => d.name === name).length > 0) {
              handleError({ name: "Duplicate Name" });
            } else {
              handleError({ name: "" });
            }
            handleOnChange(e);
          }}
          autoComplete="off"
          placeholder="Ready Stocks"
        />
        <p className="absolute text-xs text-red-500 left-0 top-14">
          {err.name && err.name}
        </p>
      </div>
      <div className=" relative mb-4">
        <label>Key</label>
        <input
          className={`block  outline-none border-t border-b px-1.5 py-1 w-full text-sm ${
            err.key ? "border-red-500" : null
          }`}
          type="text"
          name="key"
          value={api.key}
          onChange={(e) => {
            const key = e.target.value.trim();
            handleError({ key: "" });
            handleOnChange(e);
          }}
          autoComplete="off"
          placeholder="data.latest.products"
        />
        <p className="absolute text-xs text-red-500 left-0 top-14">
          {err.key && err.key}
        </p>
      </div>
      <div className=" relative mb-4 w-auto">
        <label>Url</label>
        <input
          className={`block outline-none border px-1.5 py-1 w-full text-sm ${
            err.url ? "border-red-500" : null
          }`}
          type="text"
          name="url"
          value={api.url}
          onChange={(e) => {
            const url = e.target.value.trim();
            if (!UrlValidator(url)) {
              handleError({ url: "Invalid Url" });
            } else {
              handleError({ url: "" });
            }
            handleOnChange(e);
          }}
          autoComplete="off"
          placeholder="E.g. https://www.example.com/api/v2/getData"
        />

        <p className="absolute text-xs text-red-500 left-0 top-14">
          {err.url && err.url}
        </p>
      </div>
      <div className="flex mt-4 justify-end">
        <button
          className="  bg-indigo-300"
          onClick={() => {
            verifyAPI(api);
          }}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

const VerifiedAPI = ({ ad }) => {
  return (
    <div className="flex my-1.5 items-center ">
      <div className="block  outline-none  px-1.5 py-1 mr-3 w-40">
        {ad.name}
      </div>
      <div className="block  outline-none  px-1.5 py-1 mr-3 w-40">{ad.key}</div>
      <input
        readOnly
        className="block rounded outline-none border px-1.5 py-1 w-80 text-sm"
        value={ad.url}
      />
      <button className="rounded h-full mx-3 bg-blue-500 text-white px-2.5">
        Test
      </button>
      <div>
        {Date.now() - ad.lastChecked > 1000 * 60 * 60 * 24 * 3 ? (
          <AiOutlineExclamationCircle className="text-yellow-500 text-xl" />
        ) : (
          <AiOutlineCheckCircle className="text-green-500 text-xl" />
        )}
      </div>
    </div>
  );
};
