import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { WeaponFilters } from "../types/weapon";

const PARAM_KEYS = {
  name: "name",
  weaponClass: "class",
  sub: "sub",
  special: "special",
  range: "range",
} as const;

export function filtersToParams(filters: WeaponFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.name) params.set(PARAM_KEYS.name, filters.name);
  if (filters.weaponClass)
    params.set(PARAM_KEYS.weaponClass, filters.weaponClass);
  if (filters.sub) params.set(PARAM_KEYS.sub, filters.sub);
  if (filters.special) params.set(PARAM_KEYS.special, filters.special);
  if (filters.range) params.set(PARAM_KEYS.range, filters.range);
  return params;
}

export function paramsToFilters(params: URLSearchParams): WeaponFilters {
  return {
    name: params.get(PARAM_KEYS.name) ?? "",
    weaponClass: params.get(PARAM_KEYS.weaponClass) ?? "",
    sub: params.get(PARAM_KEYS.sub) ?? "",
    special: params.get(PARAM_KEYS.special) ?? "",
    range: params.get(PARAM_KEYS.range) ?? "",
  };
}

export function useFilterParams(): {
  filters: WeaponFilters;
  setFilters: (filters: WeaponFilters) => void;
  updateFilter: (key: keyof WeaponFilters, value: string) => void;
  resetFilters: () => void;
} {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => paramsToFilters(searchParams), [searchParams]);

  const setFilters = useCallback(
    (newFilters: WeaponFilters) => {
      setSearchParams(filtersToParams(newFilters), { replace: true });
    },
    [setSearchParams],
  );

  const updateFilter = useCallback(
    (key: keyof WeaponFilters, value: string) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
    },
    [filters, setFilters],
  );

  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  return { filters, setFilters, updateFilter, resetFilters };
}
