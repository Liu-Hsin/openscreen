import zhCN from './zh-CN.json';

// 支持的语言类型
export type Locale = 'zh-CN' | 'en-US';

// 翻译数据结构
export interface Translation {
  common: {
    cancel: string;
    share: string;
    loading: string;
    error: string;
    success: string;
    close: string;
    hide: string;
    stop: string;
  };
  launchWindow: {
    selectWindow: string;
    startRecording: string;
    openFile: string;
    hideHud: string;
    closeApp: string;
    recording: string;
  };
  sourceSelector: {
    screens: string;
    windows: string;
    loadingSources: string;
    selectSource: string;
  };
  videoEditor: {
    loadingVideo: string;
    noVideoLoaded: string;
    videoNotLoaded: string;
    videoNotReady: string;
    videoLoadFailed: string;
    exportFailed: string;
    exportCancelled: string;
    exportSuccess: string;
    videoExportedSuccessfully: string;
    exportVideoFailed: string;
    exportVideoFailedWithError: string;
    exportVideoError: string;
    exporting: string;
    exportVideo: string;
    exportProgress: string;
    exportCompleted: string;
    yourVideoIsReady: string;
    pleaseRetry: string;
    mayTakeSomeTime: string;
    readyToStart: string;
    status: string;
    processing: string;
    cancelExport: string;
    enterText: string;
    unknownError: string;
    text: string;
    image: string;
    figure: string;
    customImage: string;
    color: string;
    gradient: string;
    uploadCustomImage: string;
    invalidFileType: string;
    uploadJpgJpeg: string;
    customImageUploadSuccess: string;
    uploadImageFailed: string;
    errorReadingFile: string;
    padding: string;
    cropVideo: string;
    dragEdgesToAdjustCrop: string;
    done: string;
    keyboardShortcuts: string;
    addZoom: string;
    addAnnotation: string;
    addKeyframe: string;
    addTrim: string;
    deleteSelected: string;
    panTimeline: string;
    zoomTimeline: string;
    pausePlay: string;
    noImage: string;
    noArrowData: string;
    annotationSettings: string;
    enabled: string;
    textContent: string;
    fontStyle: string;
    selectStyle: string;
    fontSize: string;
    size: string;
    textColor: string;
    backgroundColor: string;
    movePlayheadToOverlap: string;
    useTabToSwitch: string;
    useShiftTabToReverseSwitch: string;
    motionBlur: string;
    blurBackground: string;
    shadowIntensity: string;
    borderRadius: string;
    selectZoomAreaInTimeline: string;
    deleteZoomArea: string;
  };
  electron: {
    stopRecording: string;
    recordingStatus: string;
  };
  settings: {
    exportQuality: {
      source: string;
      good: string;
      medium: string;
    };
    aspectRatio: {
      '16:9': string;
      '4:3': string;
      '1:1': string;
      '9:16': string;
    };
  };
}

// 语言包映射
const translations: Record<Locale, Translation> = {
  'zh-CN': zhCN,
  'en-US': zhCN // 暂时使用中文作为默认，后续可以添加英文翻译
};

// 当前语言设置
let currentLocale: Locale = 'zh-CN';

// 设置当前语言
export function setLocale(locale: Locale): void {
  currentLocale = locale;
}

// 获取当前语言
export function getLocale(): Locale {
  return currentLocale;
}

// 获取翻译文本
export function t<K extends keyof Translation>(key: K): Translation[K];
export function t<K extends keyof Translation, S extends keyof Translation[K]>(key: K, subKey: S): Translation[K][S];
export function t<K extends keyof Translation, S extends keyof Translation[K]>(key: K, subKey: S, params: Record<string, unknown>): string;
export function t(key: string, subKey?: string, params?: Record<string, unknown>): unknown {
  const translation = translations[currentLocale];
  
  // 如果只传递一个参数，返回整个命名空间对象
  if (!subKey) {
    return translation[key as keyof Translation] || key;
  }
  
  // 获取子键对应的文本
  let text: string = translation[key as keyof Translation]?.[subKey as keyof Translation[keyof Translation]] as string || key;
  
  // 处理插值参数
  if (params) {
    Object.keys(params).forEach(paramKey => {
      text = text.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(params[paramKey]));
    });
  }
  
  return text;
}

// 快捷方式
export const i18n = {
  t,
  setLocale,
  getLocale
};

export default i18n;