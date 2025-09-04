import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import { ArrowLeft } from "lucide-react";
import { Language } from "@/types/education";
import { Button } from "@/components/ui/button";

interface PrivacyProps {
  language: Language;
}

export default function Privacy({ language }: PrivacyProps) {
  const sections = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const intl = useIntl();

  return (
    <>
      <SEO
        title={intl.formatMessage({ id: "privacy.title" })}
        description={intl.formatMessage({ id: "privacy.introduction" })}
        schema={{ type: "article" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl mx-auto px-6 lg:px-8 py-12 space-y-8"
      >
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <FormattedMessage id="common.backToHome" />
            </Button>
          </Link>
        </div>

        <header className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <FormattedMessage id="privacy.title" />
          </h2>
          <p className="text-muted-foreground text-lg">
            <FormattedMessage id="privacy.lastUpdated" />
          </p>
        </header>

        <div className="prose dark:prose-invert max-w-none text-foreground/90 space-y-6">
          <p>
            <FormattedMessage id="privacy.introduction" />
          </p>

          {sections.map((sectionNum) => (
            <section key={sectionNum}>
              <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
                <FormattedMessage id={`privacy.section${sectionNum}.title`} />
              </h2>
              <div
                className="mt-4 space-y-4"
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage({
                    id: `privacy.section${sectionNum}.content`,
                  }),
                }}
              />
            </section>
          ))}
        </div>
      </motion.div>
    </>
  );
}
