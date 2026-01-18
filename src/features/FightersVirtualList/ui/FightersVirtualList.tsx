"use client";

import { useCallback, useEffect, useState } from "react";
import { SingleValue } from "react-select";
import { RiFilter2Fill } from "react-icons/ri";

import { useInfiniteScroll } from "@/shared/lib/hooks/useInfiniteScroll";
import { FighterCard } from "@/entities/Fighter/ui/FighterCard";
import { useFighters } from "@/features/FavouriteFightersList/model/hooks/useFighters";
import { CardList } from "@/widgets/CardList/ui/CardList";
import cls from "./FightersVirtualList.module.css";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Input } from "@/shared/ui/Input";
import { Loader } from "@/shared/ui/Loader";
import { Text } from "@/shared/ui/Text";
import { TextSize } from "@/shared/ui/Text/Text";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
import { FighterFilterModal } from "@/widgets/FighterFilterModal";
import {
  DEFAULT_SEARCH_QUERY,
  SearchQuery,
} from "@/entities/Fighter/model/types/search";
import { SelectOption } from "@/shared/ui/CustomSelect/model/types";

export const FightersVirtualList = () => {
  const [searchQuery, setSearchQuery] =
    useState<SearchQuery>(DEFAULT_SEARCH_QUERY);

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<SearchQuery>(
    {}
  );

  const [isFighterFilterModalOpen, setIsFighterFilterModalOpen] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const onShowFighterFilterModal = useCallback(() => {
    setIsFighterFilterModalOpen(true);
  }, []);
  const onCloseFighterFilterModal = useCallback(() => {
    setIsFighterFilterModalOpen(false);
  }, []);

  const searchQueryNameHandler = (name: string) => {
    setSearchQuery((prevState) => ({
      ...prevState,
      fighterRusName: name,
    }));
  };
  const searchQueryCategoryHandler = (
    selectedOption: SingleValue<SelectOption>
  ) => {
    setSearchQuery((prevState) => ({
      ...prevState,
      fighterWeightCategory: selectedOption,
    }));
  };

  const searchQueryCountryHandler = (event: string) => {
    setSearchQuery((prevState) => ({
      ...prevState,
      fighterCountry: event,
    }));
  };

  const clearFilters = () => {
    setSearchQuery(DEFAULT_SEARCH_QUERY);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error: fetchingError,
  } = useFighters(debouncedSearchQuery);

  const allFighters = data?.pages.flat() || [];

  const { observerTarget } = useInfiniteScroll({
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
    loading: isFetching,
  });

  return (
    <section className={cls.container}>
      {isFighterFilterModalOpen && (
        <FighterFilterModal
          isOpen={isFighterFilterModalOpen}
          onClose={onCloseFighterFilterModal}
          clearFilters={clearFilters}
          inputFighterCountry={searchQuery.fighterCountry}
          inputFighterCountryHandler={searchQueryCountryHandler}
          searchQueryCategoryHandler={searchQueryCategoryHandler}
          fighterWeightCategory={searchQuery.fighterWeightCategory!}
        ></FighterFilterModal>
      )}
      <div className={cls.searchFighter}>
        <Input
          inputSize="large"
          type="text"
          value={searchQuery.fighterRusName}
          onChange={(e) => searchQueryNameHandler(e.target.value)}
          placeholder="введите имя бойца"
          placeholderJustify="center"
        />
        <Button
          size={ButtonSize.M}
          className={cls.buttonFilter}
          theme={ButtonTheme.SOLID}
          onClick={onShowFighterFilterModal}
        >
          <RiFilter2Fill />
        </Button>
      </div>
      <CardList
        bigCards
        items={allFighters}
        renderCard={(fighter) => (
          <FighterCard key={fighter.slug} fighter={fighter} />
        )}
      />
      <div
        className={classNames(cls.infiniteScrollTarget)}
        ref={observerTarget}
      >
        infiniteScrollTarget
      </div>
      {isFetching && (
        <Loader
          className={`${
            allFighters.length > 0 ? cls.isFetchingLoader : cls.position
          }`}
        />
      )}

      {fetchingError && (
        <Text
          className={cls.position}
          size={TextSize.L}
          error="При загрузке данных произошла ошибка!"
        />
      )}

      {allFighters.length < 1 &&
        searchQuery &&
        !isFetching &&
        !fetchingError && (
          <Text
            className={cls.position}
            size={TextSize.L}
            text="Такого бойца нет в базе"
          />
        )}
    </section>
  );
};
