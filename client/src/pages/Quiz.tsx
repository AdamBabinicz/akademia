import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { DailyFact } from "@/components/DailyFact";
import { AdaptiveQuiz } from "@/components/InteractiveModules/AdaptiveQuiz";
import { Language } from "@/types/education";
import { FormattedMessage, useIntl } from "react-intl";
import SEO from "@/components/SEO";
import quizHeroImage from "@assets/generated_images/10.png";

interface QuizProps {
  language: Language;
}

export default function Quiz({ language }: QuizProps) {
  const intl = useIntl();

  return (
    <>
      <SEO
        title={intl.formatMessage({ id: "home.modules.quiz.title" })}
        description={intl.formatMessage({
          id: "home.modules.quiz.description",
        })}
        schema={{ type: "article" }}
      />
      <div
        className="min-h-screen transition-all duration-300 ease-in-out"
        data-testid="quiz-page"
      >
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-card border-b border-border py-12 px-6 lg:px-12 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${quizHeroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="mt-8 lg:mt-0">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  <FormattedMessage
                    id="home.modules.quiz.title"
                    defaultMessage="Quiz adaptacyjny"
                  />
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  <FormattedMessage
                    id="home.modules.quiz.description"
                    defaultMessage="Test wiedzy dostosowujący się do Twojego poziomu"
                  />
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="quiz.time"
                        defaultMessage="~15 min"
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block">
                <img
                  src={quizHeroImage}
                  alt={intl.formatMessage({ id: "quiz.hero.imageAlt" })}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <DailyFact language={language} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AdaptiveQuiz language={language} />
          </motion.div>
        </div>
      </div>
    </>
  );
}
