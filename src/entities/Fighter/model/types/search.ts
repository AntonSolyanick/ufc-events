import { SelectOption } from "@/shared/ui/CustomSelect/model/types";
import { SingleValue } from "react-select";

export const DEFAULT_WEIGHT_CATEGORY: SelectOption = {
  value: "",
  label: "Все категории",
};

export const DEFAULT_SEARCH_QUERY: SearchQuery = {
  fighterWeightCategory: DEFAULT_WEIGHT_CATEGORY,
  fighterCountry: "",
};

export interface SearchQuery {
  fighterRusName?: string;
  fighterWeightCategory?: SingleValue<SelectOption>;
  fighterCountry?: string;
}
