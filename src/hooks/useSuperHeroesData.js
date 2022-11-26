import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
    "super-heroes",
    () => {
      return request({
        url: "/superheroes",
      });
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

//  Mutation response handling

export const useAddSuperHeroDataWithMutation = () => {
  const queryClient = useQueryClient(); // get the instance of the query client
  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      //data refers to the entire response of the post req.
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};

// Optimistic update

export const useAddSuperHeroDataWithOptimism = () => {
  const queryClient = useQueryClient(); // get the instance of the query client
  return useMutation(addSuperHero, {
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes"); // first thing we need to do is to cancel
      // any query for "super-heroes" so that it don't affect our optimistic approach.
      // This is an async process

      // then we need to get hold of the current query data so that we can rollback if
      // mutation fails
      const previousHeroData = queryClient.getQueryData("super-heroes");

      // then we need to set the data

      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            {
              id: oldQueryData?.data?.length + 1,
              //  we are destructuring because we don't have the id for new user input and setting the id based on length.
              ...newHero,
            },
          ],
        };
      });

      // we do this because if the mutation errors out than we are rolling back to old data.
      return {
        previousHeroData,
      };
    },

    // This function is called if the mutation encounters an error
    onError: (error, hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },

    // This mutation is called on both cases. Mutation fail or mutation success

    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
      // Here we are fetching the super-heroes data.

      // All the above jargon is done so that user doesn't notice any loading state.
      // This is an overkill for most purposes.
      // I like the client side response handling or just directly invalidate it.
    },
  });
};
