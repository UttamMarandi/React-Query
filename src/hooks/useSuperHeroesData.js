import axios from "axios";
import { useQuery } from "react-query";

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
    "super-heroes",
    () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    {
      onSuccess: onSuccess,
      onError: onError,
      //   select: (data) => {
      //     const superHeroNames = data.data.map((hero) => hero.name);
      //     return superHeroNames;
      //   },
    }
  );
};
