import { useQuery } from "@tanstack/react-query"

import { getPost, getUser } from "./api/getPosts";

export function Post({ id }) {
  const postQ = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });
  

  const userQuery = useQuery({
    queryKey: ["users", postQ?.data?.userId],
    enabled: !!postQ?.data?.userId,
    queryFn: () => getUser(postQ?.data?.userId)
  })

  if (postQ.isLoading) return <h1>Loading...</h1>;
  if (postQ.isError) return <h1>{postQ.error}</h1>;
  const userName = userQuery.isLoading ? "LOADING" : userQuery.data.name;

  return (
    <div className="PostApp mt-7">
      <div className="posts w-[50vw] ml-36">
        {!!postQ.data ? (
          <div className="post  mb-6 flex justify-between">
            <div className="info my-3">
              <h1 className="text-2xl text-cyan-800">{postQ.data.title}</h1>
              <h3>{postQ.data.author}</h3>
              <h4 className="text-cyan-400">{userName}</h4>
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
