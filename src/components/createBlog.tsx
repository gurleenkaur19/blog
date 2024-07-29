"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/action";

const CreateBlog = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      title,
      content,
      email: session?.user?.email ?? "",
    };

    // Send the formData to your backend API
    try {
      console.log("Creating blog post...");
      console.log(formData);
      const result = await createPost(formData);
    } catch (error) {
      console.error("An error occurred while creating the blog post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="mb-4">
        <label
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          htmlFor="content"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-indigo-600 dark:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-700 dark:hover:bg-indigo-600"
        >
          Create Post
        </button>
      </div>
    </form>
  );
};

export default CreateBlog;
