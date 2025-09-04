import React from 'react';
import { motion } from 'framer-motion';

interface MDXRendererProps {
  content: string;
  children?: React.ReactNode;
}

export function MDXRenderer({ content, children }: MDXRendererProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-lg max-w-none prose-invert"
      data-testid="mdx-content"
    >
      {/* In a real implementation, this would use MDX to render the content */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {children}
    </motion.div>
  );
}