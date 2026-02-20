export default function PipelineTimeline() {
  return (
    <div className="card">
      <h3>CI/CD Timeline</h3>
      <ul>
        <li>Run 1 – ❌ Failed</li>
        <li>Run 2 – ❌ Failed</li>
        <li>Run 3 – ✅ Passed</li>
      </ul>
      <p>Iterations: 3 / 5</p>
    </div>
  );
}
