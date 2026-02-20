import { useNavigate } from "react-router-dom"

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.5; }
          50% { transform: translateY(-25px); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.4); }
          50% { box-shadow: 0 0 50px rgba(99,102,241,0.8), 0 0 80px rgba(52,211,153,0.3); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .get-started-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(99,102,241,0.6);
        }
        .get-started-btn:active { transform: translateY(0); }
        .login-link:hover { color: #34d399; }
      `}</style>

      {/* Blobs */}
      <div style={{ ...styles.blob, top: "5%", left: "5%", background: "rgba(99,102,241,0.35)", animation: "float 12s ease-in-out infinite" }} />
      <div style={{ ...styles.blob, bottom: "10%", right: "5%", background: "rgba(52,211,153,0.3)", animation: "float 15s 2s ease-in-out infinite" }} />
      <div style={{ ...styles.blob, top: "50%", right: "20%", background: "rgba(244,114,182,0.25)", animation: "float 10s 4s ease-in-out infinite" }} />
      <div style={{ ...styles.blob, bottom: "30%", left: "15%", background: "rgba(251,191,36,0.2)", animation: "float 13s 1s ease-in-out infinite" }} />

      <div style={styles.card}>
        {/* Top shimmer */}
        <div style={styles.shimmer} />

        {/* Logo */}
        <div style={styles.logoWrapper}>
          <div style={styles.rotatingRing} />
          <div style={styles.logoInner}>
            <span style={{ fontSize: 40 }}>🤖</span>
          </div>
        </div>

        {/* Team Badge */}
        <div style={styles.teamBadge}>
          <span style={styles.teamDot} />
          <span style={styles.teamText}>TEAM AUTOPATCH</span>
        </div>

        {/* Title */}
        <h1 style={styles.title}>
          AI{" "}
          <span style={styles.gradientText}>DevOps</span>
          <br />
          Agent
        </h1>

        {/* Subtitle */}
        <p style={styles.subtitle}>
          Autonomous CI/CD debugging powered by AI.<br />
          Built by Team AutoPatch to fix, analyze, and deploy — faster.
        </p>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Feature pills */}
        <div style={styles.pillsRow}>
          {["🔍 Auto Debug", "⚡ CI/CD Pipeline", "📊 Live Reports", "🛡️ Smart Fixes"].map((f, i) => (
            <span key={i} style={styles.pill}>{f}</span>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className="get-started-btn"
          onClick={() => navigate("/login")}
          style={styles.button}
        >
          🚀 Get Started
        </button>

        {/* Login link */}
        <p style={styles.loginText}>
          Already have an account?{" "}
          <span
            className="login-link"
            style={styles.loginLink}
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>

        {/* Footer */}
        <p style={styles.footer}>
          Autonomous CI/CD Debugging • Powered by AI • Team AutoPatch
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top left, #1e3a8a, #020617)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  blob: {
    position: "fixed",
    width: 320, height: 320,
    borderRadius: "50%",
    filter: "blur(90px)",
    pointerEvents: "none", zIndex: 0,
  },
  card: {
    position: "relative",
    background: "rgba(255,255,255,0.07)",
    backdropFilter: "blur(24px)",
    borderRadius: 24,
    padding: "48px 40px",
    width: "100%",
    maxWidth: 460,
    color: "white",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
    zIndex: 1,
    animation: "fadeUp 0.6s ease",
    overflow: "hidden",
    textAlign: "center",
  },
  shimmer: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 2,
    background: "linear-gradient(90deg, #6366f1, #34d399, #f472b6)",
  },
  logoWrapper: {
    position: "relative",
    width: 100, height: 100,
    margin: "0 auto 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rotatingRing: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    border: "2px solid transparent",
    borderTopColor: "#6366f1",
    borderRightColor: "#34d399",
    animation: "rotateSlow 3s linear infinite",
  },
  logoInner: {
    width: 80, height: 80,
    borderRadius: "50%",
    background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(52,211,153,0.2))",
    border: "1px solid rgba(99,102,241,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "pulse 3s ease-in-out infinite",
  },
  teamBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(99,102,241,0.15)",
    border: "1px solid rgba(99,102,241,0.35)",
    borderRadius: 999,
    padding: "4px 14px",
    marginBottom: 20,
  },
  teamDot: {
    width: 7, height: 7,
    borderRadius: "50%",
    background: "#6366f1",
    boxShadow: "0 0 6px #6366f1",
    display: "inline-block",
  },
  teamText: {
    fontSize: 11,
    color: "#a5b4fc",
    fontWeight: 700,
    letterSpacing: 2,
  },
  title: {
    margin: "0 0 12px",
    fontSize: 42,
    fontWeight: 800,
    color: "white",
    letterSpacing: "-1px",
    lineHeight: 1.1,
  },
  gradientText: {
    background: "linear-gradient(90deg, #6366f1, #34d399)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    margin: "0 0 24px",
    fontSize: 14,
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.7,
  },
  divider: {
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
    marginBottom: 24,
  },
  pillsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginBottom: 28,
  },
  pill: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 999,
    padding: "6px 14px",
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    fontWeight: 500,
  },
  button: {
    width: "100%",
    padding: "15px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(90deg, #6366f1, #34d399)",
    color: "white",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    marginBottom: 16,
  },
  loginText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.35)",
    marginBottom: 20,
  },
  loginLink: {
    color: "#6366f1",
    cursor: "pointer",
    fontWeight: 600,
    transition: "color 0.2s ease",
  },
  footer: {
    fontSize: 11,
    color: "rgba(255,255,255,0.2)",
    letterSpacing: "0.5px",
  },
}