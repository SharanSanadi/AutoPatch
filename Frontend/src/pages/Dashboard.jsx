import { useContext } from "react"
import { AgentContext } from "../context/AgentContext"
import InputSection from "../components/InputSection"
import RunSummary from "../components/RunSummary"
import ScoreBar from "../components/ScoreBar"
import FixesTable from "../components/FixesTable"
import Timeline from "../components/Timeline"
import Footer from "../components/Footer"

export default function Dashboard() {
  const { report } = useContext(AgentContext)

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <InputSection />
        {report && (
          <>
            <RunSummary />
            <ScoreBar />
            <FixesTable />
            <Timeline />
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top left, #1e3a8a, #020617)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px 0px",
  },
  container: {
    width: "100%",
    maxWidth: 700,
    display: "flex",
    flexDirection: "column",
    gap: 24,
    flex: 1,
  },
}