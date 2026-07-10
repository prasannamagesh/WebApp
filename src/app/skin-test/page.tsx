'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
}

const SKIN_TEST_QUESTIONS: Question[] = [
  {
    id: 'type',
    question: 'What is your skin type?',
    options: ['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive'],
  },
  {
    id: 'concerns',
    question: 'What are your main skin concerns?',
    options: ['Acne', 'Sensitivity', 'Dryness', 'Hyperpigmentation', 'Aging', 'All of the above'],
  },
  {
    id: 'routine',
    question: 'How often do you use skincare?',
    options: ['Daily', '3-4 times a week', 'Weekly', 'Rarely', 'Never'],
  },
  {
    id: 'actives',
    question: 'Have you used active ingredients before?',
    options: ['Yes, regularly', 'Sometimes', 'Never', 'Unsure'],
  },
];

const RECOMMENDATIONS: { [key: string]: { title: string; products: string[] } } = {
  dry: {
    title: 'Barrier Repair Moisturiser + Hyaluronic Hydration Serum',
    products: ['barrier-moisturiser', 'hyaluronic-hydration-serum'],
  },
  oily: {
    title: 'Brightening Serum + SPF Sunscreen',
    products: ['brightening-serum', 'spf-sunscreen'],
  },
  sensitive: {
    title: 'Post Exposure Recovery Serum + Barrier Repair Moisturiser',
    products: ['ectoin-recovery-serum', 'barrier-moisturiser'],
  },
  aging: {
    title: 'Retinol Night Cream + Peptide Eye Cream',
    products: ['retinol-night-cream', 'peptide-eye-cream'],
  },
  brightening: {
    title: 'Vitamin C Radiance Serum + Brightening Serum',
    products: ['vitamin-c-brightening', 'brightening-serum'],
  },
};

export default function SkinTestPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (questionId: string, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (currentStep < SKIN_TEST_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate recommendation
      const concern = answer.toLowerCase();
      const matchedKey = Object.keys(RECOMMENDATIONS).find(key => concern.includes(key)) || 'dry';
      setResult(matchedKey);
    }
  };

  const progress = (currentStep / SKIN_TEST_QUESTIONS.length) * 100;
  const question = SKIN_TEST_QUESTIONS[currentStep];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        {result === null && (
          <>
            <div className="mb-12 text-center">
              <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">Find Your Perfect Routine</h1>
              <p className="text-lg text-muted max-w-xl mx-auto">
                Answer a few quick questions and we&apos;ll recommend the perfect DermFix products for your skin.
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-12">
              <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-brand-accent transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted text-center">
                Question {currentStep + 1} of {SKIN_TEST_QUESTIONS.length}
              </p>
            </div>

            {/* Question */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-8">{question.question}</h2>

              {/* Options grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(question.id, option)}
                    className="relative group overflow-hidden rounded-xl p-4 text-left border-2 border-zinc-200
                               hover:border-brand-accent transition-all duration-200 bg-white hover:bg-blue-50"
                  >
                    <span className="relative z-10 text-[15px] font-semibold text-foreground group-hover:text-brand-accent transition-colors">
                      {option}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/0 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Results */}
        {result !== null && (
          <div className="text-center">
            <div className="mb-8 inline-flex items-center justify-center w-16 h-16 bg-brand-accent/10 rounded-full">
              <CheckCircle2 size={32} className="text-brand-accent" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">Your Perfect Routine</h2>
            <p className="text-lg text-muted mb-8 max-w-xl mx-auto">
              Based on your answers, we recommend:
            </p>

            {result && RECOMMENDATIONS[result] && (
              <div className="bg-white border-2 border-brand-accent rounded-2xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-foreground mb-6">{RECOMMENDATIONS[result].title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {RECOMMENDATIONS[result].products.map((slug) => (
                    <div key={slug} className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-muted capitalize mb-2">Recommended for you</p>
                      <p className="font-semibold text-foreground capitalize">{slug.replace('-', ' ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/products"
                className="inline-flex items-center gap-2 bg-brand-accent text-white px-8 py-4 rounded-lg
                           font-semibold hover:opacity-90 transition-opacity"
              >
                View All Products
                <ArrowRight size={16} />
              </a>
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setAnswers({});
                  setResult(null);
                }}
                className="px-8 py-4 rounded-lg border-2 border-foreground font-semibold
                           hover:bg-foreground hover:text-white transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
