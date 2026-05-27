# Splatoon 3 Weapon Finder

## プロジェクト概要

スプラトゥーン3の武器検索・フィルタリングWebアプリ。GitHub Pages で静的ホスティング。

## 技術スタック

- Vite + React + TypeScript
- Tailwind CSS v4
- react-router-dom (URL同期)
- Vitest (テスト)
- Docker (開発環境)

## コマンド

- `npm run dev` -- 開発サーバー起動 (port 5173)
- `npm run build` -- プロダクションビルド
- `npm test` -- lint + format check + テスト一括実行
- `npm run test:unit` -- ユニットテストのみ
- `npm run lint` -- ESLint
- `npm run format:check` -- Prettier チェック

## Docker 開発環境

- `docker compose up` で起動
- port 5173 でアクセス

## ディレクトリ構成

- `src/types/` -- 型定義
- `src/data/` -- 武器データ、フィルタ選択肢
- `src/hooks/` -- カスタムフック (フィルタロジック、URL同期)
- `src/components/` -- UIコンポーネント
- `docs/` -- 設計書

## デプロイ

- main へ push で GitHub Actions が自動デプロイ
- URL: `reisun.github.io/splatoon-weapon-finder`
