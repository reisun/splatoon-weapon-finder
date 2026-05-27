import { describe, it, expect } from "vitest";
import { filtersToParams, paramsToFilters } from "./useFilterParams";
import type { WeaponFilters } from "../types/weapon";

describe("filtersToParams", () => {
  it("converts filters to URL search params", () => {
    const filters: WeaponFilters = {
      name: "スプラ",
      weaponClass: "シューター",
      sub: "",
      special: "ウルトラショット",
      range: "",
    };
    const params = filtersToParams(filters);
    expect(params.get("name")).toBe("スプラ");
    expect(params.get("class")).toBe("シューター");
    expect(params.has("sub")).toBe(false);
    expect(params.get("special")).toBe("ウルトラショット");
    expect(params.has("range")).toBe(false);
  });

  it("returns empty params when all filters are empty", () => {
    const filters: WeaponFilters = {
      name: "",
      weaponClass: "",
      sub: "",
      special: "",
      range: "",
    };
    const params = filtersToParams(filters);
    expect(params.toString()).toBe("");
  });
});

describe("paramsToFilters", () => {
  it("converts URL search params to filters", () => {
    const params = new URLSearchParams("name=スプラ&class=シューター");
    const filters = paramsToFilters(params);
    expect(filters.name).toBe("スプラ");
    expect(filters.weaponClass).toBe("シューター");
    expect(filters.sub).toBe("");
    expect(filters.special).toBe("");
    expect(filters.range).toBe("");
  });

  it("returns empty filters for empty params", () => {
    const params = new URLSearchParams();
    const filters = paramsToFilters(params);
    expect(filters).toEqual({
      name: "",
      weaponClass: "",
      sub: "",
      special: "",
      range: "",
    });
  });

  it("round-trips through filtersToParams and back", () => {
    const original: WeaponFilters = {
      name: "ガロン",
      weaponClass: "シューター",
      sub: "スプリンクラー",
      special: "カニタンク",
      range: "中長",
    };
    const params = filtersToParams(original);
    const restored = paramsToFilters(params);
    expect(restored).toEqual(original);
  });
});
