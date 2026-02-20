import { useContext } from "react"
import { AgentContext } from "../context/AgentContext"

export default function RunSummary() {
  const { report } = useContext(AgentContext)
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Run Summary</h2>
      <p style={styles.row}><strong>Repository:</strong> {report.repoUrl}</p>
      <p style={styles.row}><strong>Team:</strong> {report.team}</p>
      <p style={styles.row}><strong>Leader:</strong> {report.leader}</p>
      <p style={styles.row}><strong>Branch:</strong> {report.branch}</p>
      <p style={styles.row}><strong>Failures:</strong> {report.failures}</p>
      <p style={styles.row}><strong>Time Taken:</strong> {report.timeTaken}</p>
      <p style={{ ...styles.row, color: report.ciPassed ? "#34d399" : "#f87171", fontWeight: 700 }}>
        CI/CD STATUS: {report.ciPassed ? "PASSED" : "FAILED"}
      </p>
      <p style={styles.row}><strong>Total Time:</strong> {report.timeTaken}</p>
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
  row: { margin: "6px 0", fontSize: 15 },
}