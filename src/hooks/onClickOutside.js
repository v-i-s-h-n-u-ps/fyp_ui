import { useEffect } from "react";

const onClickOutside = (ref, handler) => {

  const listener = event => {
    if (!!ref.current) {
      if (ref.current.contains(event.target))
        return;
    }
    handler(event);
  };

  useEffect(() => {
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, []);
}

export default onClickOutside
