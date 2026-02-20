import { useContext } from "react"
import { AgentContext } from "../context/AgentContext"

export default function ScoreBar() {
  const { report } = useContext(AgentContext)
  const percent = (report.score.total / report.score.max) * 100

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Score</h2>
      <div style={styles.progressBg}>
        <div style={{ ...styles.progressFill, width: `${percent}%` }} />
      </div>
      <p style={styles.row}>{report.score.total} / {report.score.max}</p>
      <p style={{ ...styles.row, opacity: 0.6, fontSize: 13 }}>
        Base: {report.score.base} | Bonus: +{report.score.bonus} | Penalty: {report.score.penalty}
      </p>
    </div>
  )
}

const styles = {
  card: {
    background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)",
    borderRadius: 16, padding: 30, color: "white",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },
  title: { margin: "0 0 16px", fontSize: 20, fontWeight: 700 },
  progressBg: {
    width: "100%", height: 16,
    background: "rgba(255,255,255,0.1)",
    borderRadius: 999, overflow: "hidden", marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #22c55e, #34d399)",
    borderRadius: 999, transition: "width 1s ease",
  },
  row: { margin: "6px 0", fontSize: 15 },
}