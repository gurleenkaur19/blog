import React from "react";
import { BlogPostCardType } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

interface BlogCardProps {
  post: BlogPostCardType;
  onDelete: (id: number) => void;
}

const truncateContent = (content: string, wordLimit: number): string => {
  const words = content.split(" ");
  if (words.length <= wordLimit) return content;
  return words.slice(0, wordLimit).join(" ") + "...";
};

export const BlogCard: React.FC<BlogCardProps> = ({ post, onDelete }) => {
  const truncatedContent = truncateContent(post.content, 30); // Adjust word limit as needed
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4">{truncatedContent}</p>
        {user && (
          <button
            onClick={() => onDelete(post.id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
