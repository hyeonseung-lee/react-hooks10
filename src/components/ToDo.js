import React from "react";
import { DEL, COMPLETE, UNCOMPLETE, DELCOM } from "../actions";
import { useDispatch } from "../context";
function ToDos({ text, id, isCompleted }) {
  const dispatch = useDispatch();
  return (
    <li>
      <span>{text}</span>
      <button
        onClick={() =>
          dispatch({ type: isCompleted ? DELCOM : DEL, payload: id })
        }
      >
        X
      </button>
      <button
        onClick={() =>
          dispatch({ type: isCompleted ? UNCOMPLETE : COMPLETE, payload: id })
        }
      >
        {isCompleted ? "yet" : "check"}
      </button>
    </li>
  );
}

export default ToDos;
