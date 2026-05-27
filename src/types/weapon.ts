export type WeaponClass =
  | "シューター"
  | "ブラスター"
  | "ローラー"
  | "フデ"
  | "チャージャー"
  | "スロッシャー"
  | "スピナー"
  | "マニューバー"
  | "シェルター"
  | "ストリンガー"
  | "ワイパー";

export type SubWeapon =
  | "スプラッシュボム"
  | "キューバンボム"
  | "クイックボム"
  | "スプリンクラー"
  | "ジャンプビーコン"
  | "スプラッシュシールド"
  | "ポイントセンサー"
  | "トラップ"
  | "カーリングボム"
  | "ロボットボム"
  | "タンサンボム"
  | "トーピード"
  | "ラインマーカー"
  | "ポイズンミスト";

export type SpecialWeapon =
  | "ウルトラショット"
  | "グレートバリア"
  | "サメライド"
  | "ショクワンダー"
  | "ホップソナー"
  | "メガホンレーザー5.1ch"
  | "マルチミサイル"
  | "ナイスダマ"
  | "アメフラシ"
  | "キューインキ"
  | "エナジースタンド"
  | "カニタンク"
  | "ジェットパック"
  | "トリプルトルネード"
  | "テイオウイカ"
  | "スミナガシート"
  | "デコイチラシ"
  | "ウルトラチャクチ"
  | "ガチホコショット"
  | "スーパーチャクチ";

export type Range = "短" | "中短" | "中" | "中長" | "長";

export interface Weapon {
  name: string;
  class: WeaponClass;
  sub: SubWeapon;
  special: SpecialWeapon;
  range: Range;
}

export interface WeaponFilters {
  name: string;
  weaponClass: string;
  sub: string;
  special: string;
  range: string;
}
