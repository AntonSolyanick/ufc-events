import { SingleValue } from "react-select";
import { ReactNode } from "react";

import { Modal } from "@/shared/ui/Modal/Modal";
import { HStack } from "@/shared/ui/Stack/HStack/HStack";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import cls from "./FighterFilterModal.module.css";
import { VStack } from "@/shared/ui/Stack/VStack/VStack";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { FIGHTER_WEIGHT_OPTIONS } from "@/entities/Fighter/model/сonstants";
import { SelectOption } from "@/shared/ui/CustomSelect/model/types";

interface FighterFilterModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  clearFilters: () => void;
  children?: ReactNode;
  inputFighterCountry?: string;
  inputFighterCountryHandler: (fighterCountry: string) => void;
  searchQueryCategoryHandler: (
    selectedOption: SingleValue<SelectOption>
  ) => void;
  fighterWeightCategory: SingleValue<SelectOption>;
}

export const FighterFilterModal = (props: FighterFilterModalProps) => {
  const {
    isOpen,
    onClose,
    children,
    clearFilters,
    inputFighterCountry,
    inputFighterCountryHandler,
    searchQueryCategoryHandler,
    fighterWeightCategory,
  } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} lazy>
      <VStack className={cls.block} justify="evenly" align="center">
        {children}
        <CustomSelect
          options={FIGHTER_WEIGHT_OPTIONS}
          selectHandler={searchQueryCategoryHandler}
          value={fighterWeightCategory}
        ></CustomSelect>
        <Input
          className={cls.input}
          value={inputFighterCountry}
          onChange={(e) => inputFighterCountryHandler(e.target.value)}
          placeholder="страна рождения"
          inputSize="large"
          placeholderJustify="center"
          type="text"
        />
      </VStack>
      <HStack justify="around">
        <Button onClick={onClose} theme={ButtonTheme.SOLID} fullWidth>
          ОК
        </Button>
        <Button onClick={clearFilters} theme={ButtonTheme.SOLID} fullWidth>
          Снять фильтры
        </Button>
      </HStack>
    </Modal>
  );
};
