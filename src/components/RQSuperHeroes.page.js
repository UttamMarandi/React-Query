import React from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching.");
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error.");
  };

  const results = useSuperHeroesData(onSuccess, onError);
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
          <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        </>
      ))}
      {/* {data.map((hero) => (
        <div key={hero}>{hero}</div>
      ))} */}
    </div>
  );
};

export default RQSuperHeroesPage;
