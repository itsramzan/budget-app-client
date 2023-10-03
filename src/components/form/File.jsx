import React, { useEffect, useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { nanoid } from "nanoid";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline, IoDocumentAttachOutline } from "react-icons/io5";
import Label from "./Label";
import Error from "./Error";

const File = (props) => {
  const { name, label, ...rest } = props;
  const { register, formState, setValue, setError } = useFormContext();
  const { errors, isSubmitted } = formState;
  const uniqueId = `${name}-${nanoid()}`;

  const [file, setFile] = useState(null);

  const onDrop = useCallback((files) => {
    setValue(name, files, { shouldValidate: isSubmitted });
    setFile(files[0]);
  }, [isSubmitted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (!file) {
      setValue(name, { File: {} });
      setError(name, { message: "" });
    }
  }, [file, name, setValue, setError]);

  // Handle cancel
  const handleCancel = (e) => {
    e.preventDefault();
    setFile(null);
    setValue(name, { File: {} });
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <Label {...{ name: uniqueId, label }} />

      {file && (
        <div className="flex flex-col justify-center items-center w-full h-64 bg-base-100 rounded-lg border-2 border-primary border-dashed cursor-pointer">
          <div className="flex flex-col items-center gap-2">
            {["image/jpeg", "image/png"].includes(file.type) ? (
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="h-32 w-32 object-cover rounded-full"
              />
            ) : (
              <IoDocumentAttachOutline className="text-6xl text-center" />
            )}
            <p className="text-sm text-primary font-semibold">{file?.name}</p>
            <button onClick={handleCancel} className="btn btn-xs btn-error">
              Cancel Upload
            </button>
          </div>
        </div>
      )}

      {!file && (
        <div
          {...getRootProps()}
          className={`flex flex-col justify-center items-center w-full h-64 bg-base-100 rounded-lg border-2 border-primary border-dashed cursor-pointer ${
            isDragActive && "bg-primary bg-opacity-25"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <IoCloudUploadOutline className="text-6xl text-center" />
            <p className="text-center">
              <span className="font-semibold">Upload file</span> or drag and
              drop here <br /> Max file size (10MB)
            </p>
          </div>
          <input
            id={uniqueId}
            type="file"
            name={name}
            ref={register}
            {...rest}
            {...getInputProps()}
            className=""
          />
        </div>
      )}

      <Error error={errors[name]?.message} />
    </div>
  );
};

export default File;
