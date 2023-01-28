import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPost } from "./api/getPosts";

export function Post({ id }) {
  const postQ = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  if (postQ.isLoading) return <h1>Loading...</h1>;
  if (postQ.isError) return <h1>{postQ.error}</h1>;
  console.log(postQ.data);

  return (
    <div className="PostApp mt-7">
      <div className="posts w-[50vw] ml-36">
        {!!postQ.data ? (
          <div className="post  mb-6 flex justify-between">
            <div className="info my-3">
              <h1 className="text-2xl text-cyan-800">{postQ.data.title}</h1>
              <p>{postQ.data.author}</p>
              <p className="mt-5">{postQ.data.text}</p>
            </div>
          </div>
        ) : (
          <p className="text-red-600">no such a post!</p>
        )}
      </div>
    </div>
  );
}
