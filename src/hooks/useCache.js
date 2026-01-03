import { useCallback, useRef } from "react";

export function useCache() {
  const cache = useRef(new Map());

  const getCached = useCallback((key) => {
    const cached = cache.current.get(key);
    if (!cached) return null;

    // 5 minute TTL
    const CACHE_DURATION = 5 * 60 * 1000;
    const now = Date.now();

    if (now - cached.timestamp > CACHE_DURATION) {
      cache.current.delete(key);
      return null;
    }

    return cached.data;
  }, []);

  const setCache = useCallback((key, data) => {
    cache.current.set(key, {
      data,
      timestamp: Date.now(),
    });
  }, []);

  const clearCache = useCallback(() => {
    cache.current.clear();
  }, []);

  const getCacheSize = useCallback(() => {
    return cache.current.size;
  }, []);

  return { getCached, setCache, clearCache, getCacheSize };
}
