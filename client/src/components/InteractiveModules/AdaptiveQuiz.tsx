import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Brain, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SAMPLE_QUIZ_QUESTIONS } from '@/lib/constants';
import { QuizQuestion, Language } from '@/types/education';

interface AdaptiveQuizProps {
  language: Language;
}

export function AdaptiveQuiz({ language }: AdaptiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions = SAMPLE_QUIZ_QUESTIONS;
  const question = questions[currentQuestion];

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
      setAnswers(prev => prev.slice(0, -1));
    }
  };

  const getQuestionText = () => {
    switch (language) {
      case 'en': return question.questionEn;
      case 'hu': return question.questionHu;
      default: return question.questionPl;
    }
  };

  const getOptionText = (option: any) => {
    switch (language) {
      case 'en': return option.textEn;
      case 'hu': return option.textHu;
      default: return option.textPl;
    }
  };

  if (showResult) {
    const score = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;
    
    return (
      <div className="interactive-module rounded-xl p-8" data-testid="quiz-results">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-card-foreground mb-4">
            Quiz ukończony!
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            Twój wynik: {score} z {questions.length} ({Math.round((score / questions.length) * 100)}%)
          </p>
          <Button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers([]);
              setSelectedAnswer(null);
              setShowResult(false);
            }}
            data-testid="restart-quiz"
          >
            Rozpocznij ponownie
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="interactive-module rounded-xl p-8" data-testid="adaptive-quiz-module">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary rounded-lg">
          <Brain className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-card-foreground">Quiz adaptacyjny</h3>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Question Card */}
          <div className="bg-background rounded-lg p-6 border border-border mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground" data-testid="question-counter">
                <FormattedMessage 
                  id="quiz.question" 
                  defaultMessage="Pytanie {current} z {total}"
                  values={{ current: currentQuestion + 1, total: questions.length }}
                />
              </span>
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                {question.difficulty === 'easy' ? 'Łatwy' : question.difficulty === 'medium' ? 'Średni' : 'Trudny'}
              </span>
            </div>
            
            <h4 className="text-xl font-semibold text-foreground mb-6" data-testid="question-text">
              {getQuestionText()}
            </h4>
            
            <div className="space-y-3">
              {question.options.map((option) => (
                <Button
                  key={option.id}
                  variant={selectedAnswer === option.id ? "default" : "outline"}
                  className="w-full p-4 text-left justify-start h-auto"
                  onClick={() => handleAnswerSelect(option.id)}
                  data-testid={`option-${option.id}`}
                >
                  {option.id.toUpperCase()}) {getOptionText(option)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              data-testid="previous-button"
            >
              <FormattedMessage id="quiz.previous" defaultMessage="Poprzednie" />
            </Button>
            
            <div className="flex gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-2 rounded-full ${
                    index < currentQuestion ? 'bg-primary' : 
                    index === currentQuestion ? 'bg-accent' : 'bg-muted'
                  }`}
                  data-testid={`progress-dot-${index}`}
                />
              ))}
            </div>
            
            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              data-testid="next-button"
            >
              <FormattedMessage id="quiz.next" defaultMessage="Następne" />
            </Button>
          </div>
        </div>

        {/* Progress Sidebar */}
        <div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <h4 className="font-semibold text-card-foreground mb-4">
              <FormattedMessage id="quiz.progress" defaultMessage="Twój postęp" />
            </h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Elektryczność</span>
                  <span className="text-primary">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Magnetyzm</span>
                  <span className="text-muted-foreground">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Ziemia i kosmos</span>
                  <span className="text-muted-foreground">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">Osiągnięcie</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Ukończono pierwszy rozdział o prądzie elektrycznym!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
