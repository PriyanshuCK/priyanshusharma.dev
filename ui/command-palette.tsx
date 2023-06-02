"use client";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, Fragment } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import formatDate from "@/lib/utils/formatDate";
import Richtext from "@/ui/rich-text";

export default function CommandPalette(props: any) {
  const posts = props.posts;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filteredPosts = query
    ? posts.filter((post: any) => {
        const date = formatDate(post.created_time);
        const searchContent =
          post.properties.name.title[0].plain_text +
          post.properties.description.rich_text[0].plain_text +
          date;
        return searchContent.toLowerCase().includes(query.toLowerCase());
      })
    : [];
  useEffect(() => {
    const onkeydown = (event: KeyboardEvent) => {
      if (
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        event.key === "/"
      ) {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", onkeydown);
    return () => {
      window.removeEventListener("keydown", onkeydown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-label="Search"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex scale-[0.8] items-center justify-center rounded-full border border-primary-400 p-2 text-primary-400 transition-all duration-300 hover:bg-primary-400 hover:text-white focus:outline-none dark:border-primary-300 dark:text-primary-300 dark:hover:border-slate-500 dark:hover:bg-slate-500 dark:hover:text-primary-400`}
      >
        <span className="sr-only">Open Search Box</span>
        <MagnifyingGlassIcon className="inline h-6 w-6" />
      </button>
      <Transition.Root
        show={isOpen}
        as={Fragment}
        afterLeave={() => setQuery("")}
      >
        <Dialog
          onClose={setIsOpen}
          className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[15vh] md:pt-[20vh]"
        >
          <Transition.Child
            enter="duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/30" />
          </Transition.Child>
          <Transition.Child
            enter="duration-300 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Combobox
              as="div"
              onChange={(post: any) => {
                setIsOpen(false);
                router.push(`/${post.properties.slug.rich_text[0].plain_text}`);
              }}
              className="relative mx-auto max-w-2xl divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 dark:divide-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center px-4">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <Combobox.Input
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                  className=" h-12 w-full border-0 bg-transparent text-sm text-gray-800 placeholder-gray-400 caret-primary-500 focus:ring-0 dark:text-gray-200 dark:placeholder-gray-500"
                  placeholder="Search title, date or description"
                  autoComplete="off"
                  type="text"
                />
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="inline rounded-lg border-2 border-gray-500 px-2 py-1 text-xs text-gray-500 dark:border-gray-400 dark:text-gray-400"
                >
                  <div>Esc</div>
                </button>
              </div>
              {filteredPosts.length > 0 && (
                <Combobox.Options
                  static
                  className="max-h-[32rem] space-y-4 overflow-y-auto py-4 text-sm"
                >
                  {filteredPosts.map((post: any) => {
                    return (
                      <Combobox.Option key={post.id} value={post} className="">
                        {({ active }) => (
                          <div
                            className={`m-4 cursor-pointer space-y-1 rounded-lg py-2 px-4 first:mt-0 last:mb-0 ${
                              active
                                ? "bg-primary-50 dark:bg-gray-800 dark:bg-none dark:text-gray-200 text-primary-500"
                                : " bg-white dark:bg-gray-900"
                            }`}
                          >
                            <h3 className="text-lg font-medium">
                              {post.properties.name.title[0].text.content}
                            </h3>
                            <div className="flex flex-row text-gray-500 dark:text-gray-400">
                              <div className="pr-2 text-[0.8125rem]">
                                {post.properties.type.select.name}
                              </div>
                              <div className="text-[0.8125rem]">
                                <time dateTime={post.created_time}>
                                  {new Date(
                                    post.created_time
                                  ).toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </time>
                              </div>
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              <Richtext
                                text={post.properties.description.rich_text}
                                key={post.id}
                              />
                            </div>
                          </div>
                        )}
                      </Combobox.Option>
                    );
                  })}
                </Combobox.Options>
              )}
              {query && filteredPosts.length === 0 && (
                <p className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No results for &quot;{query}&quot;
                </p>
              )}
            </Combobox>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
}
