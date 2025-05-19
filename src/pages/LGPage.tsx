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
      current: 10.2,
      average: 8.5,
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
      status: "건강",
      statusColor: "green",
      current: 28.1,
      average: 40.0,
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
      status: "우수",
      statusColor: "green",
      current: 11.3,
      average: 9.5,
      unit: "%",
      description:
        "영업이익률이 업계 평균을 상회",
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
      current: 8.9,
      average: 4.1,
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
  "LG전자는 **안정적인 현금흐름**과 **지속적인 R&D 투자**로 성장 잠재력이 높은 기업입니다.",
  "부채비율이 업계 평균보다 낮아 재무 안정성이 뛰어납니다.",
  "최근 신사업 부문에서의 성과가 두드러집니다.",
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

const LGPage: React.FC =
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
          date: "2025-05-12",
          content:
            "가전 부문 실적 호조와 전장사업 성장 기대감으로 매수 결정.",
          tags: [
            "가전 호조",
            "전장사업",
            "성장성",
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
          name="LG전자"
          code="066570"
          sector="전자/가전"
          price={110000}
          change={-500}
          changePercent={
            -0.45
          }
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
            overall="성장성과 안정성을 겸비한 기업"
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

export default LGPage;
