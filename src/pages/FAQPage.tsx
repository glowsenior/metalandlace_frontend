
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
    answer: `You can reach us via:<br />
              Email: metalandlacecrafts@gmail.com<br />
              Phone: (682) 472-1129<br />
              Contact Form: Available on our Contact Us page.`,
  },
  {
    question: "What is your shipping policy?",
    answer: "We offer standard and express shipping options globally. Shipping costs and estimated delivery times are calculated at checkout based on your location.",
  },
  {
    question: "What types of products do you offer?",
    answer: "We specialize in handcrafted custom tumblers, ceramics, and other unique handmade items. Each product is made with care and attention to detail to ensure it’s one of a kind.",
  },
  {
    question: "Can I request a custom design?",
    answer: "Absolutely! Custom designs are our specialty. <br />You can provide details such as colors, themes, text, or any other preferences, and we’ll create a piece tailored to your vision. Visit our Custom Designs page for more details on how to submit a request.",
  },
  {
    question: "How long does it take to receive my order?",
    answer: "Our processing time for custom orders is typically [insert timeframe, e.g., 7–14 business days], depending on the complexity of the design.<br /> Once your order is shipped, you will receive tracking information. Delivery times may vary based on your location.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we offer international shipping. Shipping costs and delivery times vary depending on your location. Please note that customs fees or import taxes may apply, which are the responsibility of the buyer.",
  },
  {
    question: "What is your return policy?",
    answer: "Due to the custom nature of our products, we do not accept returns or offer refunds unless the item arrives damaged or defective. If there’s an issue with your order, please contact us within 7 days of delivery with photos of the item and packaging.",
  },
  {
    question: "How should I care for my tumbler or ceramic item?",
    answer: `Tumblers: Hand wash only with mild soap and water. Avoid using abrasive materials or dishwashers.<br />
              Ceramics: Handle with care and avoid sudden temperature changes to prevent cracking. Most of our ceramic items are not microwave or dishwasher safe unless otherwise noted.`,
  },
  {
    question: "Do you offer bulk orders for events or businesses?",
    answer: "Yes, we can accommodate bulk orders for events, businesses, or special occasions. Contact us to discuss your requirements, timelines, and pricing.",
  },
  {
    question: "What materials do you use for your products?",
    answer: "We use high-quality materials such as stainless steel for tumblers and durable, food-safe clay for ceramics. Our glitter, paints, and finishes are carefully selected to ensure both beauty and longevity.",
  },
  {
    question: "Can I make changes to my order after it’s been placed?",
    answer: "If you need to make changes, please contact us as soon as possible. Once production begins, changes may not be possible. We’ll do our best to accommodate your request.",
  },
  {
    question: "Do you offer gift wrapping or special packaging?",
    answer: "Yes, we offer gift wrapping for an additional fee. Let us know during checkout if you’d like to include a personalized message or special packaging.",
  },
  {
    question: "Do you support any causes or charities?",
    answer: "Yes, through the ChanniShai Project, we honor our daughter’s memory by creating custom products that celebrate individuals with special needs. <br />A portion of proceeds may also go toward supporting related causes.",
  },
];

const FAQPage = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 min-h-[60vh] mt-16">
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
          <AccordionContent className="px-6 pb-4 text-metal/80"><div dangerouslySetInnerHTML={{ __html: faq.answer }} /></AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default FAQPage;
