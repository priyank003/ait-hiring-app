import React from "react";
import classes from "./DashBoardPosts.module.css";
import DashBoardPost from "./DashBoardPost";
import filter from "../../../assets/logos/filter_list_black_24dp.svg";
import { useCallback, useState, useEffect } from "react";
const DashBoardPosts = () => {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:8000/api";

  const fetchPostsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/posts/get`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setPost(data.results);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPostsHandler();
  }, [fetchPostsHandler]);

  console.log(post);

  return (
    <div className={classes["dashboard-posts"]}>
      <div className={classes["dashboard-posts-header"]}>
        <h3>All Notices</h3>

        <div className={classes["dashboard-posts-filter"]}>
          <img src={filter} alt="" />
        </div>
      </div>

      <div className={classes["dashboard-notices"]}>
        {post.map((data) => {
          return <DashBoardPost postData={data} />;
        })}
      </div>
    </div>
  );
};

export default DashBoardPosts;
