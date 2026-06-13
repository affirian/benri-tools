/**
 * カテゴリー定義
 */
const TOOL_CATEGORIES = {
  calculation: {
    id: 'calculation',
    name: '計算ツール',
    description: '日数・年齢・税金・利息などの計算ツール',
    icon: '🧮',
    order: 1,
  },
  date: {
    id: 'date',
    name: '日付ツール',
    description: 'カウントダウン・曜日・営業日など',
    icon: '📅',
    order: 2,
  },
  sns: {
    id: 'sns',
    name: 'SNSツール',
    description: 'SNS投稿に便利なツール',
    icon: '💬',
    order: 3,
  },
  'qr-url': {
    id: 'qr-url',
    name: 'QR・URLツール',
    description: 'QRコード生成などのツール',
    icon: '📱',
    order: 4,
  },
  converter: {
    id: 'converter',
    name: '単位変換',
    description: '長さ・重さ・温度などの変換',
    icon: '🔄',
    order: 5,
  },
  security: {
    id: 'security',
    name: 'セキュリティ',
    description: 'パスワード・UUID生成など',
    icon: '🔒',
    order: 6,
  },
  encode: {
    id: 'encode',
    name: 'エンコード',
    description: 'Base64・URLエンコードなど',
    icon: '🔤',
    order: 7,
  },
};
