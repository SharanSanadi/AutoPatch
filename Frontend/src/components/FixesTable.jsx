import { useContext } from "react"
import { AgentContext } from "../context/AgentContext"

const badgeColors = {
  LINTING: "#7c3aed",
  SYNTAX: "#b45309",
  LOGIC: "#15803d",
  TYPE_ERROR: "#1d4ed8",
  INDENTATION: "#b45309",
  IMPORT: "#15803d",
}

export default function FixesTable() {
  const { report } = useContext(AgentContext)

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Fixes Applied</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            {["File", "Bug Type", "Line", "Commit Message", "Status"].map((h) => (
              <th key={h} style={styles.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {report.fixes.map((fix, i) => (
            <tr key={i} style={styles.tr}>
              <td style={styles.td}>{fix.file}</td>
              <td style={styles.td}>
                <span style={{
                  ...styles.badge,
                  background: badgeColors[fix.bugType] || "#374151",
                }}>
                  {fix.bugType}
                </span>
              </td>
              <td style={styles.td}>{fix.line}</td>
              <td style={styles.td}>{fix.commit}</td>
              <td style={styles.td}>
                {fix.status === "Fixed" ? (
                  <span style={{ color: "#34d399", fontWeight: 700 }}>✓ Fixed</span>
                ) : (
                  <span style={{ color: "#f87171", fontWeight: 700 }}>✗ Failed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const styles = {
  card: {
    background: "rgba(255,255,255,0.07)",
    backdropFilter: "blur(20px)",
    borderRadius: 16, padding: 30, color: "white",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },
  title: { margin: "0 0 16px", fontSize: 20, fontWeight: 700 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left", padding: "10px 14px",
    color: "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: 13,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  tr: { borderBottom: "1px solid rgba(255,255,255,0.05)" },
  td: { padding: "14px", fontSize: 14, color: "rgba(255,255,255,0.85)" },
  badge: {
    padding: "3px 10px", borderRadius: 6,
    fontSize: 12, fontWeight: 700, color: "white",
    display: "inline-block",
  },
}