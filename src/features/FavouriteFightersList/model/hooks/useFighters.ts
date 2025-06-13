import { useInfiniteQuery } from "@tanstack/react-query";
import { Fighter } from "@/entities/Fighter/model/types/fighter";
import { api } from "@/shared/api/instance";

export const useFighters = (searchQuery?: string) => {
  return useInfiniteQuery({
    queryKey: ["fighters", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get(
        `/all-fighters?page=${pageParam}&limit=20${
          searchQuery
            ? `&fighterRusName=${encodeURIComponent(searchQuery)}`
            : ""
        }`
      );
      return data.body.data as Fighter[];
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 20 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
