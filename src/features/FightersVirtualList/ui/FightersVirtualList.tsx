"use client";

import { useInfiniteScroll } from "@/shared/lib/hooks/useInfiniteScroll";
import { FighterCard } from "@/entities/Fighter/ui/FighterCard";
import { useFighters } from "@/features/FavouriteFightersList/model/hooks/useFighters";
import { CardList } from "@/widgets/CardList/ui/CardList";
import { useEffect, useState } from "react";
import cls from "./FightersVirtualList.module.css";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Input } from "@/shared/ui/Input";
import { Loader } from "@/shared/ui/Loader";
import { Text } from "@/shared/ui/Text";
import { TextSize } from "@/shared/ui/Text/Text";

export const FightersVirtualList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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
    <section>
      <div className={cls.searchFighter}>
        <Input
          inputSize="large"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="введите имя бойца"
          placeholderJustify="center"
        />
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
      {isFetching && <Loader className={cls.loader} />}

      {fetchingError && (
        <Text size={TextSize.L} error="При загрузке данных произошла ошибка!" />
      )}

      {allFighters.length < 1 &&
        searchQuery &&
        !isFetching &&
        !fetchingError && (
          <Text size={TextSize.L} text="Такого бойца нет в базе" />
        )}
    </section>
  );
};
