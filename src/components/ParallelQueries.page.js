import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

const ParallelQueriesPage = () => {
  const friends = useQuery("friends", fetchFriends);
  const superheroes = useQuery("super-heroes", fetchSuperHeroes);

  const { data: friendsData } = friends;
  const { data: superheroesData } = superheroes;

  return <div>ParallelQueries.page</div>;
};

export default ParallelQueriesPage;
