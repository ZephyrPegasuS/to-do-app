import { useEffect, useLayoutEffect, useRef } from "react";
import { TODO_STATUS } from "../constants";

export const isTodoDone = (todo) => {
  return todo.status === TODO_STATUS.DONE;
};

export const isTodoActive = (todo) => {
  return todo.status === TODO_STATUS.ACTIVE;
};

export const uidGenerator = (length) => {
  return Math.random()
    .toString(36)
    .slice(2, length + 2);
};

const scrollPositionsById = {};
export const useContainerScroll = (id) => {
  const ref = useRef();

  const handleScroll = () => {
    if (ref.current?.scrollTop !== 0 || ref.current?.scrollLeft !== 0) {
      scrollPositionsById[id] = {
        x: ref.current?.scrollLeft,
        y: ref.current?.scrollTop,
      };
    }
  };

  useEffect(() => {
    ref.current?.addEventListener("scroll", handleScroll);
    return () =>
      ref.current?.removeEventListener("scroll", handleScroll(ref.current));
  }, []);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = scrollPositionsById[id]?.x;
      ref.current.scrollTop = scrollPositionsById[id]?.y;
    }
  }, []);

  return ref;
};
