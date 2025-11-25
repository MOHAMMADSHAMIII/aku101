
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, Send } from 'lucide-react';
import { BriefConfig, Question } from '../constants/briefs';

interface BriefFormProps {
  config: BriefConfig;
}

export const BriefForm: React.FC<BriefFormProps> = ({ config }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Reset form when config changes
  useEffect(() => {
    setCurrentStep(0);
    setAnswers({});
    setIsSuccess(false);
  }, [config.id]);

  const totalSteps = config.questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentQuestion = config.questions[currentStep];

  const handleInputChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
    setError('');
  };

  const validateCurrentStep = () => {
    if (currentQuestion.required && !answers[currentQuestion.id]) {
      setError('This field is required');
      return false;
    }
    if (currentQuestion.type === 'email' && answers[currentQuestion.id]) {
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(answers[currentQuestion.id])) {
           setError('Please enter a valid email address');
           return false;
       }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      submitForm();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setError('');
    }
  };

  const encode = (data: any) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

  const submitForm = () => {
    setIsSubmitting(true);
    
    const submissionData = {
        "form-name": "briefs",
        "service_id": config.id,
        ...answers
    };

    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(submissionData)
    })
    .then(() => {
        setIsSuccess(true);
    })
    .catch((err) => {
        console.error("Form submission error:", err);
        setError("Something went wrong. Please try again.");
    })
    .finally(() => {
        setIsSubmitting(false);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && currentQuestion.type !== 'textarea') {
          handleNext();
      }
  }

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full text-center py-12"
      >
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
          <CheckCircle className="text-green-500 w-10 h-10" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Brief Sent!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Thanks! We'll review your details and contact you at <span className="text-aku-teal font-medium">{answers.email || answers.phone}</span> shortly.
        </p>
        <a 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-aku-teal dark:hover:bg-aku-teal dark:hover:text-white transition-colors text-sm"
        >
          Back to Home
        </a>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {/* Header & Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-3">
            <span className="text-xs font-bold text-aku-teal uppercase tracking-widest">Step {currentStep + 1} / {totalSteps}</span>
            <span className="text-[10px] text-gray-400 font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-aku-teal"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question & Input Area */}
      <div className="flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
            className="flex-grow"
          >
            <h3 className="text-xl md:text-3xl font-light text-gray-900 dark:text-white mb-2 leading-tight">
              {currentQuestion.text}
              {currentQuestion.required && <span className="text-aku-teal ml-1">*</span>}
            </h3>
            
            <div className="mt-6" onKeyDown={handleKeyDown}>
              {renderInput(currentQuestion, answers[currentQuestion.id] || '', handleInputChange, error)}
            </div>
            
            {error && (
                <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-red-500 text-xs mt-2 flex items-center gap-1.5 font-medium"
                >
                    <span className="w-1 h-1 rounded-full bg-red-500" />
                    {error}
                </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation - Inline & Compact */}
      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
        
        {/* Back Button */}
        <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                currentStep === 0 
                ? 'opacity-0 pointer-events-none' 
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
        >
            <ArrowLeft size={16} className="rtl:rotate-180" />
            <span>Back</span>
        </button>

        {/* Next/Finish Button */}
        <button
            onClick={handleNext}
            disabled={isSubmitting}
            className={`relative overflow-hidden flex items-center justify-center gap-2 pl-6 pr-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md active:scale-95 ${
                isSubmitting 
                ? 'bg-gray-100 dark:bg-white/10 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-aku-teal dark:hover:bg-aku-teal dark:hover:text-white'
            }`}
        >
            {isSubmitting ? (
                <Loader2 className="animate-spin" size={18} />
            ) : (
                <>
                    <span className="text-sm">{currentStep === totalSteps - 1 ? 'Finish' : 'Next'}</span>
                    {currentStep === totalSteps - 1 ? (
                        <Send size={14} className="rtl:rotate-180" />
                    ) : (
                        <ArrowRight size={14} className="rtl:rotate-180" />
                    )}
                </>
            )}
        </button>
      </div>
    </div>
  );
};

const renderInput = (
  question: Question, 
  value: string, 
  onChange: (val: string) => void,
  error: string
) => {
  const commonClasses = `w-full bg-white dark:bg-white/5 border ${error ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-xl px-5 py-3 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-aku-teal dark:focus:border-aku-teal transition-all shadow-sm`;

  switch (question.type) {
    case 'textarea':
      return (
        <textarea
          autoFocus
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className={`${commonClasses} resize-none`}
        />
      );
    case 'choice':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options?.map((option) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`p-4 rounded-xl text-left border transition-all duration-200 ${
                value === option
                  ? 'bg-aku-teal text-white border-aku-teal shadow-md shadow-aku-teal/20'
                  : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-aku-teal/50 hover:bg-gray-50 dark:hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-medium text-sm md:text-base">{option}</span>
                {value === option && <CheckCircle size={18} />}
              </div>
            </button>
          ))}
        </div>
      );
    case 'phone':
       return (
        <input
          autoFocus
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className={commonClasses}
        />
      );
    default: // text, email
      return (
        <input
          autoFocus
          type={question.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className={commonClasses}
        />
      );
  }
};
