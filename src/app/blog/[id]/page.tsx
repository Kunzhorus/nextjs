"use client";
import axios from "axios";
import { useEffect, useState } from "react";

function DetailBlog({ params }: { params: { id: number } }) {
  const [blog, setBlog] = useState<IBlog>();
  useEffect(() => {
    const getBlog = async () => {
      let response = await axios.get(
        `http://localhost:8000/blogs/${params.id}`
      );
      let data = response.data;
      setBlog(data);
    };
    getBlog();
  }, []);
  return (
    <>
      <div>Title: {blog?.title}</div>
      <div>Author: {blog?.author}</div>
      <div>Content: {blog?.content}</div>
    </>
  );
}

export default DetailBlog;
