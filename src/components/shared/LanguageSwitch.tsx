"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { locales, localeNames } from "@/i18n/config";
import { Link, usePathname } from "@/i18n/routing.public";

export default function LanguageSwitch() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 flex items-center gap-2 px-3"
        >
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span>{localeNames[locale as keyof typeof localeNames]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => {
          return (
            <DropdownMenuItem
              key={loc}
              className={locale === loc ? "bg-accent" : ""}
            >
              <Link className="w-full" href={pathname} locale={loc}>
                <span className="flex items-center gap-2">
                  {localeNames[loc]}
                  {locale === loc && (
                    <span className="text-xs text-muted-foreground">✓</span>
                  )}
                </span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
