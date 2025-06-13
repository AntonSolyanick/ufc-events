import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/instance";

export const useFavouriteFighters = () => {
  const queryClient = useQueryClient();

  const addFavouriteFighter = useMutation({
    mutationFn: (fighterId: string) => {
      return api.post("/users/me/add-fighter", { itemId: fighterId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["fighters"] });
    },
  });

  const removeFavouriteFighter = useMutation({
    mutationFn: (fighterId: string) =>
      api.delete("/users/me/delete-fighter", { data: { itemId: fighterId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["fighters"] });
    },
  });

  return { addFavouriteFighter, removeFavouriteFighter };
};
