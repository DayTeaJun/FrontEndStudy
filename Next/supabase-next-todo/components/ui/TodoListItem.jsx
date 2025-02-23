import React from "react";

function TodoListItem({ todo }) {
  return <div>{todo?.content}</div>;
}

export default TodoListItem;
