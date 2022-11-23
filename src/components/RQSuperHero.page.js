import React from "react";
import { useSuperHeroData } from "../hooks/useSuperHerodData";
import { useParams } from "react-router-dom";

const RQSuperHeroPage = () => {
  const { heroId } = useParams();
  const results = useSuperHeroData(heroId);
  console.log("results:", results);
  const { data, isLoading, isError, error } = results;
  if (isLoading) {
    return <h2>Loading..</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return <div>RQSuperHero.page</div>;
};

export default RQSuperHeroPage;
