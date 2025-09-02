import { fetchWithCorsProxy } from "./corsProxy";

interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
  unit: number;
}


export const fetchCurrencyRates = async (_date?: string): Promise<{
  rates: CurrencyRate[];
  lastUpdated: string;
}> => {
  try {
    
    const targetDate = "2025-07-31";
    const apiUrl = encodeURIComponent(`http://nbt.tj/ru/kurs/export_xml.php?date=${targetDate}&export=xmlout`);
    
 
    const response = await fetchWithCorsProxy(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlText = await response.text();
    return parseXMLResponse(xmlText, targetDate);
  } catch (error) {
    console.error('Error fetching currency rates:', error);
   
    return getFallbackData();
  }
};

const parseXMLResponse = (xmlText: string, date: string): {
  rates: CurrencyRate[];
  lastUpdated: string;
} => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  
  const rates: CurrencyRate[] = [];
  const currencyElements = xmlDoc.getElementsByTagName('currency');
  
  for (let i = 0; i < currencyElements.length; i++) {
    const currency = currencyElements[i];
    const code = currency.getAttribute('code') || '';
    const name = currency.getAttribute('name') || '';
    const unit = parseInt(currency.getAttribute('unit') || '1');
    const rate = parseFloat(currency.textContent || '0');
    
    if (code && name && rate > 0) {
      rates.push({ code, name, rate, unit });
    }
  }
  
  const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return {
    rates,
    lastUpdated: formattedDate
  };
};

const getFallbackData = (): {
  rates: CurrencyRate[];
  lastUpdated: string;
} => {

  const rates = [
    { code: 'AUD', name: 'Австралийский доллар', rate: 4.5530, unit: 1 },
    { code: 'AZN', name: 'Азербайджанский манат', rate: 5.9655, unit: 1 },
    { code: 'GBP', name: 'Английский фунт стерлингов', rate: 9.7859, unit: 1 },
    { code: 'AMD', name: 'Армянский драм', rate: 1.3074, unit: 100 },
    { code: 'AFN', name: 'Афганский афгани', rate: 1.0254, unit: 10 },
    { code: 'BYR', name: 'Белорусских рублей', rate: 0.0411, unit: 100 },
    { code: 'GEL', name: 'Грузинский лари', rate: 2.7584, unit: 1 },
    { code: 'DKK', name: 'Датская крона', rate: 0.9198, unit: 1 },
    { code: 'AED', name: 'Дирхам ОАЭ', rate: 1.7043, unit: 1 },
    { code: 'USD', name: 'Доллар США', rate: 6.2602, unit: 1 },
    { code: 'EUR', name: 'ЕВРО', rate: 6.8606, unit: 1 },
    { code: 'INR', name: 'Индийская рупия', rate: 0.9778, unit: 10 },
    { code: 'IRR', name: 'Иранский риал', rate: 0.2115, unit: 1000 },
    { code: 'ISK', name: 'Исландская крона', rate: 0.4650, unit: 10 },
    { code: 'KZT', name: 'Казахский тенге', rate: 0.3340, unit: 10 },
    { code: 'CAD', name: 'Канадский доллар', rate: 4.8248, unit: 1 },
    { code: 'KGS', name: 'Киргизский сом', rate: 1.0259, unit: 10 },
    { code: 'CNY', name: 'Китайский юань', rate: 1.0081, unit: 1 },
    { code: 'KWD', name: 'Кувейтский динар', rate: 20.6539, unit: 1 },
    { code: 'MYR', name: 'Малайзийский ринггит', rate: 1.6392, unit: 1 },
    { code: 'MDL', name: 'Молдавский лей', rate: 0.3333, unit: 1 },
    { code: 'TRY', name: 'Турецкая лира', rate: 2.2502, unit: 1 },
    { code: 'TMT', name: 'Новый туркменский манат', rate: 1.7886, unit: 1 },
    { code: 'NOK', name: 'Норвежская крона', rate: 0.7671, unit: 1 },
    { code: 'PKR', name: 'Пакистанская рупия', rate: 0.6150, unit: 10 },
    { code: 'PLN', name: 'Польский злотый', rate: 1.6553, unit: 1 },
    { code: 'SAR', name: 'Риал Саудовской Аравии', rate: 1.6693, unit: 1 },
    { code: 'RUB', name: 'Российский рубль', rate: 0.1113, unit: 1 },
    { code: 'XDR', name: 'СДР', rate: 8.7580, unit: 1 },
    { code: 'SGD', name: 'Сингапурский доллар', rate: 4.5555, unit: 1 },
    { code: 'THB', name: 'Таиландский бат', rate: 0.1785, unit: 1 },
    { code: 'UZS', name: 'Узбекский Сум', rate: 0.2431, unit: 100 },
    { code: 'UAH', name: 'Украинская гривна', rate: 0.2878, unit: 1 },
    { code: 'SEK', name: 'Шведская крона', rate: 0.7241, unit: 1 },
    { code: 'CHF', name: 'Швейцарский франк', rate: 6.4505, unit: 1 },
    { code: 'JPY', name: 'Японская йена', rate: 0.5034, unit: 10 }
  ];

  return {
    rates,
    lastUpdated: '31 июля 2015'
  };
};

export const formatCurrencyRate = (rate: number, unit: number): string => {
  return `${unit} = ${rate.toFixed(4)} TJS`;
};

export const getMajorCurrencies = (): string[] => {
  return ['USD', 'EUR', 'RUB', 'CNY', 'GBP'];
};