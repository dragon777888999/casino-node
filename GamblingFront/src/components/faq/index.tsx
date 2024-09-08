"use client";
import { useState } from 'react';
import Image from "next/image";
import { useAppContext } from "../../hooks/AppContext";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { siteInfo } = useAppContext();

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h3 className="SlotsList_heading-item sub-title mb-3 flex items-center gap-3 text-white">
        <Image src={`/default/images/faq.png`} alt="Project Thumbnail" width={28} height={18} />
        FAQ
      </h3>
      {siteInfo.faqList.map((item, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleAnswer(index)}>
            <h3>{item.question}</h3>
            <span className="arrow-icon">
              {activeIndex === index ? '▲' : '▼'}
            </span>
          </div>
          <div
            className={`faq-answer ${activeIndex === index ? 'open' : ''}`}
            style={{ maxHeight: activeIndex === index ? '200px' : '0px' }}
          >
            <div dangerouslySetInnerHTML={{ __html: item.answer }} />
          </div>
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
                    border: 1px solid #284265;
                    background-color: #24303f;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .faq-answer {
                    overflow: hidden;
                    padding: 0 10px;
                    border: 1px solid #284265;
                    border-top: none;
                    transition: max-height 0.3s ease;
                    max-height: 0;
                }
                .faq-answer.open {
                    padding: 10px;
                }
                .arrow-icon {
                    font-size: 16px;
                }
            `}</style>
    </div>
  );
};

export default FAQ;
