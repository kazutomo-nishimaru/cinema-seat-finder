import { NextRequest, NextResponse } from 'next/server';

// Basic 認証ミドルウェア
// 環境変数 BASIC_AUTH_USER / BASIC_AUTH_PASSWORD が未設定の場合は認証をスキップする（ローカル開発用）
export function proxy(req: NextRequest) {
  const user = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;

  // 環境変数が未設定の場合は認証なしで通過
  if (!user || !password) {
    return NextResponse.next();
  }

  const auth = req.headers.get('authorization');
  const expected = 'Basic ' + Buffer.from(`${user}:${password}`).toString('base64');

  if (auth !== expected) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Cinema Seat Finder"' },
    });
  }

  return NextResponse.next();
}
