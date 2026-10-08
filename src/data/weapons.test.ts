import { describe, expect, it } from "vitest";
import { weapons } from "./weapons";
import {
  ranges,
  specialWeapons,
  subWeapons,
  weaponClasses,
} from "./filterOptions";
import { filterWeapons } from "../hooks/useWeaponFilter";

describe("verified Splatoon 3 weapon data (Ver.11.3.0)", () => {
  it("contains all 174 battle weapons with unique names and 14 replicas", () => {
    expect(weapons).toHaveLength(174);
    expect(new Set(weapons.map((weapon) => weapon.name)).size).toBe(174);
    expect(
      weapons.filter((weapon) => weapon.name.endsWith("レプリカ")),
    ).toHaveLength(14);
    expect(
      Object.fromEntries(
        weaponClasses.map((weaponClass) => [
          weaponClass,
          weapons.filter((weapon) => weapon.class === weaponClass).length,
        ]),
      ),
    ).toEqual({
      シューター: 40,
      ブラスター: 17,
      ローラー: 14,
      フデ: 9,
      チャージャー: 19,
      スロッシャー: 15,
      スピナー: 15,
      マニューバー: 16,
      シェルター: 11,
      ストリンガー: 9,
      ワイパー: 9,
    });
  });

  it("makes every data value available as a filter option", () => {
    for (const [field, options] of [
      ["class", weaponClasses],
      ["sub", subWeapons],
      ["special", specialWeapons],
      ["range", ranges],
    ] as const) {
      expect(new Set(weapons.map((weapon) => weapon[field]))).toEqual(
        new Set(options),
      );
      expect(new Set(options).size).toBe(options.length);
    }
    expect(specialWeapons).toHaveLength(19);
  });

  // Nintendo update notes and the cross-source audit are linked in docs/weapon-data.md.
  it.each([
    ["ボールドマーカー", "カーリングボム", "ウルトラハンコ"],
    [".96ガロン", "スプリンクラー", "キューインキ"],
    ["ジェットスイーパーカスタム", "ポイズンミスト", "アメフラシ"],
    ["H3リールガンD", "スプラッシュシールド", "グレートバリア"],
    ["オクタシューター レプリカ", "スプラッシュボム", "トリプルトルネード"],
    ["PETシューター レプリカ", "スプラッシュボム", "トリプルトルネード"],
    ["スプラシューター煌", "クイックボム", "テイオウイカ"],
    ["キャンピングシェルターCREM", "ポイズンミスト", "デコイチラシ"],
    ["LACT-450MILK", "トーピード", "ナイスダマ"],
    ["ジムワイパー封", "ロボットボム", "ナイスダマ"],
  ])("has the verified kit for %s", (name, sub, special) => {
    expect(weapons.find((weapon) => weapon.name === name)).toMatchObject({
      name,
      sub,
      special,
    });
  });

  it.each([
    ["R-PEN/5H", "長"],
    ["R-PEN/5B", "長"],
    ["フィンセント", "中短"],
    ["モップリン", "中"],
    ["ガエンFF", "中長"],
    ["オーダースピナー レプリカ", "中長"],
    ["オーダーワイパー レプリカ", "中長"],
  ])("uses the documented range classification for %s", (name, range) => {
    expect(weapons.find((weapon) => weapon.name === name)?.range).toBe(range);
  });

  it("finds Ultra Stamp kits in the real dataset", () => {
    const results = filterWeapons(weapons, {
      name: "",
      weaponClass: "",
      sub: "",
      special: "ウルトラハンコ",
      range: "",
    });
    expect(results.map((weapon) => weapon.name)).toEqual(
      expect.arrayContaining([
        "ボールドマーカー",
        "L3リールガンD",
        "ドライブワイパー",
        "フルイドV",
      ]),
    );
  });
});
