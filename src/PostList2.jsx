import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

let POSTS = [
  { id: 1, title: "Kakkali", author: "Aiwo Korvu" },
  { id: 2, title: "Finnish Tikkurila", author: "Mikka  Tappanenn" },
];

export function PostList2() {
  const qClient = useQueryClient();
  const postQ = useQuery({
    queryKey: ["posts"],
    queryFn: () => PromiseF(),
  });

  const postQQ = useQuery({
    queryKey: ["posts", {name: "babas"}],
    queryFn: (obj) => PromiseF(obj),
  });

  const newPostMutation = useMutation({
    mutationKey: ["addNewPost"],
    mutationFn: async (postFromForm) => {
      const newPost = Object.fromEntries(postFromForm);
      console.log(newPost);
      return await wait(1000).then(() =>
        POSTS.push({
          id: crypto.randomUUID(),
          title: newPost.title,
          author: newPost.author,
        })
      );
    },
    onSuccess: () => {
      qClient.invalidateQueries(["posts"]);
    },
  });

  const delPostMutation = useMutation({
    mutationKey: ["dellNewPost"],
    mutationFn: async (id) => {
      return await wait(1000).then(() =>
      POSTS = POSTS.filter((post) => post.id !== id)
      );
    },
    onSuccess: () => {
      qClient.invalidateQueries(["posts"]);
    },
  });

  const isDisabled = newPostMutation.isLoading;

  if (postQ.isLoading) return <h1>Loading...</h1>;
  if (postQ.isError) return <h1>{postQ.error}</h1>;

  return (
    <div className="PostApp mt-7">
      <div className="posts w-[50vw] ml-36">
        {postQ.data.length > 0 ? postQ.data.map((post) => {
          return (
            <div className="post  mb-6 flex justify-between" key={post.id}>
              <div className="info my-3">
                <h1 className="text-2xl text-cyan-800">{post.title}</h1>
                <p>{post.author}</p>
              </div>
              <button onClick={()=>{delPostMutation.mutate(post.id)}} className="closeButton text-cyan-800 w-10"><svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:w-7 h-7">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</button>
            </div>
          );
        }) : <h1>No Posts!</h1>}
      </div>
      <div className="formNewPost w-[30vw] fixed top-[6vh] right-0">
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
    </div>
  );
}

async function PromiseF(obj) {
  await wait(1000);
  return [...POSTS];
}

function wait(duration) {
  return new Promise((resolve, reject) => setTimeout(resolve, duration));
}