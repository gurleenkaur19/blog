"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Create() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("alice@prisma.io");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // To navigate after submission

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    setError(null);
    // Construct the post data
    const postData = { title, authorEmail: email, content };

    try {
      const response = await fetch("/backend/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setTitle("");
        setContent("");
        setEmail("alice@prisma.io");
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create post");
      }
    } catch (error) {
      setError("Failed to create post: " + (error as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create a New Blog Post
        </h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
              maxLength={500} // Limit the length
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
