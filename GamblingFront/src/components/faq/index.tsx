"use client";
import { useState } from 'react';
import Image from "next/image";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  { question: 'What is Next.js?', answer: 'Next.js is a React framework for building server-side rendered applications.' },
  { question: 'How do I add an FAQ section?', answer: 'You can add an FAQ section by creating a component and using state for toggling answers.' },
  // Add more FAQ items here
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h3 className="SlotsList_heading-item sub-title mb-3 flex items-center gap-3 text-white">
        <Image src={`/default/images/faq.png`} alt="Project Thumbnail" width={28} height={18} />
        FAQ
      </h3>
      {faqData.map((item, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleAnswer(index)}>
            <h3>{item.question}</h3>
          </div>
          {activeIndex === index && <p className="faq-answer">{item.answer}</p>}
        </div>
      ))}
      <style jsx>{`
        .faq-container {
          // max-width: 600px;
          margin: 0 auto;
        }
        .faq-question {
          cursor: pointer;
          padding: 10px;
          border: 1px solid #ccc;
        }
        .faq-answer {
          padding: 10px;
          border: 1px solid #ccc;
          border-top: none;
        }
      `}</style>
    </div>
  );
};

export default FAQ;
