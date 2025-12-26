import { siteConfig } from "../config";

export function formatDateToYYYYMMDD(date: Date): string {
	// 正确处理时区问题：将日期转换为UTC时间，然后根据配置的时区偏移量调整
	const timeGap = siteConfig.timeZone || 8;
	// 获取UTC时间戳
	const utcTimestamp = date.getTime();
	// 计算目标时区的时间戳（考虑到原始日期可能已经被错误解析为UTC）
	// 首先将日期调整为UTC时间，然后加上时区偏移量
	const targetTimestamp = utcTimestamp + (timeGap - date.getTimezoneOffset() / 60) * 60 * 60 * 1000;
	const targetDate = new Date(targetTimestamp);
	
	const year = targetDate.getFullYear();
	const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
	const day = targetDate.getDate().toString().padStart(2, '0');
	
	return `${year}-${month}-${day}`;
}

// 国际化日期格式化函数
export function formatDateI18n(dateString: string): string {
	const date = new Date(dateString);
	const lang = siteConfig.lang || "en";
	const timeGap = siteConfig.timeZone || 8;
	
	// 调整日期到正确的时区
	const utcTimestamp = date.getTime();
	const targetTimestamp = utcTimestamp + (timeGap - date.getTimezoneOffset() / 60) * 60 * 60 * 1000;
	const targetDate = new Date(targetTimestamp);

	// 根据语言设置不同的日期格式
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: `Etc/GMT${timeGap >= 0 ? '-' : '+'}${Math.abs(timeGap)}`,
	};

	// 语言代码映射
	const localeMap: Record<string, string> = {
		zh_CN: "zh-CN",
		zh_TW: "zh-TW",
		en: "en-US",
		ja: "ja-JP",
		ko: "ko-KR",
		es: "es-ES",
		th: "th-TH",
		vi: "vi-VN",
		tr: "tr-TR",
		id: "id-ID",
		fr: "fr-FR",
		de: "de-DE",
		ru: "ru-RU",
		ar: "ar-SA",
	};

	const locale = localeMap[lang] || "en-US";
	return targetDate.toLocaleDateString(locale, options);
}
