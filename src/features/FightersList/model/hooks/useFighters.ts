import { Fighter } from "@/entities/Fighter/model/types/fighter";
import { api } from "@/shared/api/instance";
import { useQuery } from "@tanstack/react-query";

export const useFighters = () => {
  return useQuery<Fighter[]>({
    queryKey: ["fighters"],
    queryFn: async () => {
      const { data } = await api.get("/all-fighters");
      return data.body.data;
    },
  });
};
