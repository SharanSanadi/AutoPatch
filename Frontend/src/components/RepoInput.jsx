import { useState } from "react";

export default function RepoInput() {
  const [repo, setRepo] = useState("");
  const [team, setTeam] = useState("");
  const [leader, setLeader] = useState("");

  const runAgent = () => {
    const data = {
      repo,
      team,
      leader,
      branch: `${team}_${leader}_AI_Fix`.toUpperCase(),
      failures: 3,
      time: "3m 12s",
      score: {
        base: 100,
        bonus: 10,
        penalty: 2,
      },
      fixes: [
        {
          file: "src/utils.py",
          type: "LINTING",
          line: 15,
          commit: "[AI-AGENT] Remove unused import",
        },
        {
          file: "src/validator.py",
          type: "SYNTAX",
          line: 8,
          commit: "[AI-AGENT] Add missing colon",
        },
        {
          file: "src/main.py",
          type: "LOGIC",
          line: 21,
          commit: "[AI-AGENT] Fix condition logic",
        },
      ],
    };

    localStorage.setItem("runData", JSON.stringify(data));
    window.location.reload();
  };

  return (
    <div className="card">
      <h1>AI DevOps Agent</h1>

      <input placeholder="Repository URL" value={repo} onChange={e => setRepo(e.target.value)} />
      <input placeholder="Team Name" value={team} onChange={e => setTeam(e.target.value)} />
      <input placeholder="Leader Name" value={leader} onChange={e => setLeader(e.target.value)} />

      <button className="run-btn" onClick={runAgent}>Run Agent</button>
    </div>
  );
}
