"use client";
import React from "react";

const ErrorComponent = ({ error }: { error: Error }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Oops! An Error Occurred
        </h1>
        <p className="mt-4 text-red-500">{error.message}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
