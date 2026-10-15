import { Bi } from "@/components/language-switch";
import { SiteShell } from "@/components/site-shell";

const contacts = [
  { label: "Email", text: "phatnguyen1962005@gmail.com", href: "mailto:phatnguyen1962005@gmail.com" },
  { label: "GitHub", text: "phatnguyen196-solverboiz", href: "https://github.com/phatnguyen196-solverboiz" },
  { label: "LinkedIn", text: "Nguyen Trong Phat", href: "https://www.linkedin.com/in/tr%E1%BB%8Dng-ph%C3%A1t-nguy%E1%BB%85n-6714412bb/" },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <div className="wrap">
        <header className="page-head">
          <p className="eyebrow"><Bi en="04 / Contact" vi="04 / Liên hệ" /></p>
          <h1 className="page-title"><Bi en="Let's connect." vi="Kết nối nhé." /></h1>
          <p className="page-intro">
            <Bi
              en="For a conversation about work, an idea, or a technical question, the best way to reach me is by email."
              vi="Để trao đổi về công việc, một ý tưởng hoặc câu hỏi kỹ thuật, cách tốt nhất để liên hệ với tôi là qua email."
            />
          </p>
        </header>
        <div className="contact-main">
          <p className="contact-lead">
            <Bi en="Good conversations often start with a simple note." vi="Một cuộc trò chuyện hay thường bắt đầu bằng một lời nhắn." />
          </p>
          <div className="contact-list">
            {contacts.map((contact) => (
              <a
                className="contact-row"
                href={contact.href}
                key={contact.label}
                target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={contact.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              >
                <span className="label">{contact.label}</span>
                <span className="value">{contact.text}</span>
                <span className="arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
