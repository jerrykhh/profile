import type { FetcherWithComponents } from '@remix-run/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { PaginatedData } from '@/types/data';

export function useInfiniteScroll<T>(
  fetcher: FetcherWithComponents<PaginatedData<T>>,
  initialData: PaginatedData<T>,
  resourcePath: string,
  config?: {
    threshold?: number;
    initialLoad?: boolean;
  }
) {
  const [items, setItems] = useState<T[]>(initialData.items);
  const [nextCursor, setNextCursor] = useState(initialData.next_cursor);
  const [hasMore, setHasMore] = useState(initialData.has_more);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const threshold = config?.threshold ?? 1.0;

  const loadMore = useCallback(() => {
    if (nextCursor && hasMore && fetcher.state === 'idle') {
      fetcher.load(`${resourcePath}?next=${nextCursor}`);
    }
  }, [nextCursor, hasMore, fetcher, resourcePath]);

  useEffect(() => {
    setItems(initialData.items);
    setNextCursor(initialData.next_cursor);
    setHasMore(initialData.has_more);
  }, [initialData]);

  useEffect(() => {
    if (fetcher.data?.items) {
      setItems((prev) => [...prev, ...fetcher.data!.items]);
      setNextCursor(fetcher.data.next_cursor);
      setHasMore(fetcher.data.has_more);
    }
  }, [fetcher.data]);

  // Intersection Observer setup
  useEffect(() => {
    const observerNode = sentinelRef.current;
    if (!observerNode || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && fetcher.state === 'idle') {
          loadMore();
        }
      },
      { threshold }
    );

    observer.observe(observerNode);
    return () => observer.disconnect();
  }, [loadMore, hasMore, threshold, fetcher.state]);

  return {
    items,
    sentinelRef,
    isLoading: fetcher.state !== 'idle',
    hasMore,
    reset: () => {
      setItems(initialData.items);
      setNextCursor(initialData.next_cursor);
      setHasMore(initialData.has_more);
    },
  };
}
