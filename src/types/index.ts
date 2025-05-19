// 차트 데이터 타입
export interface ChartData {
  value: number;
  name: string;
}

// 재무 지표 타입
export interface FinancialMetric {
  id: string;
  title: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  status: string;
  statusBg: string;
  statusColor: string;
  currentValue: string;
  industryAvg: string;
  description: string;
  chartId: string;
  chartMin: number;
  chartMax: number;
  chartValue: number;
  chartUnit: string;
}

// 투자 메모 타입
export interface InvestmentNote {
  id: string;
  type: string;
  typeBg: string;
  typeColor: string;
  date: string;
  content: string;
  tags: string[];
}

// 알림 설정 타입
export interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}
