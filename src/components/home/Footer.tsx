import { useTranslations } from "next-intl";
import Link from "next/link";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const t = useTranslations("home");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // 动态生成邮箱地址
    const name = "xxx";
    const domain = "gmail.com";
    const fullEmail = `${name}@${domain}`;
    setEmail(fullEmail);
  }, []);

  return (
    <footer className="py-8 border-t">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {email && (
              <Link href={`mailto:${email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </Link>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
