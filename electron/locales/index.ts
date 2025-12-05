export interface Locale {
  electron: {
    stopRecording: string;
  };
}

export const locales: Record<string, Locale> = {
  'zh-CN': {
    electron: {
      stopRecording: '停止录制',
    },
  },
  'en-US': {
    electron: {
      stopRecording: 'Stop Recording',
    },
  },
};

export function i18n(key: keyof Locale, subKey: string, params?: Record<string, string>): string {
  const locale = 'zh-CN'; // 暂时使用中文作为默认语言
  const value = locales[locale]?.[key]?.[subKey as keyof Locale[keyof Locale]] || subKey;
  
  if (params) {
    return Object.entries(params).reduce((result, [param, value]) => {
      return result.replace(`{{${param}}}`, value);
    }, value);
  }
  
  return value;
}