import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./style";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/posts";

export default function Paginate({ page }) {
  const classes = useStyles();
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page)}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
}
