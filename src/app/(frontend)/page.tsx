"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { BlogPostCardType, ResponseType } from "@/lib/types";
import { BlogCard } from "@/components/custom/BlogCard";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPostCardType[]>([]);
  const router = useRouter();

  const { user, logout } = useAuth();

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/backend/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id)); // Remove deleted post from the state
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  useEffect(() => {
    const apiCall = async () => {
      try {
        const res = await fetch("/backend/posts");
        if (!res.ok) {
          console.error("Failed to fetch posts:", res.statusText);
          return;
        }
        const data: ResponseType = await res.json();
        if (data.success) {
          setPosts(data.data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    apiCall();
  }, []);

  return (
    <>
      <Head>
        <title>Blog List</title>
      </Head>
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-white shadow-lg">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <h1 className="text-3xl font-semibold text-gray-800">Blog List</h1>
            <nav>
              {user ? (
                <div className="flex items-center">
                  <Link
                    href="/create"
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Create New Post
                  </Link>
                  <button
                    onClick={logout}
                    className="px-5 ml-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Log In
                </Link>
              )}
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} onDelete={handleDelete} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default BlogList;
