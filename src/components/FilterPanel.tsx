import type { WeaponFilters } from "../types/weapon";
import {
  weaponClasses,
  subWeapons,
  specialWeapons,
  ranges,
} from "../data/filterOptions";

interface FilterPanelProps {
  filters: WeaponFilters;
  onUpdateFilter: (key: keyof WeaponFilters, value: string) => void;
  onReset: () => void;
  resultCount: number;
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
  testId,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  testId: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        data-testid={testId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">すべて</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function FilterPanel({
  filters,
  onUpdateFilter,
  onReset,
  resultCount,
}: FilterPanelProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">検索フィルタ</h2>
        <button
          onClick={onReset}
          className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
        >
          リセット
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">武器名</label>
          <input
            data-testid="filter-name"
            type="text"
            value={filters.name}
            onChange={(e) => onUpdateFilter("name", e.target.value)}
            placeholder="武器名で検索..."
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <SelectFilter
          label="武器種"
          value={filters.weaponClass}
          options={weaponClasses}
          onChange={(v) => onUpdateFilter("weaponClass", v)}
          testId="filter-class"
        />
        <SelectFilter
          label="サブウェポン"
          value={filters.sub}
          options={subWeapons}
          onChange={(v) => onUpdateFilter("sub", v)}
          testId="filter-sub"
        />
        <SelectFilter
          label="スペシャルウェポン"
          value={filters.special}
          options={specialWeapons}
          onChange={(v) => onUpdateFilter("special", v)}
          testId="filter-special"
        />
        <SelectFilter
          label="射程"
          value={filters.range}
          options={ranges}
          onChange={(v) => onUpdateFilter("range", v)}
          testId="filter-range"
        />
      </div>
      <p className="mt-3 text-sm text-gray-500">
        {resultCount} 件の武器が見つかりました
      </p>
    </div>
  );
}
