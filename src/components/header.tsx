"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-white dark:bg-gray-800 py-4 shadow-md dark:shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          <Link
            href="/"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300"
          >
            My Blog
          </Link>
        </h1>
        <nav className="flex items-center space-x-4">
          {!session ? (
            <Link
              href="/login"
              className="border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 py-2 px-4 rounded-md hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 transition duration-300"
            >
              Log In
            </Link>
          ) : (
            <>
              <Link
                href="/blog/create"
                className="border border-green-600 text-green-600 dark:text-green-400 dark:border-green-400 py-2 px-4 rounded-md hover:bg-green-600 hover:text-white dark:hover:bg-green-400 transition duration-300"
              >
                Create Post
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="border border-red-600 text-red-600 dark:text-red-400 dark:border-red-400 py-2 px-4 rounded-md hover:bg-red-600 hover:text-white dark:hover:bg-red-400 transition duration-300"
              >
                Log Out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
