import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];

  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient(); // we call this to get hold of the client instance
  return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId), {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return {
          data: hero, // this object structure is important. As this is how we access the data
        };
      } else {
        return undefined; // if undefined return the useSuperHeroData get's called the normal way with loading state and stuff
      }
    },
    // if super-heroes data is present is cache data with identifier "super-heroes" then give
    // me the data of the hero whose id is same as pass superhero heroId
    // Then set this value as initial data.
    // I think getQueryData is use to get data from query cache.
    // We use optional chaining b.c cache might be empty

    //So, when we call useSuperHeroData function , if we already have initial data set to some value then we show the data and start background fetching .
    // If not then we use the loading state
  });
};
