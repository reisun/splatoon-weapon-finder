# Splatoon 3 Weapon Finder - 設計書

## 概要

スプラトゥーン3の全武器を検索・フィルタリングできるWebアプリケーション。
GitHub Pages でホスティングし、静的サイトとして提供する。

## 技術スタック

- Vite + React + TypeScript
- Tailwind CSS (v4)
- react-router-dom (useSearchParams によるURL同期)
- Vitest (テスト)
- Docker (開発環境)
- GitHub Actions (デプロイ)

## アーキテクチャ

```
src/
  types/weapon.ts       -- 武器の型定義
  data/weapons.ts       -- 全武器データ (JSON静的埋め込み)
  data/filterOptions.ts -- フィルタ選択肢
  hooks/useFilterParams.ts  -- URLクエリパラメータとフィルタ状態の同期
  hooks/useWeaponFilter.ts  -- フィルタロジック
  components/FilterPanel.tsx -- フィルタUI
  components/WeaponTable.tsx -- 結果一覧テーブル
  components/WeaponFinder.tsx -- メインページ
  App.tsx
  main.tsx
```

## データ設計

### 武器データ構造

| フィールド | 型            | 説明                      |
| ---------- | ------------- | ------------------------- |
| name       | string        | 武器名                    |
| class      | WeaponClass   | 武器種 (11種)             |
| sub        | SubWeapon     | サブウェポン (14種)       |
| special    | SpecialWeapon | スペシャルウェポン (19種) |
| range      | Range         | 射程 (短/中短/中/中長/長) |

### フィルタ

| フィルタ           | 入力タイプ   | 動作                            |
| ------------------ | ------------ | ------------------------------- |
| 武器名             | テキスト入力 | 部分一致検索 (大文字小文字不問) |
| 武器種             | セレクト     | 完全一致                        |
| サブウェポン       | セレクト     | 完全一致                        |
| スペシャルウェポン | セレクト     | 完全一致                        |
| 射程               | セレクト     | 完全一致                        |

## URL同期

フィルタ状態はURLクエリパラメータに反映される:

- `?name=スプラ&class=シューター&range=中短`
- 空のフィルタはパラメータから除外
- ブラウザの戻る・進むで前の検索条件に復帰

## デプロイ

- GitHub Actions で main ブランチへの push 時に自動デプロイ
- `reisun.github.io/splatoon-weapon-finder` でアクセス
- Vite の `base` 設定で `/splatoon-weapon-finder/` を指定
