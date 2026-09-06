import axios from 'axios';

// API共通設定の関数
// URLやheadersを毎回書かなくて済む

export const api = axios.create({
  baseURL: "/api", // API URLの共通部分を設定
  withCredentials: true, // Cookieなどの認証情報を送信する
  headers: {
    "Content-Type": "application/json"
  } // Content-Type: JSON形式で通信する
});