import { useEffect, useState } from "react";

export default function useLocalStorage(storage_key, default_value = []) {
  const [items, setItems] = useState(() => {
    const i = JSON.parse(localStorage.getItem(storage_key));
    if (i === null) {
      return default_value;
    }
    return i;
  });

  useEffect(() => {
    localStorage.setItem(storage_key, JSON.stringify(items));
  }, [items]);

  try {
    const clearItem = () => {
      localStorage.removeItem(storage_key);
    };
    const addItem = (item) => {
      console.log(typeof items);
      if (items === null) {
        setItems(item);
        return;
      }
      if (Array.isArray(items)) {
        console.log("array");
        setItems((prev) => {
          return [...prev, item];
        });
        return;
      }
      if (typeof items === "object") {
        setItems((prev) => ({ ...prev, ...item }));
        return;
      }

      setItems(item);
      return;
    };

    const removeAllItems = () => {
      setItems(default_value);
    };

    const removeItemByID = (id) => {
      setItems((prev) => {
        return prev.filter((p) => p.id !== id);
      });
    };
    const updateItem = (f) => {
      setItems((prev) => prev.map(f));
    };

    const replaceItemByID = (id, item) => {
      if (typeof item === "function") {
        setItems((prev) => prev.map(item));
        return;
      }
      setItems((prev) => {
        return prev.map((p) => (p.id === id ? item : p));
      });
    };

    return [
      items,
      {
        clearItem,
        removeAllItems,
        removeItemByID,
        replaceItemByID,
        updateItem,
        addItem,
      },
    ];
  } catch (error) {
    alert(JSON.parse(error));
  }
}
