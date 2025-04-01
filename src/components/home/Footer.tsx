import { useTranslations } from "next-intl";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  const t = useTranslations("home");

  return (
    <footer className="py-8 border-t">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="mailto:xxx@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              <span>{t("footer.email")}</span>
            </Link>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
