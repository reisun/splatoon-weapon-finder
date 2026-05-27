import { useFilterParams } from "../hooks/useFilterParams";
import { useWeaponFilter } from "../hooks/useWeaponFilter";
import { FilterPanel } from "./FilterPanel";
import { WeaponTable } from "./WeaponTable";

export function WeaponFinder() {
  const { filters, updateFilter, resetFilters } = useFilterParams();
  const results = useWeaponFilter(filters);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Splatoon 3 Weapon Finder
        </h1>
        <p className="mt-1 text-gray-500">
          スプラトゥーン3の武器を検索・フィルタリング
        </p>
      </header>
      <FilterPanel
        filters={filters}
        onUpdateFilter={updateFilter}
        onReset={resetFilters}
        resultCount={results.length}
      />
      <WeaponTable weapons={results} />
    </div>
  );
}
