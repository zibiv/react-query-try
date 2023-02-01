import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pushNewPost } from "./api/getPosts";
import { Post } from "./Post";

export function CreatePost({ setCurrentPage }) {
  const qClient = useQueryClient();

  const titleRef = useRef();
  const authorRef = useRef();

  const newPostMutation = useMutation({
    mutationFn: pushNewPost,
    onSuccess:  (data) => {
      console.log(data);
      qClient.setQueryData(["posts", data.id], data)
      qClient.invalidateQueries(["latestId"]);
      qClient.invalidateQueries(["posts"]);
      setCurrentPage(<Post id={data.id}/>)
    }

  });

  let isDisabled = newPostMutation.isLoading;

  return (
    <div className="formNewPost w-[30vw] fixed top-[65px] right-0">
      <form
      onSubmit={(e) => {
        e.preventDefault();
        newPostMutation.mutate(
          { 
            id:  crypto.randomUUID(),
            title: titleRef.current.value,
            author: authorRef.current.value,
            userId: 2
          }
        );
        e.target.reset();
      }}
      action="/passa"
    >
      <div className="block">
        <label htmlFor="title">Title</label>
        <input ref = {titleRef}
          name="title"
          id="title"
          type="text"
          disabled={isDisabled}
        ></input>
      </div>
      <div className="block">
        <label htmlFor="author">Author</label>
        <input ref = {authorRef}
          name="author"
          id="author"
          type="text"
          disabled={isDisabled}
        ></input>
      </div>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        type="submit"
        disabled={isDisabled}
      >
        AddNew
      </button>
    </form>
    {newPostMutation.isError && JSON.stringify(newPostMutation.error)}
    </div>
    
  );
}
