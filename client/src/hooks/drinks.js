import { useQuery, useMutation, queryCache } from "react-query";
import { useAuthClient } from "../utils/api-client";

export function useGetDrinks() {
  const client = useAuthClient();
  return useQuery("featured", async () => {
    const data = await client("drinks");
    return data.drinks;
  });
}

export function useGetFavoriteDrinks() {
  const client = useAuthClient();
  return useQuery("favorites", async () => {
    const data = await client("drinks/favorites");
    return data.drinks;
  });
}

export function useGetRandomDrinks() {
  const client = useAuthClient();
  return useQuery("random", async () => {
    const data = await client("drinks/random");
    return data.drinks;
  });
}

export function useSearchDrinks(searchTerm) {
  const client = useAuthClient();
  return useQuery(["seatch", searchTerm], async () => {
    const data = await client(`drinks?q=${encodeURIComponent(searchTerm)}`);
    return data.drinks;
  });
}

export function useGetSingleDrink(drinkId) {
  const client = useAuthClient();
  return useQuery(["drinks", drinkId], async () => {
    const data = await client(`drinks/${drinkId}`);
    return data.drink;
  });
}

export function useUpdateFavorite(id) {
  const client = useAuthClient();

  return useMutation(
    async ({ id, action }) => {
      const data = await client(`drinks/${id}/${action}_fav`, {
        method: "POST",
      });
      return data.drink;
    },
    {
      onSuccess: (data) => {
        queryCache.setQueryData(["drinks", id], data);
      },
    }
  );
}
