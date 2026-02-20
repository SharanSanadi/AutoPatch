import { useState, useContext } from "react"
import { AgentContext } from "../context/AgentContext"

export default function InputSection() {
  const { running, runAgent } = useContext(AgentContext)

  const [repoUrl, setRepoUrl] = useState("")
  const [team, setTeam] = useState("")
  const [leader, setLeader] = useState("")

  const handleRun = () => {
    console.log("RUN BUTTON CLICKED")

    // 🚀 force values so backend always receives valid data
    const finalRepo =
      repoUrl.trim() || "https://github.com/vercel/next.js"
    const finalTeam = team.trim() || "HackathonTeam"
    const finalLeader = leader.trim() || "Leader"

    console.log("Sending:", finalRepo, finalTeam, finalLeader)

    runAgent(finalRepo, finalTeam, finalLeader)
  }

  return (
    <div style={styles.card}>
      <h1 style={styles.title}>AI DevOps Agent</h1>

      <input
        style={styles.input}
        type="text"
        placeholder="https://github.com/username/repo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        disabled={running}
      />

      <input
        style={styles.input}
        type="text"
        placeholder="Team Name"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        disabled={running}
      />

      <input
        style={styles.input}
        type="text"
        placeholder="Leader Name"
        value={leader}
        onChange={(e) => setLeader(e.target.value)}
        disabled={running}
      />

      <button
        style={{
          ...styles.button,
          opacity: running ? 0.7 : 1,
          cursor: running ? "not-allowed" : "pointer",
        }}
        onClick={handleRun}
        disabled={running}
      >
        {running ? "Agent Running..." : "Run Agent"}
      </button>
    </div>
  )
}

const styles = {
  card: {
    background: "rgba(255,255,255,0.07)",
    backdropFilter: "blur(20px)",
    borderRadius: 16,
    padding: 30,
    color: "white",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
  },
  title: {
    margin: "0 0 20px",
    fontSize: 26,
    fontWeight: 700,
    color: "white",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    border: "none",
    outline: "none",
    fontSize: 14,
    background: "rgba(255,255,255,0.9)",
    color: "#111",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(90deg, #22c55e, #3b82f6)",
    color: "white",
    fontSize: 16,
    fontWeight: 700,
  },
}