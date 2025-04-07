import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const t = useTranslations("home");

  return (
    <section className="py-20">
      <div className="mx-auto max-w-[800px] px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("faq.title")}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>{t("faq.q1")}</AccordionTrigger>
            <AccordionContent>{t("faq.a1")}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>{t("faq.q2")}</AccordionTrigger>
            <AccordionContent>{t("faq.a2")}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>{t("faq.q3")}</AccordionTrigger>
            <AccordionContent>{t("faq.a3")}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>{t("faq.q4")}</AccordionTrigger>
            <AccordionContent>{t("faq.a4")}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
} 