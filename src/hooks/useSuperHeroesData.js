import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

const addSuperHero = (hero) => {
  // hero is passed by default. This "hero" is the same object as passes to the mutate method while consuming the mutation
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient(); // get the instance of the query client
  return useMutation(addSuperHero, {
    onSuccess: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
