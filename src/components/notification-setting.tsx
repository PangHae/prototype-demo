"use client";

import type { NotificationSetting } from "../types";

interface NotificationSettingProps {
  setting: NotificationSetting;
  onChange: (
    id: string,
    enabled: boolean
  ) => void;
}

export default function NotificationSettingCard({
  setting,
  onChange,
}: NotificationSettingProps) {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-100">
      <div>
        <p className="font-medium">
          {setting.title}
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
          onChange={(e) =>
            onChange(
              setting.id,
              e.target.checked
            )
          }
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}
