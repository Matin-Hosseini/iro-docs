"use client";

import { useForm } from "react-hook-form";

export default function UploadForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("file", data.file[0]); // data.file یک آرایه‌ست

    console.log(formData);

    const res = await fetch("http://localhost:4000/api/v1/document/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register("file")} />
      <button type="submit">ارسال فایل</button>
    </form>
  );
}
