function wait(duration) {
  return new Promise((resolve, reject) => setTimeout(resolve, duration));
}

let POSTS = [
  { id: 1, title: "Green Olly", author: "Garry Molland", text: "jhsdafkjhsadjk fhjkashdiuofhiopusad hifou saiup fhiupasdhipu fasiupdfh iusadhfiu hsaiufhiu shdfiu hsduifhiusfh iusad hfiuasdh iuf hiu hfius dhfiu sadhiuf hsaiufhiousad hfiujsd hiuf hius hiuasd ", userId: 1 },
  { id: 2, title: "Fargus the Greatest", author: "Mazzy Fazzy", text: "" , userId: 2},
];

let USERS = [
  {id: 1, name: "Lumba"},
  {id: 2, name: "Garry"}
];

export async function getUser(id) {
  console.log("Get USer call")
  return USERS.find(user => user.id === id);
}

export async function getPosts() {
  await wait(1000);
  return [...POSTS];
}

export async function pushNewPost(newPost) {
  const length = await wait(1000).then(()=>POSTS.push(newPost));
  return POSTS[length-1];
}

export async function deletePost(id) {
  return await wait(1000).then(() =>
      POSTS = POSTS.filter((post) => post.id !== id)
      );
}

export async function getPost(id) {
  await wait(1000);
  const post = POSTS.find(post => post.id === id);
  return !post ? null : post;
}

export async function getLatest() {
  await wait(200);
  console.log("--------->>>>>")
  return POSTS[POSTS.length-1].id;
}