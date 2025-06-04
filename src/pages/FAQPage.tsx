
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is Metal & Lace Crafts?",
    answer: "Metal & Lace Crafts is an online shop featuring handcrafted ceramics made by talented artisans. Each piece is unique and carefully crafted for elegance and durability.",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can contact us any time through our Contact page, or email us directly at support@finware.com. We're happy to help with questions and concerns!",
  },
  {
    question: "What is your shipping policy?",
    answer: "We offer standard and express shipping options globally. Shipping costs and estimated delivery times are calculated at checkout based on your location.",
  },
  {
    question: "Do you offer returns or exchanges?",
    answer: "Yes! If you're not satisfied with your purchase, please contact us within 30 days for a return or exchange. See our Returns & Exchanges page for full details.",
  },
  {
    question: "Are your products dishwasher safe?",
    answer: "Most of our ceramics are dishwasher safe, but we recommend hand-washing for longevity. Please refer to the care instructions on each product page.",
  },
];

const FAQPage = () => (
  <div className="max-w-2xl mx-auto px-4 py-12 min-h-[60vh] mt-16">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center mb-8"
    >
      <HelpCircle className="w-10 h-10 text-amethyst mb-2" />
      <h1 className="text-3xl font-serif font-bold text-metal mb-2">Frequently Asked Questions</h1>
      <p className="text-metal/70 text-center text-lg">
        Here you'll find answers to the most common questions. If you need more help, feel free to <a href="/contact" className="text-amethyst underline">contact us</a>.
      </p>
    </motion.div>
    <Accordion type="single" collapsible className="w-full bg-white rounded-lg shadow-lg">
      {faqs.map((faq, idx) => (
        <AccordionItem key={idx} value={`faq-${idx}`}>
          <AccordionTrigger className="text-lg font-medium text-metal px-6">{faq.question}</AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-metal/80">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default FAQPage;
