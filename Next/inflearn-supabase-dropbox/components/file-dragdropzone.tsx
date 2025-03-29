"use client";

import { uploadFile } from "@/actions/storageActions";
import { Button, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { queryClient } from "./ReactQueryClientProvider";
import { useDropzone } from "react-dropzone";

export default function FileDragDropZone() {
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        // 강의에서는 아래와 같이 file.name을 key로 저장하였지만, 결과적으로 key를 쓰지 않기때문에
        // formData.append(file.name, file);
        // 아래처럼 정정하여 사용함, 이유는 후에 한번에 imageFile 이라는 key 일관적으로 저장하고 불러올 수 있기 때문, file.name 으로 사용할 경우 key 가 전체가 다르고 조회가 어려워짐 (불필요)
        formData.append("imageFile", file);
      });
      uploadImageMutation.mutate(formData);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()} // 파일 드래그 또는 클릭 시 아래 바인딩한 input 태그에 연결된 getInputProps() 을 실행하게 함
      className="w-full py-20 border-2 border-dotted border-indigo-700 flex flex-col items-center justify-center cursor-pointer"
    >
      {uploadImageMutation.isPending ? (
        <Spinner />
      ) : isDragActive ? ( // 드래그 상태 표시
        <p>파일을 놓으세요!</p>
      ) : (
        <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
      )}

      <input {...getInputProps()} />
      {/* 
      ...getInputProps()
      {
        type: "file",
        accept: "image/*",
        multiple: true,
        onChange: ƒ,
        style: { display: "none" },
        } */}
    </div>
  );
}
