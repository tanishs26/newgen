import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const RTE = ({ name, control, defaultValue, label }) => {
  return (
    <div className="w-full">
      {label && <label className="text-gray-200 mb-2 ml-4">{label}</label>}
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey='9ppbxil0gruu46aslsx39pgearcdbpiuo2r13v55tl0ic6w4'

            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};
export default RTE;