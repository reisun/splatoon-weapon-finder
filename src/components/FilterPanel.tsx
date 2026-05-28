import { useCallback, useEffect, useRef, useState } from "react";
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

function TextFilter({
  label,
  value,
  onChange,
  placeholder,
  testId,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  testId: string;
}) {
  const [localValue, setLocalValue] = useState(value);
  const composingRef = useRef(false);

  useEffect(() => {
    if (!composingRef.current) {
      setLocalValue(value);
    }
  }, [value]);

  const commitValue = useCallback(
    (v: string) => {
      onChange(v);
    },
    [onChange],
  );

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        data-testid={testId}
        type="text"
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value);
          if (!composingRef.current) {
            commitValue(e.target.value);
          }
        }}
        onCompositionStart={() => {
          composingRef.current = true;
        }}
        onCompositionEnd={(e) => {
          composingRef.current = false;
          commitValue(e.currentTarget.value);
        }}
        placeholder={placeholder}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
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
        <TextFilter
          label="武器名"
          value={filters.name}
          onChange={(v) => onUpdateFilter("name", v)}
          placeholder="武器名で検索..."
          testId="filter-name"
        />
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
