import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import "./Claimform.scss";

interface FormData {
  fullName: string;
  policyNumber: string;
  email: string;
  phone: string;
  description: string;
  files: File[];
}

const ClaimForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    policyNumber: '',
    email: '',
    phone: '',
    description: '',
    files: []
  });

  const [errors, setErrors] = useState<{[key: string]: boolean}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newErrors: {[key: string]: boolean} = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = true;
    if (!formData.policyNumber.trim()) newErrors.policyNumber = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.phone.trim()) newErrors.phone = true;
    if (!formData.description.trim()) newErrors.description = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
    
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      alert('Заявка успешно отправлена!');
      
      setFormData({
        fullName: '',
        policyNumber: '',
        email: '',
        phone: '',
        description: '',
        files: []
      });
    }
    
    setIsSubmitting(false);
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  return (
    <motion.div 
      className="claim-form"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="claim-form__title">Регистрация страхового случая</h1>
      
      <form className="claim-form__form" onSubmit={handleSubmit}>
        <div className="claim-form__row">
          <div className="claim-form__field">
            <label className="claim-form__label">
              ФИО <span className="claim-form__required">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              className={`claim-form__input ${errors.fullName ? 'claim-form__input--error' : ''}`}
              placeholder="ФИО застрахованного"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName && <span className="claim-form__error">Неверно заполнено</span>}
          </div>
          
          <div className="claim-form__field">
            <label className="claim-form__label">
              Номер полиса <span className="claim-form__required">*</span>
            </label>
            <input
              type="text"
              name="policyNumber"
              className={`claim-form__input ${errors.policyNumber ? 'claim-form__input--error' : ''}`}
              placeholder="Номер полиса"
              value={formData.policyNumber}
              onChange={handleInputChange}
            />
            {errors.policyNumber && <span className="claim-form__error">Неверно заполнено</span>}
          </div>
        </div>

        <div className="claim-form__row">
          <div className="claim-form__field">
            <label className="claim-form__label">
              Электронная почта <span className="claim-form__required">*</span>
            </label>
            <input
              type="email"
              name="email"
              className={`claim-form__input ${errors.email ? 'claim-form__input--error' : ''}`}
              placeholder="mail@mail.ru"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="claim-form__error">Неверно заполнено</span>}
          </div>
          
          <div className="claim-form__field">
            <label className="claim-form__label">
              Телефон <span className="claim-form__required">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              className={`claim-form__input ${errors.phone ? 'claim-form__input--error' : ''}`}
              placeholder="(992) 00-000-0000"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <span className="claim-form__error">Неверно заполнено</span>}
          </div>
        </div>

        <div className="claim-form__field claim-form__field--full">
          <label className="claim-form__label">
            Описание <span className="claim-form__required">*</span>
          </label>
          <textarea
            name="description"
            rows={6}
            className={`claim-form__textarea ${errors.description ? 'claim-form__textarea--error' : ''}`}
            placeholder="Опишите обстоятельства события"
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && <span className="claim-form__error">Неверно заполнено</span>}
        </div>

        <div className="claim-form__file-section">
          <p className="claim-form__file-label">
            Добавить фото с места события и/или сканы документов
          </p>
          <label className="claim-form__file-upload">
            <input
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="claim-form__file-input"
            />
            <Plus size={20} />
            <span>Прикрепить файл</span>
          </label>
          
          {formData.files.length > 0 && (
            <div className="claim-form__files">
              {formData.files.map((file, index) => (
                <motion.div 
                  key={index} 
                  className="claim-form__file"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <span>{file.name}</span>
                  <button 
                    type="button" 
                    onClick={() => removeFile(index)}
                    className="claim-form__file-remove"
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="claim-form__submit">
          <button 
            type="submit" 
            className="claim-form__submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Подтвердить'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ClaimForm;