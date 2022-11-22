import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const RQSuperHeroesPage = () => {
  const results = useQuery("super-heroes", () => {
    return axios.get("http://localhost:4000/superheroes");
  });

  const { isLoading, data } = results;

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>React Query Super Heroes</h2>
      {data?.data.map((hero) => (
        <>
          <div key={hero.name}>{hero.name}</div>
        </>
      ))}
    </div>
  );
};

export default RQSuperHeroesPage;
