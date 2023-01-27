import { useState } from "react";
import { PostList1 } from "./PostList1";
import { PostList2 } from "./PostList2";

function App() {
  const [currentPage, setCurrentPage] = useState(<PostList1 />)

  function handleChangePostList(newPostList) {
    setCurrentPage(newPostList);
  }


  return (
    <>
      <div className="menu h-[6vh] mt-5 flex justify-center">
        <button className="button blueButton mr-4" onClick={()=>handleChangePostList(<PostList1/>)}>Post List 1</button>
        <button className="button blueButton" onClick={()=>handleChangePostList(<PostList2/>)}>Post List 2</button>
      </div>
      {currentPage}
    </>
  )
}


export default App;
