import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please fill in all fields")
      return
    }
    setError("")
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem("auth", "true")
      setLoading(false)
      navigate("/dashboard")
    }, 1500)
  }

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.5; }
          50% { transform: translateY(-25px); opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .input-wrapper:focus-within {
          box-shadow: 0 0 0 2px #6366f1, 0 0 20px rgba(99,102,241,0.3) !important;
          transform: scale(1.01);
        }
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(99,102,241,0.5);
        }
        .login-btn:active { transform: translateY(0); }
      `}</style>

      {/* Blobs */}
      <div style={{ ...styles.blob, top: "5%", left: "5%", background: "rgba(99,102,241,0.35)", animation: "float 12s ease-in-out infinite" }} />
      <div style={{ ...styles.blob, bottom: "10%", right: "5%", background: "rgba(52,211,153,0.3)", animation: "float 15s 2s ease-in-out infinite" }} />
      <div style={{ ...styles.blob, top: "50%", right: "20%", background: "rgba(244,114,182,0.25)", animation: "float 10s 4s ease-in-out infinite" }} />
      <div style={{ ...styles.blob, bottom: "30%", left: "15%", background: "rgba(251,191,36,0.2)", animation: "float 13s 1s ease-in-out infinite" }} />

      {/* Card */}
      <div style={styles.card}>

        {/* Top shimmer */}
        <div style={styles.shimmer} />

        {/* Icon */}
        <div style={styles.iconWrapper}>
          <span style={{ fontSize: 32 }}>🤖</span>
        </div>

        {/* Title */}
        <h1 style={styles.title}>
          Welcome to{" "}
          <span style={styles.gradientText}>AI DevOps</span>
        </h1>
        <p style={styles.subtitle}>Sign in to access your dashboard</p>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>
            ⚠️ {error}
          </div>
        )}

        {/* Username */}
        <label style={styles.label}>Username</label>
        <div className="input-wrapper" style={styles.inputWrapper}>
          <span style={styles.icon}>👤</span>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Password */}
        <label style={styles.label}>Password</label>
        <div className="input-wrapper" style={styles.inputWrapper}>
          <span style={styles.icon}>🔒</span>
          <input
            style={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <span
            style={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Login Button */}
        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.8 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span style={styles.spinner} />
              Signing in...
            </span>
          ) : (
            "🚀 Sign In"
          )}
        </button>

        {/* Footer */}
        <p style={styles.footer}>
          Autonomous CI/CD Debugging • Powered by AI
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
    borderRadius: 20,
    padding: "40px 36px",
    width: "100%",
    maxWidth: 420,
    color: "white",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
    zIndex: 1,
    animation: "fadeUp 0.6s ease",
    overflow: "hidden",
  },
  shimmer: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 2,
    background: "linear-gradient(90deg, #6366f1, #34d399, #f472b6)",
  },
  iconWrapper: {
    width: 64, height: 64,
    borderRadius: "50%",
    background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(52,211,153,0.2))",
    border: "1px solid rgba(99,102,241,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    margin: "0 0 8px",
    fontSize: 26, fontWeight: 700,
    color: "white", letterSpacing: "-0.5px",
  },
  gradientText: {
    background: "linear-gradient(90deg, #6366f1, #34d399)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    margin: "0 0 20px",
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
  },
  divider: {
    height: 1,
    background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)",
    marginBottom: 24,
  },
  errorBox: {
    background: "rgba(248,113,113,0.15)",
    border: "1px solid rgba(248,113,113,0.3)",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "#f87171",
    marginBottom: 16,
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: "12px 16px",
    marginBottom: 18,
    transition: "all 0.2s ease",
    boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
  },
  icon: { fontSize: 18 },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    fontSize: 14,
  },
  eyeIcon: {
    cursor: "pointer",
    fontSize: 16,
    userSelect: "none",
  },
  button: {
    width: "100%",
    padding: "14px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(90deg, #6366f1, #34d399)",
    color: "white",
    fontWeight: 700,
    fontSize: 16,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    marginTop: 4,
  },
  spinner: {
    width: 16, height: 16,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.8s linear infinite",
  },
  footer: {
    marginTop: 20,
    fontSize: 11,
    color: "rgba(255,255,255,0.2)",
    textAlign: "center",
    letterSpacing: "0.5px",
  },
}