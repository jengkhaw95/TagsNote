import React, { useState } from "react";
import { AiFillCheckSquare, AiOutlineBorder } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import Select from "react-select";
import { v4 } from "uuid";
import Container from "../../components/Container";
import Modal from "../../components/Modal";
import Tag from "../../components/Tag";
import hex2rgba from "../../helper/hex2rgba";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Notes() {
  const [formOpen, setFormOpen] = useState(false);
  const [notes, { addItem, updateItem }] = useLocalStorage("notes");
  const [tags, { updateItem: updateTag }] = useLocalStorage("tags");
  const [config, _] = useLocalStorage("config", {});

  const handleToggleIsArchived = (id) => {
    updateItem((i) => (i.id === id ? { ...i, isArchived: !i.isArchived } : i));
  };

  const handleToggleIsBookmarked = (id) => {
    updateItem((i) =>
      i.id === id ? { ...i, isBookmarked: !i.isBookmarked } : i
    );
  };

  const handleIncrementTagCount = (ids) => {
    updateTag((i) =>
      ids.includes(i.id) ? { ...i, count: (i.count || 0) + 1 } : i
    );
  };

  return (
    <Container>
      <div className="relative">
        <h1 className="sticky top-0 my-2">Notes</h1>
        <button
          className="border my-2 text-gray-600"
          onClick={() => {
            setFormOpen(true);
          }}
        >
          Add Note
        </button>
        <div className="border rounded-lg p-2  ">
          <h2 className="ml-2 mb-1">Today</h2>
          {notes.map(({ content, isArchived, isBookmarked, tagIds, id }) => (
            <div className=" flex items-center justify-between mb-3 pt-3 border-t">
              <div className="flex items-center w-full">
                <div
                  className="p-2 cursor-pointer"
                  data-id={id}
                  onClick={(e) => {
                    handleToggleIsArchived(e.currentTarget.dataset.id);
                  }}
                >
                  {isArchived ? (
                    <AiFillCheckSquare
                      className="text-xl"
                      style={{ color: config.bookmarkColor || "#000" }}
                    />
                  ) : (
                    <AiOutlineBorder
                      className="text-xl text-gray-600"
                      style={{ color: config.bookmarkColor || "#000" }}
                    />
                  )}
                </div>
                <div className="ml-2 max-w-full flex-grow overflow-hidden">
                  <p
                    className="overflow-hidden text-sm font-medium text-gray-800 mb-1 truncate capitalize"
                    onClick={(e) => console.log(e.currentTarget)}
                  >
                    {content.split("\n")[0]}
                  </p>
                  <div className="overflow-hidden text-xs flex items-center overflow-x-auto no-scrollbar">
                    {tagIds.length > 0 ? (
                      tagIds.map((tid) => {
                        const res = tags.filter((t) => t.id === tid)[0];
                        return res ? <Tag {...res} className="mr-2" /> : null;
                      })
                    ) : (
                      <Tag className="invisible h-5" />
                    )}
                  </div>
                </div>
                <div
                  className="p-2 cursor-pointer ml-auto"
                  data-id={id}
                  onClick={(e) => {
                    handleToggleIsBookmarked(e.currentTarget.dataset.id);
                  }}
                >
                  {isBookmarked ? (
                    <BsBookmarkFill
                      className=" text-lg"
                      style={{ color: config.checkboxColor || "#000" }}
                    />
                  ) : (
                    <BsBookmark
                      className=" text-gray-600 text-lg"
                      style={{ color: config.checkboxColor || "#000" }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal isOpen={formOpen} setModal={setFormOpen}>
          <NoteAdd
            addItem={addItem}
            handleIncrementTagCount={handleIncrementTagCount}
            close={setFormOpen}
          />
          {/*<form className="rounded-lg border p-4">
          <label></label>
          <input
            className="px-1.5 py-1 border rounded"
            type="text"
            name="notes"
          />
          <input
            className="px-1.5 py-1 border rounded"
            type="text"
            name="tags"
          />
          <input
            className="px-1.5 py-1 border rounded"
            type="text"
            name="pins"
          />
        </form>*/}
        </Modal>
      </div>
    </Container>
  );
}

const NoteAdd = ({ addItem, close, handleIncrementTagCount }) => {
  const [pageState, setPageState] = useState("HOME");
  const [content, setContent] = useState("");
  const [error, setError] = useState({ content: "" });
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, _, __] = useLocalStorage("tags");

  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const handleError = (obj) => {
    setError((prev) => ({ ...prev, ...obj }));
  };

  const handleNoteSubmit = () => {
    try {
      if (!content || !content.trim()) {
        handleError({ content: "The content must not be empty" });
        return;
      }
      const tagIds = selectedTags.map((t) => t.id);
      addItem({
        id: v4(),
        tagIds,
        content,
        isArchived: false,
        isBookmarked: false,
        createdAt: Date.now(),
      });
      handleIncrementTagCount(tagIds);
      setPageState("SUCCESS");
    } catch (error) {
      console.log(error);
      setPageState("ERROR");
    }
  };

  const SuccessPage = () => (
    <div className="flex flex-col items-center">
      <h3>Success</h3>
      <div>
        <button
          className="border text-gray-600"
          onClick={() => {
            close();
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
  const ErrorPage = () => (
    <div className="flex flex-col items-center">
      <h3>Error</h3>
      <div>
        <button
          className="border text-gray-600"
          onClick={() => {
            close();
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
  return (
    <div className="p-4 w-96">
      {pageState === "HOME" ? (
        <>
          <h2 className="mb-2">Add Note</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNoteSubmit();
            }}
          >
            {/*<div className="flex flex-col">
          <label>Title</label>
          <input type="text" name="notes" />
        </div>*/}
            <div className="flex flex-col mb-4">
              <label>Tags</label>
              <Select
                options={tags.map((t) => ({
                  ...t,
                  border: "1px solid #e5e7eb",
                  label: t.value,
                }))}
                value={selectedTags}
                onChange={(selected) => {
                  setSelectedTags(selected);
                }}
                isMulti
                styles={{
                  control: (styles) => ({ ...styles }),
                  option: (
                    styles,
                    { data, isDisabled, isFocused, isSelected }
                  ) => ({
                    ...styles,
                    cursor: isDisabled ? "not-allowed" : "default",
                    maxHeight: "30%",
                    color: data.color,
                    backgroundColor: isSelected
                      ? data.color
                      : isFocused
                      ? hex2rgba(data.color, 0.2)
                      : null,
                    ":active": {
                      ...styles[":active"],
                      backgroundColor: isSelected
                        ? data.color
                        : hex2rgba(data.color, 0.5),
                    },
                  }),
                  multiValue: (styles, { data }) => ({
                    ...styles,
                    fontSize: "0.75rem",
                    lineHeight: "1rem",
                    padding: "0",
                    border: `solid 1px ${data.color}`,
                    overflow: "hidden",
                    borderRadius: "0.25rem",
                  }),
                  multiValueLabel: (styles, { data }) => ({
                    ...styles,
                    color: data.color,
                    padding: "0.125rem 0.375rem",
                    borderBottomRightRadius: "0",
                    borderTopRightRadius: "0",
                    backgroundColor: hex2rgba(data.color, 0.2),
                  }),
                  multiValueRemove: (styles, { data }) => ({
                    ...styles,
                    color: data.color,
                    padding: "0.125rem 0.375rem",
                    borderBottomLeftRadius: "0",
                    borderTopLeftRadius: "0",
                    backgroundColor: hex2rgba(data.color, 0.2),
                    ":hover": {
                      backgroundColor: hex2rgba(data.color, 0.4),
                      cursor: "pointer",
                    },
                  }),
                }}
              />
              {/*<TagSelection
            state={{ value: tagInputValue, setValue: setTagInputValue }}
          />*/}
            </div>
            <div className="flex flex-col mb-6 ">
              <label>Content</label>
              <div className="relative">
                <textarea
                  className={`no-scrollbar w-full ${
                    error.content ? "border-red-500" : ""
                  }`}
                  style={{ resize: "none" }}
                  name="content"
                  rows="6"
                  value={content}
                  onFocus={() => {
                    handleError({ content: "" });
                  }}
                  onChange={(e) => {
                    handleContent(e);
                  }}
                ></textarea>
                <p className="absolute text-xs text-red-500 left-0 top-40">
                  {error.content}
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <button
                className="border text-gray-600"
                onClick={(e) => {
                  e.preventDefault();
                  close();
                }}
              >
                Back
              </button>
              <button
                className="border text-gray-600"
                onClick={(e) => {
                  e.preventDefault();
                  handleNoteSubmit();
                }}
              >
                Add Note
              </button>
            </div>
          </form>
        </>
      ) : pageState === "SUCCESS" ? (
        <SuccessPage />
      ) : (
        <ErrorPage />
      )}
    </div>
  );
};
