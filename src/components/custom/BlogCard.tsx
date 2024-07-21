import React from "react";
import { Card } from "../ui/card";
import { BlogPostCardType } from "@/lib/types";

export const BlogCard = ({
  post,
  onDelete,
}: {
  post: BlogPostCardType;
  onDelete: (id: number) => void;
}) => {
  return (
    <Card key={post.id}>
      <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.except}</p>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p className="text-gray-700 mb-4">Created At: {post.createdAt}</p>
      <button
        onClick={() => onDelete(post.id)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </Card>
  );
};
