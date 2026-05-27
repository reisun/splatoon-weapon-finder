import { useMemo } from "react";
import type { Weapon, WeaponFilters } from "../types/weapon";
import { weapons } from "../data/weapons";

export function filterWeapons(
  allWeapons: Weapon[],
  filters: WeaponFilters,
): Weapon[] {
  return allWeapons.filter((weapon) => {
    if (
      filters.name &&
      !weapon.name.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      return false;
    }
    if (filters.weaponClass && weapon.class !== filters.weaponClass) {
      return false;
    }
    if (filters.sub && weapon.sub !== filters.sub) {
      return false;
    }
    if (filters.special && weapon.special !== filters.special) {
      return false;
    }
    if (filters.range && weapon.range !== filters.range) {
      return false;
    }
    return true;
  });
}

export function useWeaponFilter(filters: WeaponFilters): Weapon[] {
  return useMemo(() => filterWeapons(weapons, filters), [filters]);
}
