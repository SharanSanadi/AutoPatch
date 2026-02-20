export default function Footer() {
  const columns = [
    {
      title: "PLATFORM",
      links: ["AI DevOps Agent", "CI/CD Automation", "Pipeline Analytics", "Integrations"],
    },
    {
      title: "OUR RESOURCES",
      links: ["Resource Library", "Blog", "Podcasts", "Case Studies"],
    },
    {
      title: "KNOWLEDGE & DOCS",
      links: ["AutoPatch Labs", "Learn", "User Docs", "Support", "Updates", "Trust Center"],
    },
    {
      title: "COMPANY & COMMUNITY",
      links: ["About AutoPatch", "Contact Us", "Book A Demo", "Careers", "Events & Webinars", "Ambassadors"],
    },
    {
      title: "WHY AUTOPATCH",
      links: ["AutoPatch vs GitHub Actions", "AutoPatch vs Jenkins", "AutoPatch vs CircleCI", "AutoPatch vs ArgoCD"],
    },
  ]

  const socials = [
    { icon: "fa-brands fa-x-twitter", label: "Twitter" },
    { icon: "fa-brands fa-youtube", label: "YouTube" },
    { icon: "fa-brands fa-linkedin", label: "LinkedIn" },
    { icon: "fa-brands fa-github", label: "GitHub" },
    { icon: "fa-brands fa-discord", label: "Discord" },
  ]

  return (
    <footer style={styles.footer}>
      <style>{`
        .footer-link:hover { color: white !important; }
        .social-icon:hover {
          border-color: #6366f1 !important;
          color: #6366f1 !important;
          transform: translateY(-3px);
        }
        .subscribe-btn:hover {
          background: white !important;
          color: #050510 !important;
        }
      `}</style>

      {/* Top links grid */}
      <div style={styles.grid}>
        {columns.map((col, i) => (
          <div key={i}>
            <p style={styles.colTitle}>{col.title}</p>
            {col.links.map((link, j) => (
              <p key={j} className="footer-link" style={styles.link}>{link}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Bottom row */}
      <div style={styles.bottomRow}>

        {/* Logo + socials */}
        <div style={styles.logoCol}>
          <div style={styles.logoWrapper}>
            <div style={styles.logoIconBox}>
              <div style={styles.logoInnerRing} />
              <i className="fa-solid fa-robot" style={{ fontSize: 20, color: "#6366f1", position: "relative", zIndex: 1 }}></i>
            </div>
            <div style={styles.logoTextCol}>
              <span style={styles.logoText}>AutoPatch</span>
              <span style={styles.logoSub}>AI DevOps Agent</span>
            </div>
          </div>
          <p style={styles.logoTagline}>Autonomous CI/CD Debugging<br />Powered by AI</p>
          <div style={styles.socialsRow}>
            {socials.map((s, i) => (
              <span key={i} className="social-icon" style={styles.socialIcon} title={s.label}>
                <i className={s.icon}></i>
              </span>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div style={styles.newsletterCol}>
          <div style={styles.newsletterBadge}>
            <i className="fa-solid fa-envelope" style={{ color: "#6366f1", marginRight: 6 }}></i>
            NEWSLETTER
          </div>
          <h3 style={styles.newsletterTitle}>Patched & Dispatched</h3>
          <p style={styles.newsletterSubtitle}>
            Your monthly roundup of AutoPatch content — the latest insights
            patched in, dispatched straight to your inbox. No fluff. Just the good stuff.
          </p>
        </div>

        {/* Subscribe */}
        <div style={styles.subscribeCol}>
          <button className="subscribe-btn" style={styles.subscribeBtn}>
            <i className="fa-solid fa-paper-plane" style={{ marginRight: 8 }}></i>
            Subscribe to our newsletter
          </button>
          <p style={styles.subscribeNote}>
            <i className="fa-solid fa-shield-halved" style={{ marginRight: 6, color: "#34d399" }}></i>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div style={styles.statsRow}>
        {[
          { icon: "fa-solid fa-code-branch", value: "10K+", label: "Repos Analyzed" },
          { icon: "fa-solid fa-bug-slash", value: "50K+", label: "Bugs Fixed" },
          { icon: "fa-solid fa-bolt", value: "99.9%", label: "Uptime" },
          { icon: "fa-solid fa-users", value: "500+", label: "Teams Using AutoPatch" },
        ].map((stat, i) => (
          <div key={i} style={styles.statItem}>
            <i className={stat.icon} style={{ color: "#6366f1", fontSize: 18, marginBottom: 6 }}></i>
            <span style={styles.statValue}>{stat.value}</span>
            <span style={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div style={styles.copyright}>
        <p>
          <i className="fa-solid fa-robot" style={{ marginRight: 6, color: "#6366f1" }}></i>
          © 2026 Team AutoPatch. All rights reserved. • AI DevOps Agent • Autonomous CI/CD Debugging
        </p>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: "#050510",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    padding: "60px 60px 30px",
    color: "white",
    marginTop: 40,
    width: "100%",
    boxSizing: "border-box",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 32,
    marginBottom: 48,
  },
  colTitle: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 16,
    margin: "0 0 16px",
  },
  link: {
    fontSize: 14,
    color: "rgba(255,255,255,0.55)",
    margin: "0 0 10px",
    cursor: "pointer",
    transition: "color 0.2s ease",
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.08)",
    marginBottom: 40,
  },
  bottomRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 40,
    flexWrap: "wrap",
    marginBottom: 40,
  },
  logoCol: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    minWidth: 180,
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logoIconBox: {
    width: 48, height: 48,
    borderRadius: 12,
    background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(52,211,153,0.2))",
    border: "1px solid rgba(99,102,241,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  logoInnerRing: {
    position: "absolute",
    inset: 0,
    borderRadius: 12,
    background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(52,211,153,0.1))",
  },
  logoTextCol: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 800,
    color: "white",
    letterSpacing: "-0.5px",
    lineHeight: 1,
  },
  logoSub: {
    fontSize: 10,
    color: "#6366f1",
    fontWeight: 600,
    letterSpacing: 1,
  },
  logoTagline: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    lineHeight: 1.6,
    margin: 0,
  },
  socialsRow: {
    display: "flex",
    gap: 10,
    marginTop: 4,
  },
  socialIcon: {
    width: 36, height: 36,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.12)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    cursor: "pointer",
    color: "rgba(255,255,255,0.5)",
    background: "rgba(255,255,255,0.04)",
    transition: "all 0.2s ease",
  },
  newsletterCol: {
    flex: 1,
    maxWidth: 400,
  },
  newsletterBadge: {
    display: "inline-flex",
    alignItems: "center",
    background: "rgba(99,102,241,0.15)",
    border: "1px solid rgba(99,102,241,0.3)",
    borderRadius: 999,
    padding: "3px 12px",
    fontSize: 11,
    fontWeight: 700,
    color: "#a5b4fc",
    letterSpacing: 1,
    marginBottom: 12,
  },
  newsletterTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "white",
    margin: "0 0 10px",
  },
  newsletterSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.7,
    margin: 0,
  },
  subscribeCol: {
    minWidth: 220,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  subscribeBtn: {
    padding: "14px 20px",
    borderRadius: 10,
    border: "2px solid white",
    background: "transparent",
    color: "white",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  subscribeNote: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    margin: 0,
    display: "flex",
    alignItems: "center",
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-around",
    padding: "24px 0",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 20,
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 800,
    color: "white",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
  },
  copyright: {
    textAlign: "center",
    fontSize: 12,
    color: "rgba(255,255,255,0.2)",
    letterSpacing: "0.5px",
  },
}