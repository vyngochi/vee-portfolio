import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { profile } from "@/content/profile";
import { t } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import { CopyEmailButton } from "./CopyEmailButton";

/**
 * Section Contact: một thẻ lớn, chữ bên trái, ảnh cầm laptop bên phải sát đáy thẻ. [P6.1, P6.2]
 * Email và mạng xã hội chỉ nằm ở đây (Footer không lặp lại).
 * Mobile: chữ ở trên, ảnh ở dưới.
 */
export async function Contact() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const c = dict.contact;

  return (
    <Section id="contact" title={dict.sections.contact}>
      <div className="grid overflow-hidden rounded-card border border-border bg-card text-card-foreground md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col justify-center gap-8 p-6 sm:p-10 lg:p-14">
          <p className="max-w-[32ch] text-xl leading-relaxed font-medium text-pretty sm:text-2xl sm:leading-relaxed">
            {c.intro}
          </p>

          <div className="flex flex-col gap-3">
            <p className="text-eyebrow uppercase text-muted-foreground">{c.email}</p>
            <a
              href={`mailto:${profile.email}`}
              className="w-fit break-all text-title underline decoration-border decoration-1 underline-offset-8 transition-colors hover:decoration-primary"
            >
              {profile.email}
            </a>
          </div>

          <ul className="flex flex-wrap gap-3">
            <li>
              <CopyEmailButton email={profile.email} copyLabel={c.copy} copiedLabel={c.copied} />
            </li>
            {profile.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-transform duration-300 ease-spring hover:-translate-y-0.5"
                >
                  {social.label}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                  <span className="sr-only">{dict.common.opensInNewTab}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Ảnh tách nền, đáy ảnh chạm đáy thẻ */}
        <div className="relative mx-auto aspect-[1000/897] w-full max-w-md self-end md:mt-10 md:max-w-none">
          <Image
            src="/images/profile/portrait-laptop.webp"
            alt={c.portraitAlt.replace("{name}", t(profile.name, locale))}
            fill
            sizes="(min-width: 768px) 50vw, 28rem"
            // Bộ tối ưu của Next trả JPEG làm mất nền trong suốt; file đã cắt sát và nén sẵn (~48 KB)
            unoptimized
            className="portrait-shadow object-contain object-bottom"
          />
        </div>
      </div>
    </Section>
  );
}
