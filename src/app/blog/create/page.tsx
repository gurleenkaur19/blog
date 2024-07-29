import React from "react";
import CreateBlog from "@/components/createBlog";

const CreatePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <CreateBlog />
    </div>
  );
};

export default CreatePage;
