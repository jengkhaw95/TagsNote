import React, { useRef, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { v4 } from "uuid";
import { AiOutlineDelete, AiOutlineReload } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import hex2rgba from "../../helper/hex2rgba";
import randomHexColorGenerator from "../../helper/randomHexColorGenerator";
import Modal from "../../components/Modal";
import SettingsPageHeader from "./SettingsPageHeader";
import Container from "../../components/Container";
import Tag from "../../components/Tag";

export default function Tags() {
  const [tags, { addItem, removeItemByID }] = useLocalStorage("tags");
  const [tagInputOpen, setTagInputOpen] = useState(false);
  return (
    <>
      <SettingsPageHeader header={"Tags"} />
      <div className="flex justify-between items-center my-4">
        <p className="text-sm text-gray-600">
          You have {`${tags.length} tag${tags.length ? "s" : ""}`} in total.
        </p>
        <button
          className=" border text-gray-600"
          onClick={() => setTagInputOpen(true)}
        >
          Add Tag
        </button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 p-4 rounded-lg border">
        {tags &&
          tags.map((t) => (
            <TagCard key={t.id} {...t} removeItemByID={removeItemByID} />
          ))}
      </div>
      <Modal isOpen={tagInputOpen} setModal={setTagInputOpen}>
        <TagInput
          addItem={addItem}
          tags={tags}
          setTagInputOpen={setTagInputOpen}
        />
      </Modal>
    </>
  );
}

const TagCover = (t) => {
  const { full } = t;
  return (
    <div
      className={`w-full flex justify-center items-center overflow-hidden ${
        full ? "rounded h-32" : "rounded-t h-20"
      }`}
      style={{
        backgroundColor: hex2rgba(t.color, 0.1),
      }}
    >
      {t.children}
    </div>
  );
};

const TagCard = (t) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const currentTarget = useRef();
  return (
    <div className="rounded flex flex-col border">
      <TagCover {...t}>
        <Tag {...t} />
      </TagCover>
      {!t.full && (
        <div className="rounded-b p-4">
          <div className="flex justify-between items-center h-8">
            <p className="text-xs">{`Used in ${t.count || "0"} ${
              t.count > 1 ? "notes" : "note"
            }`}</p>
            <button
              className="border rounded p-2"
              data-id={t.id}
              onClick={(e) => {
                currentTarget.current = e.currentTarget;
                setConfirmationOpen(true);
                //t.removeItemByID(e.currentTarget.dataset.id);
              }}
            >
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      )}
      <Modal isOpen={confirmationOpen} setModal={setConfirmationOpen}>
        <TagDelete
          {...t}
          setConfirmationOpen={setConfirmationOpen}
          currentTarget={currentTarget}
        />
      </Modal>
    </div>
  );
};

const TagDelete = (t) => {
  const { currentTarget, setConfirmationOpen } = t;
  return (
    <div className="p-4 w-60">
      <h3 className="mb-2">Delete?</h3>
      <TagCard {...t} full={true} />
      <div className="flex justify-between mt-4">
        <button
          className="border text-gray-600"
          onClick={() => setConfirmationOpen(false)}
        >
          Cancel
        </button>
        <button
          className="border text-gray-600"
          onClick={() => {
            t.removeItemByID(currentTarget.current.dataset.id);
            setConfirmationOpen(false);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const TagInput = ({ addItem, tags, setTagInputOpen }) => {
  const defaultTag = {
    id: v4(),
    value: "",
    color: randomHexColorGenerator(),
  };
  const defaultErr = { value: "", color: "" };
  const [tag, setTag] = useState(defaultTag);
  const [err, setErr] = useState(defaultErr);

  const randomizeColor = () => {
    setTag((prev) => ({ ...prev, color: randomHexColorGenerator() }));
  };

  const handleOnChange = (e) => {
    setTag((prev) => {
      const nv = e.target.value.toUpperCase();
      return { ...prev, [e.target.name]: nv };
    });
  };

  const handleError = (obj) => {
    setErr((prev) => ({ ...prev, ...obj }));
  };

  const handleTag = ({ value, color }) => {
    if (!value) {
      handleError({ value: "Please input Tag Name" });
      setTimeout(() => handleError(defaultErr), 2000);
      return;
    }

    if (err.color || err.value) {
      return;
    }

    addItem({ ...tag, count: 0, createdAt: Date.now() });
    setTag(defaultTag);
  };

  return (
    <>
      <div className="p-4 rounded w-60">
        <h3 className="mb-2">Add Tag</h3>
        {tag.color && (
          <div
            className="rounded w-full h-32 flex justify-center items-center overflow-hidden cursor-pointer"
            onClick={() => {
              randomizeColor();
            }}
            style={{
              aspectRatio: 16 / 9,
              backgroundColor: hex2rgba(tag.color, 0.1),
            }}
          >
            <div className="flex flex-col items-center">
              {/*{tag.value && <Tag {...tag} color={hex2rgb(tag.color)} />}*/}
              {tag.value ? (
                <Tag {...tag} color={tag.color} />
              ) : (
                <BsBookmarkPlus
                  style={{
                    color: hex2rgba(tag.color, 1),
                  }}
                  className="text-lg"
                />
              )}
              <div className="flex items-center">
                <div
                  className="text-xs select-none text-center"
                  style={{
                    color: hex2rgba(tag.color, 1),
                  }}
                >
                  Click to randomize color
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="rounded-b my-4 w-full">
          <div className="flex items-center overflow-hidden h-8 w-full">
            <div className="relative h-full ">
              <input
                className={` outline-none border  h-full w-full  ${
                  err.value ? "border-red-500" : ""
                }`}
                type="text"
                name="value"
                value={tag.value}
                onChange={(e) => {
                  const val = e.target.value;
                  if (
                    tags.filter((t) => t.value === val.toUpperCase()).length > 0
                  ) {
                    handleError({ value: "Duplicate Tag" });
                  } else {
                    handleError({ value: "" });
                  }
                  handleOnChange(e);
                }}
                autoComplete="off"
                placeholder="Tag Name"
                autoCapitalize="characters"
              />
              <p className="absolute text-xs text-red-500 left-0 top-8">
                {err.value}
              </p>
            </div>
            <div className="relative h-full ">
              <input
                className={` outline-none px-1.5 py-1 w-8 h-8  ${
                  err.color ? "border-red-500" : ""
                }`}
                style={{ WebkitAppearance: "none" }}
                type="color"
                name="color"
                value={tag.color}
                onChange={(e) => {
                  const color = e.target.value;
                  if (
                    tags.filter(
                      (t) => JSON.stringify(t.color) === JSON.stringify(color)
                    ).length > 0
                  ) {
                    handleError({ color: "Duplicate Color" });
                  } else {
                    handleError({ color: "" });
                  }
                  handleOnChange(e);
                }}
                autoComplete="off"
              />
              <p className="absolute text-xs text-red-500 left-0 top-8">
                {err.color}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <button
            className="border text-gray-600"
            onClick={() => setTagInputOpen(false)}
          >
            Cancel
          </button>
          <button
            className="border text-gray-600"
            onClick={() => {
              handleTag(tag);
              //t.removeItemByID(currentTarget.current.dataset.id);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};
