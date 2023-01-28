import { useState } from "react";
import { PostList1 } from "./PostList1";
import { PostList2 } from "./PostList2";
import { Post } from "./Post";

function App() {
  const [currentPage, setCurrentPage] = useState(<PostList1 />)

  function handleChangePostList(newPostList) {
    setCurrentPage(newPostList);
  }


  return (
    <>
      <div className="menu h-[46px] mt-5 flex justify-center">
        <button className="button blueButton mr-4" onClick={()=>handleChangePostList(<PostList1/>)}>Post List 1</button>
        <button className="button blueButton mr-4" onClick={()=>handleChangePostList(<PostList2/>)}>Post List 2</button>
        <button className="button blueButton" onClick={()=>handleChangePostList(<Post id={1}/>)}>First Post</button>
      </div>
      {currentPage}
    </>
  )
}


export default App;
