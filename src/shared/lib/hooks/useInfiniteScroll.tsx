import { useEffect, useRef } from "react";

export const useInfiniteScroll = ({
  hasMore,
  loadMore,
  loading,
  threshold = 0.3,
}: {
  hasMore: boolean;
  loadMore: () => void;
  loading: boolean;
  threshold?: number;
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadMore, loading, threshold]);

  return { observerTarget };
};
