import React from "react";
import { RTE, Button, Input, Select } from "./import.js";
import { useForm } from "react-hook-form";
import service from "../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const userData = useSelector((state) => state.auth.userData);
  const submit = async (data) => {
    console.log("🧪 Form Submitted");
    console.log("Data in first log : ", data);


    if (post) {
      const file = data.image[0]
        ? await service.fileUpload(data.image[0])
        : null;
      if (file) {
        await service.deleteFile(post.featuredImg);
      }
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImg: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image?.[0]
        ? await service.fileUpload(data.image[0])
        : null;
      const fileId = file.$id;
      data.featuredImg = fileId;
      console.log("👤 userData:", userData);
      
      console.log("📦 Creating post with data 2nd log:", data);

      const dbFile = await service.createPost({
        ...data,
        userid: userData.$id,
      });
      if (dbFile) {
        navigate(`/post/${dbFile.$id}`);
      }

    }
  };
  const slugTransform = (value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase().replace(/ /g, "-");
  };
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if ((name === "title")) {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
  }, [slugTransform, setValue, watch]);
  return (
    <form onSubmit={handleSubmit(submit, (err) => console.log("❌ Validation errors:", err))}>
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: false })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImg)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          className="w-full bg-red-600"
          btnText={post ? "Update" : "Submit"}
        />
        

      </div>
    </form>
  );
};

export default PostForm;
