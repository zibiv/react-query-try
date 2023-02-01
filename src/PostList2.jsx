import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, pushNewPost, deletePost} from "./api/getPosts";

export function PostList2() {

  const qClient = useQueryClient();

  const postQ = useQuery({
    queryKey: ["posts1"],
    queryFn: getPosts,
  });

  const delPostMutation = useMutation({
    mutationKey: ["dellNewPost"],
    mutationFn: async (id) => {
      return await deletePost(id);
    },
    onSuccess: () => {
      qClient.invalidateQueries(["posts"]);
    },
  });

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
    </div>
  );
}