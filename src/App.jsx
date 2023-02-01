import { useState } from "react";
import { PostList1 } from "./PostList1";
import { PostList2 } from "./PostList2";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";
import { useQuery } from "@tanstack/react-query";
import { getLatest } from "./api/getPosts";

function App() {
  const [currentPage, setCurrentPage] = useState(<PostList1 />);

  const latestPostQuery = useQuery({
    queryKey: ["latestId"],
    queryFn: getLatest,
  });

  function handleChangePostList(newPostList) {
    setCurrentPage(newPostList);
  }

  return (
    <>
      <div className="menu h-[46px] mt-5 flex justify-center">
        <button className="button blueButton mr-4" onClick={()=>handleChangePostList(<PostList1/>)}>Post List 1</button>
        <button className="button blueButton mr-4" onClick={()=>handleChangePostList(<PostList2/>)}>Post List 2</button>
        <button className="button blueButton" disabled={latestPostQuery.isLoading} onClick={()=>handleChangePostList(<Post id={latestPostQuery.data}/>)}>Latest Post</button>
      </div>
      {currentPage}
      <CreatePost setCurrentPage={setCurrentPage}/>
    </>
  )
}


export default App;
