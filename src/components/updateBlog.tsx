"use client";
import { PostType } from "@/lib/types";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { deletePost, updatePost } from "@/lib/action";

const UpdateBlog = ({ post }: { post: PostType }) => {
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updatePost({ ...post, ...formData });
  };
  return (
    <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          Title
        </label>
        <Input
          id="title"
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          Content
        </label>
        <textarea
          id="content"
          name="content"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter content"
          rows={6}
          value={formData.content ?? ""}
          onChange={handleInputChange}
          required
        />
      </div>
      <Button type="submit" className="mr-2">
        Update Post
      </Button>
      <Button
        variant="destructive"
        onClick={async (e) => {
          e.preventDefault();
          await deletePost(post.id);
        }}
      >
        Delete Post
      </Button>
    </form>
  );
};

export default UpdateBlog;
