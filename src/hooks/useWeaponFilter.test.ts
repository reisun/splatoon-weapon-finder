import { describe, it, expect } from "vitest";
import { filterWeapons } from "./useWeaponFilter";
import type { Weapon, WeaponFilters } from "../types/weapon";

const sampleWeapons: Weapon[] = [
  {
    name: "スプラシューター",
    class: "シューター",
    sub: "キューバンボム",
    special: "ウルトラショット",
    range: "中短",
  },
  {
    name: "ホットブラスター",
    class: "ブラスター",
    sub: "ロボットボム",
    special: "グレートバリア",
    range: "中短",
  },
  {
    name: "スプラローラー",
    class: "ローラー",
    sub: "カーリングボム",
    special: "グレートバリア",
    range: "短",
  },
  {
    name: "リッター4K",
    class: "チャージャー",
    sub: "トラップ",
    special: "ホップソナー",
    range: "長",
  },
  {
    name: "わかばシューター",
    class: "シューター",
    sub: "スプラッシュボム",
    special: "グレートバリア",
    range: "短",
  },
];

const emptyFilters: WeaponFilters = {
  name: "",
  weaponClass: "",
  sub: "",
  special: "",
  range: "",
};

describe("filterWeapons", () => {
  it("returns all weapons when no filters are applied", () => {
    const result = filterWeapons(sampleWeapons, emptyFilters);
    expect(result).toHaveLength(5);
  });

  it("filters by name (partial match, case-insensitive)", () => {
    const result = filterWeapons(sampleWeapons, {
      ...emptyFilters,
      name: "スプラ",
    });
    expect(result).toHaveLength(2);
    expect(result.map((w) => w.name)).toContain("スプラシューター");
    expect(result.map((w) => w.name)).toContain("スプラローラー");
  });

  it("filters by weapon class", () => {
    const result = filterWeapons(sampleWeapons, {
      ...emptyFilters,
      weaponClass: "シューター",
    });
    expect(result).toHaveLength(2);
    expect(result.every((w) => w.class === "シューター")).toBe(true);
  });

  it("filters by sub weapon", () => {
    const result = filterWeapons(sampleWeapons, {
      ...emptyFilters,
      sub: "トラップ",
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("リッター4K");
  });

  it("filters by special weapon", () => {
    const result = filterWeapons(sampleWeapons, {
      ...emptyFilters,
      special: "グレートバリア",
    });
    expect(result).toHaveLength(3);
  });

  it("filters by range", () => {
    const result = filterWeapons(sampleWeapons, {
      ...emptyFilters,
      range: "長",
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("リッター4K");
  });

  it("combines multiple filters", () => {
    const result = filterWeapons(sampleWeapons, {
      ...emptyFilters,
      weaponClass: "シューター",
      range: "短",
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("わかばシューター");
  });

  it("returns empty array when no weapons match", () => {
    const result = filterWeapons(sampleWeapons, {
      ...emptyFilters,
      name: "存在しない武器",
    });
    expect(result).toHaveLength(0);
  });
});
