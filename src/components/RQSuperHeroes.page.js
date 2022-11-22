import React from "react";
import { useQuery } from "react-query";

import axios from "axios";

const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching.");
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error.");
  };

  const results = useQuery(
    "super-heroes",
    () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );

  const { isLoading, data, isError, error, refetch } = results;

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h2>React Query Super Heroes</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => (
        <>
          <div key={hero.name}>{hero.name}</div>
        </>
      ))}
    </div>
  );
};

export default RQSuperHeroesPage;
