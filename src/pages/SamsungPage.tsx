import React, {
  useState,
} from "react";
import CompanyHeader from "../components/CompanyHeader";
import HealthProfile, {
  type HealthMetric,
} from "../components/HealthProfile";
import Feedback from "../components/Feedback";
import InvestmentNotes from "../components/InvestmentNotes";
import NotificationSettings from "../components/NotificationSettings";

const metrics: HealthMetric[] =
  [
    {
      id: "roe-chart",
      title: "ROE",
      icon: "ri-heart-pulse-line",
      iconColor: "blue",
      status: "건강",
      statusColor: "green",
      current: 12.8,
      average: 9.2,
      unit: "%",
      description:
        "최근 3년간 꾸준히 상승 중",
      chartColors: [
        [
          0.5,
          "rgba(251, 191, 114, 0.3)",
        ],
        [
          0.7,
          "rgba(141, 211, 199, 0.5)",
        ],
        [
          1,
          "rgba(87, 181, 231, 0.7)",
        ],
      ],
      max: 20,
    },
    {
      id: "debt-chart",
      title: "부채비율",
      icon: "ri-scales-3-line",
      iconColor: "yellow",
      status: "양호",
      statusColor: "green",
      current: 32.5,
      average: 45.8,
      unit: "%",
      description:
        "업계 평균보다 낮은 부채비율",
      chartColors: [
        [
          0.4,
          "rgba(87, 181, 231, 0.7)",
        ],
        [
          0.7,
          "rgba(141, 211, 199, 0.5)",
        ],
        [
          1,
          "rgba(252, 141, 98, 0.3)",
        ],
      ],
      max: 100,
    },
    {
      id: "profit-chart",
      title: "수익성",
      icon: "ri-funds-line",
      iconColor: "purple",
      status: "보통",
      statusColor: "yellow",
      current: 8.7,
      average: 9.5,
      unit: "%",
      description:
        "최근 분기 소폭 하락",
      chartColors: [
        [
          0.3,
          "rgba(252, 141, 98, 0.3)",
        ],
        [
          0.7,
          "rgba(251, 191, 114, 0.5)",
        ],
        [
          1,
          "rgba(87, 181, 231, 0.7)",
        ],
      ],
      max: 15,
    },
    {
      id: "cash-chart",
      title: "현금흐름",
      icon: "ri-money-dollar-circle-line",
      iconColor: "green",
      status: "우수",
      statusColor: "green",
      current: 12.3,
      average: 5.2,
      unit: "조",
      description:
        "안정적인 현금 창출력 보유",
      chartColors: [
        [
          0.3,
          "rgba(252, 141, 98, 0.3)",
        ],
        [
          0.6,
          "rgba(251, 191, 114, 0.5)",
        ],
        [
          1,
          "rgba(141, 211, 199, 0.7)",
        ],
      ],
      max: 20,
    },
  ];

const feedback = [
  "삼성전자는 **탄탄한 재무 체질**을 갖춘 기업입니다. 특히 **회복력(ROE)이 업계 평균을 상회**하며 꾸준히 상승하는 추세를 보이고 있습니다.",
  "체지방(부채비율)은 업계 평균보다 낮은 32.5%로 **재무적 안정성이 우수**합니다. 다만, 근육량(수익성)은 최근 분기에 소폭 하락하여 주의가 필요합니다.",
  "심폐지구력(현금흐름)은 **매우 건강한 상태**로, 안정적인 현금 창출 능력을 보유하고 있어 장기적인 성장 잠재력이 있습니다.",
];

const initialNotificationSettings =
  [
    {
      id: "price",
      title: "주가 변동 알림",
      description:
        "일일 주가 변동이 5% 이상일 때 알림",
      enabled: true,
    },
    {
      id: "financial",
      title:
        "재무 지표 변화 알림",
      description:
        "주요 재무 지표 업데이트 시 알림",
      enabled: true,
    },
    {
      id: "earnings",
      title: "실적 발표 알림",
      description:
        "분기/연간 실적 발표 일정 알림",
      enabled: false,
    },
    {
      id: "dividend",
      title: "배당 정보 알림",
      description:
        "배당 발표 및 지급 일정 알림",
      enabled: true,
    },
  ];

const SamsungPage: React.FC =
  () => {
    const [
      notificationSettings,
      setNotificationSettings,
    ] = useState(
      initialNotificationSettings
    );
    const [
      isFavorite,
      setIsFavorite,
    ] = useState(false);
    const [
      isNoteModalOpen,
      setIsNoteModalOpen,
    ] = useState(false);
    const [notes, setNotes] =
      useState<
        {
          id: string;
          type:
            | "매수"
            | "매도"
            | "홀딩";
          date: string;
          content: string;
          tags: string[];
        }[]
      >([
        {
          id: "1",
          type: "매수",
          date: "2025-05-10",
          content:
            "최근 3년간 ROE가 꾸준히 상승하고 있고, 현금흐름도 안정적이라 장기 투자 가치가 있다고 판단됨. 특히 반도체 사업 부문의 실적 개선이 기대되어 매수 결정.",
          tags: [
            "ROE 상승",
            "안정적 현금흐름",
            "반도체 사업",
          ],
        },
        {
          id: "2",
          type: "홀딩",
          date: "2025-04-22",
          content:
            "1분기 실적 발표 후 주가가 소폭 하락했지만, 전반적인 재무 건강성은 여전히 좋음. 수익성 지표가 소폭 하락했으나 일시적인 현상으로 보이며, 현금 보유량이 충분해 배당 지급 능력도 우수함. 계속 보유하기로 결정.",
          tags: [
            "1분기 실적",
            "배당",
            "현금 보유량",
          ],
        },
      ]);

    const handleNotificationToggle =
      (id: string) => {
        setNotificationSettings(
          (settings) =>
            settings.map(
              (s) =>
                s.id === id
                  ? {
                      ...s,
                      enabled:
                        !s.enabled,
                    }
                  : s
            )
        );
      };

    const handleFavoriteToggle =
      () => {
        setIsFavorite(
          (prev) => !prev
        );
      };

    const handleAddNote =
      (newNote: {
        type:
          | "매수"
          | "매도"
          | "홀딩";
        content: string;
        tags: string[];
      }) => {
        const note = {
          id: Date.now().toString(),
          date: new Date()
            .toISOString()
            .split("T")[0],
          ...newNote,
        };
        setNotes((prev) => [
          note,
          ...prev,
        ]);
        setIsNoteModalOpen(
          true
        );
      };

    return (
      <main className="container mx-auto px-4 py-6 pb-20 flex-1">
        <CompanyHeader
          name="삼성전자"
          code="005930"
          sector="전자/반도체"
          price={72300}
          change={1200}
          changePercent={1.7}
          isFavorite={
            isFavorite
          }
          onFavoriteToggle={
            handleFavoriteToggle
          }
          onAddNote={() =>
            setIsNoteModalOpen(
              true
            )
          }
        />
        <div className="space-y-4 sm:space-y-6">
          <HealthProfile
            metrics={metrics}
            lastUpdated="2025-05-15"
          />
          <Feedback
            feedback={
              feedback
            }
            overall="건강한 재무 체질을 갖춘 안정적인 기업"
          />
          <InvestmentNotes
            notes={notes}
            isModalOpen={
              isNoteModalOpen
            }
            onCloseModal={() =>
              setIsNoteModalOpen(
                false
              )
            }
            onAddNote={
              handleAddNote
            }
          />
          <NotificationSettings
            settings={
              notificationSettings
            }
            onToggle={
              handleNotificationToggle
            }
          />
        </div>
      </main>
    );
  };

export default SamsungPage;
