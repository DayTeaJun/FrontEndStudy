import React from "react";
import { CiShare2 } from "react-icons/ci";
import { useCopyToClipboard } from "usehooks-ts";

function TodoList({ sharedUserFullName, ownerUserId }) {
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = () => {
    const shareLink = `${"todoList 공유할 링크"}/share/${ownerUserId}`;

    copy(shareLink)
      .then(() => {
        window.alert(`공유 링크 복사 \n${shareLink}`);
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  return (
    <section className="min-h-[70vh] bg-sky-400">
      <div className=" mx-auto max-w-[800px] w-full p-4">
        <article className="flex flex-row justify-between w-full items-center">
          <p className="font-bold text-[32px]">
            <p>{sharedUserFullName || ""}</p>
            Things to do:
          </p>
          {ownerUserId && (
            <div
              onClick={() => handleCopy()}
              className="font-bold text-[20px] flex items-center cursor-pointer gap-2"
            >
              Share
              <CiShare2 size={18} />
            </div>
          )}
        </article>
      </div>
    </section>
  );
}

export default TodoList;
