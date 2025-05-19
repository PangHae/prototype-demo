import React from "react";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface NotificationSettingsProps {
  settings: NotificationSetting[];
  onToggle: (
    id: string
  ) => void;
}

const NotificationSettings: React.FC<
  NotificationSettingsProps
> = ({
  settings,
  onToggle,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
          <i className="ri-notification-3-line text-primary"></i>
        </div>
        <h3 className="text-lg sm:text-xl font-bold">
          알림 설정
        </h3>
      </div>

      <div className="space-y-4">
        {settings.map(
          (setting) => (
            <div
              key={setting.id}
              className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="font-medium">
                  {
                    setting.title
                  }
                </p>
                <p className="text-sm text-gray-500">
                  {
                    setting.description
                  }
                </p>
              </div>
              <label className="custom-switch">
                <input
                  type="checkbox"
                  checked={
                    setting.enabled
                  }
                  onChange={() =>
                    onToggle(
                      setting.id
                    )
                  }
                />
                <span className="slider"></span>
              </label>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;
