function wait(duration) {
  return new Promise((resolve, reject) => setTimeout(resolve, duration));
}

let POSTS = [
  { id: 1, title: "Green Olly", author: "Garry Molland" },
  { id: 2, title: "Fargus the Greatest", author: "Mazzy Fazzy" },
];

export async function getPosts() {
  await wait(1000);
  return [...POSTS];
}

export async function pushNewPost(newPost) {
  return await wait(1000).then(()=>POSTS.push(newPost));
}

export async function deletePost(id) {
  return await wait(1000).then(() =>
      POSTS = POSTS.filter((post) => post.id !== id)
      );
}