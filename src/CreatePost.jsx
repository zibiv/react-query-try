import { useState } from "react";

export function CreatePost() {
  const [isDisabled, setIsDesabled] = useState(false);
  return (
    <div className="formNewPost w-[30vw] fixed top-[65px] right-0">
      <form
      onSubmit={async (e) => {
        e.preventDefault();
        newPostMutation.mutate(new FormData(e.target));
        e.target.reset();
      }}
      action="/passa"
    >
      <div className="block">
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          type="text"
          disabled={isDisabled}
        ></input>
      </div>
      <div className="block">
        <label htmlFor="author">Author</label>
        <input
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
    </div>
    
  );
}
