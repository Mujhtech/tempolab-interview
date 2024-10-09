import { Fragment, useCallback, useEffect, useState } from "react";
import "./App.css";
import { Post } from "./type";
import { getStory, getTopStories } from "./api";
import PostView from "./components/post";

const LIMIT = 10;

function App() {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [topStoryIds, setTopStoryIds] = useState<Array<number>>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleGetStories = useCallback(async () => {
    setLoading(true);
    const start = (page - 1) * LIMIT;
    const end = start + LIMIT;

    const postPromises = topStoryIds
      .slice(start, end)
      .map((id) => getStory(id));
    const newPosts = await Promise.all(postPromises);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setLoading(false);
  }, [page, topStoryIds]);

  useEffect(() => {
    const fetchTopStories = async () => {
      const ids = await getTopStories();
      setTopStoryIds(ids);
    };

    fetchTopStories();
  }, []);

  useEffect(() => {
    if (topStoryIds.length > 0) {
      handleGetStories();
    }
  }, [topStoryIds, handleGetStories]);

  return (
    <div className="">
      {loading && posts.length === 0 ? (
        <div className="loading"></div>
      ) : (
        <Fragment>
          {posts.length > 0 ? (
            posts.map((post, index) => {
              return <PostView key={index} data={post} />;
            })
          ) : (
            <div>No posts</div>
          )}
          {topStoryIds.length > posts.length && (
            <button onClick={() => setPage((prev) => prev + 1)}>
              Load More
            </button>
          )}
        </Fragment>
      )}
    </div>
  );
}

export default App;
