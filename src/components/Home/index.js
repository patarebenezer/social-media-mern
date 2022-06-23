import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../../redux/actions/posts";
import useStyles from "../../style";
import Paginate from "../Pagination";
import ChipInput from "material-ui-chip-input";

// panggil pagination
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();
  // panggil pagination
  const query = useQuery();
  const page = query.get("page") || 1; // manggil pagination, kalo ga ada >1 halaman pasti didalam page 1
  const searchQuery = query.get("searchQuery");
  const [ search, setSearch ] = useState('')
  const [ tags, setTags ] = useState([])

  const searchPost = () => {
    if(search.trim() || tags){
      dispatch(getPostsBySearch({ search, tags: tags.join(',')}))
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    }else{
      history.push('/')
    }
  }
  
  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      searchPost()
    }
  }

  const handleAdd = (tag) => setTags([ ...tags, tag ])
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          className={classes.gridContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />

              <ChipInput 
              style={{ margin: '10px 0' }}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search Tags"
              variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} color='primary' variant="contained">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginate page={page}/>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
