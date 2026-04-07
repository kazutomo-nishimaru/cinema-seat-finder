// 映画館
export type Theater = {
  theater_id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  facilities: string[]; // 例: ["IMAX", "Dolby Cinema", "名画座"]
  website: string;
  access_info: string;
};

// スクリーン
export type Screen = {
  screen_id: string;
  theater_id: string;
  screen_name: string;
  seat_rows: number;
  seat_columns: number;
  aisle_positions: number[]; // 通路を挿入する列インデックス（0始まり）
  screen_type: string; // "standard" | "IMAX" | "Dolby Cinema" | "4DX"
};

// 各モードのおすすめ情報（スクリーン単位）
// seats は "B-3" のような「行ラベル-列番号」形式のリスト
export type ModeRecommendation = {
  seats: string[];
  reason: string;
};

// スクリーンごとのおすすめ座席定義
export type ScreenRecommendations = {
  screen_id: string;
  recommendations: {
    legroom: ModeRecommendation; // 足元ゆったり
    love: ModeRecommendation; // 推し席（個人的なおすすめ）
  };
};

// おすすめモードの種別
export type RecommendMode = keyof ScreenRecommendations['recommendations'];
