import { useQuery, useMutation, queryCache } from "react-query";
import { useAuthClient } from "../utils/api-client";

export function useGetIngredients() {
  const client = useAuthClient();
  return useQuery("ingredients", async () => {
    const data = await client(`ingredients`);
    return data.ingredients;
  });
}

export function useUpdateSavedIngredient() {
  const client = useAuthClient();
  return useMutation(
    async ({ id, action }) => {
      const data = await client(`ingredients/${id}/${action}_saved`, {
        method: "POST",
      });
      return data.ingredients;
    },
    {
      onSuccess: () => {
        queryCache.invalidateQueries("ingredients");
      },
    }
  );
}
