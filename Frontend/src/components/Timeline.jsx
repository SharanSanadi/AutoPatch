import { useContext } from "react"
import { AgentContext } from "../context/AgentContext"

export default function Timeline() {
  const { report } = useContext(AgentContext)
  const allPassed = report.timeline.every((t) => t.status === "PASSED")

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Pipeline Iterations</h2>

      <div style={styles.timelineWrapper}>
        {report.timeline.map((t, i) => {
          const passed = t.status === "PASSED"
          const percent = Math.round(((i + 1) / report.timeline.length) * 100)

          return (
            <div key={i} style={styles.row}>
              {/* Circle + line */}
              <div style={styles.leftCol}>
                <div style={{
                  ...styles.circle,
                  border: `2px solid ${passed ? "#34d399" : "#f87171"}`,
                  color: passed ? "#34d399" : "#f87171",
                }}>
                  {passed ? "✓" : "!"}
                </div>
                {i < report.timeline.length - 1 && <div style={styles.line} />}
              </div>

              {/* Content */}
              <div style={styles.content}>
                <div style={styles.iterationHeader}>
                  <span style={styles.iterationLabel}>
                    Iteration {i + 1} of {report.timeline.length}
                  </span>
                  <span style={{
                    ...styles.statusBadge,
                    background: passed ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)",
                    color: passed ? "#34d399" : "#f87171",
                  }}>
                    {passed ? "Passed" : "Failed"}
                  </span>
                  <span style={styles.percent}>{percent}%</span>
                </div>
                <div style={styles.dateText}>
                  2/19/2024 at {t.time} PM
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{
        ...styles.footer,
        background: allPassed ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)",
        border: `1px solid ${allPassed ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)"}`,
      }}>
        <span style={{ color: allPassed ? "#34d399" : "#f87171", fontWeight: 700 }}>
          {allPassed ? "✓ Analysis Complete" : "✗ Analysis Incomplete"}
        </span>
        <span style={{ color: "rgba(255,255,255,0.6)", marginLeft: 8 }}>
          — {allPassed ? "All iterations completed successfully" : "Some iterations failed"}
        </span>
      </div>
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
  title: { margin: "0 0 20px", fontSize: 20, fontWeight: 700 },
  timelineWrapper: { display: "flex", flexDirection: "column" },
  row: { display: "flex", gap: 16, marginBottom: 0 },
  leftCol: {
    display: "flex", flexDirection: "column",
    alignItems: "center", minWidth: 36,
  },
  circle: {
    width: 36, height: 36, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: 14,
    background: "rgba(255,255,255,0.05)",
    flexShrink: 0,
  },
  line: {
    width: 2, flex: 1, minHeight: 20,
    background: "rgba(255,255,255,0.1)",
    margin: "4px 0",
  },
  content: {
    flex: 1,
    background: "rgba(255,255,255,0.05)",
    borderRadius: 10, padding: "12px 16px",
    marginBottom: 12,
  },
  iterationHeader: {
    display: "flex", alignItems: "center", gap: 10, marginBottom: 6,
  },
  iterationLabel: { fontWeight: 600, fontSize: 14 },
  statusBadge: {
    padding: "2px 10px", borderRadius: 20,
    fontSize: 12, fontWeight: 700,
  },
  percent: {
    marginLeft: "auto", fontSize: 13,
    color: "rgba(255,255,255,0.5)",
  },
  dateText: { fontSize: 12, color: "rgba(255,255,255,0.4)" },
  footer: {
    marginTop: 8, padding: "12px 16px",
    borderRadius: 10, fontSize: 14,
  },
}