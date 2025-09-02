import { Calendar, RefreshCw, TrendingDown, TrendingUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import './CurrencyPage.scss';

interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
  unit: number;
}

const CurrencyPage: React.FC = () => {
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const parseRatesData = () => {
    const ratesData = [
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

    setRates(ratesData);
    setLastUpdated('31 июля 2015');
    setLoading(false);
  };

  useEffect(() => {
    
    setTimeout(() => {
      parseRatesData();
    }, 1000);
  }, []);

  const filteredRates = rates.filter(rate => 
    rate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rate.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const majorCurrencies = ['USD', 'EUR', 'RUB', 'CNY', 'GBP'];
  const majorRates = filteredRates.filter(rate => majorCurrencies.includes(rate.code));
  const otherRates = filteredRates.filter(rate => !majorCurrencies.includes(rate.code));

  const refreshRates = () => {
    setLoading(true);
    setTimeout(() => {
      parseRatesData();
    }, 1000);
  };

  if (loading) {
    return (
      <div className="currency-page">
        <div className="currency-page__loading">
          <RefreshCw className="currency-page__loading-icon" size={32} />
          <p>Загрузка курсов валют...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="currency-page">
      <h1 className="currency-page__title">API НБТ не работает(CORS Ошибка)</h1>
      <div className="currency-page__header">
        <div className="currency-page__title-section">
          <h1 className="currency-page__title">Курсы валют</h1>
          <p className="currency-page__subtitle">
            Официальные курсы Национального банка Таджикистана
          </p>
        </div>
        
        <div className="currency-page__actions">
          <div className="currency-page__date">
            <Calendar size={16} />
            <span>Обновлено: {lastUpdated}</span>
          </div>
          <button onClick={refreshRates} className="currency-page__refresh">
            <RefreshCw size={16} />
            <span>Обновить</span>
          </button>
        </div>
      </div>

      <div className="currency-page__search">
        <input
          type="text"
          placeholder="Поиск валюты..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="currency-page__search-input"
        />
      </div>

      {majorRates.length > 0 && (
        <div className="currency-section">
          <h2 className="currency-section__title">Основные валюты</h2>
          <div className="currency-grid currency-grid--major">
            {majorRates.map((rate) => (
              <div key={rate.code} className="currency-card currency-card--major">
                <div className="currency-card__header">
                  <div className="currency-card__code">{rate.code}</div>
                  <div className="currency-card__trend">
                    {Math.random() > 0.5 ? (
                      <TrendingUp size={16} className="trend-up" />
                    ) : (
                      <TrendingDown size={16} className="trend-down" />
                    )}
                  </div>
                </div>
                <div className="currency-card__name">{rate.name}</div>
                <div className="currency-card__rate">
                  <span className="currency-card__amount">{rate.unit}</span>
                  <span className="currency-card__equals">=</span>
                  <span className="currency-card__value">{rate.rate.toFixed(4)} TJS</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {otherRates.length > 0 && (
        <div className="currency-section">
          <h2 className="currency-section__title">Другие валюты</h2>
          <div className="currency-list">
            {otherRates.map((rate) => (
              <div key={rate.code} className="currency-item">
                <div className="currency-item__info">
                  <div className="currency-item__code">{rate.code}</div>
                  <div className="currency-item__name">{rate.name}</div>
                </div>
                <div className="currency-item__rate">
                  <span className="currency-item__unit">{rate.unit}</span>
                  <span className="currency-item__value">{rate.rate.toFixed(4)} TJS</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredRates.length === 0 && searchTerm && (
        <div className="currency-page__no-results">
          <p>Валюта не найдена</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyPage;