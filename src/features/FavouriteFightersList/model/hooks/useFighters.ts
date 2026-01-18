import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fighter } from "@/entities/Fighter/model/types/fighter";
import { api } from "@/shared/api/instance";
import { SearchQuery } from "@/entities/Fighter/model/types/search";

export const useFighters = (searchQuery?: SearchQuery) => {
  return useInfiniteQuery({
    queryKey: ["fighters", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const params = new URLSearchParams({
          page: pageParam.toString(),
          limit: "20",
        });
        if (searchQuery?.fighterRusName) {
          params.append("fighterRusName", searchQuery.fighterRusName);
        }
        if (searchQuery?.fighterWeightCategory?.value) {
          params.append(
            "fighterWeightCategory",
            searchQuery.fighterWeightCategory.value
          );
        }
        if (searchQuery?.fighterCountry) {
          params.append("fighterCountry", searchQuery.fighterCountry);
        }

        const { data } = await api.get(`/all-fighters?${params.toString()}`);

        return data.body.data as Fighter[];
      } catch (error) {
        throw new Error(
          axios.isAxiosError(error)
            ? error.response?.data?.message || "Ошибка загрузки"
            : "Ошибка сети"
        );
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 20 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
