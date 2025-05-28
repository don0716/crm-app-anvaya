import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import useLeads from "../../contexts/LeadContext";
import { useFetch } from "../../hooks/useFetch";

const ReportsAndVisualization = () => {
  const backendUrl = `http://localhost:3005`;
  const {
    data: leadsInPipeline,
    loading: leadsPipelineLoad,
    error: leadsPipelineError,
  } = useFetch(`${backendUrl}/report/pipeline`);
  const {
    data: leadsClosed,
    loading: leadsClosedLoading,
    error: leadsClosedError,
  } = useFetch(`${backendUrl}/report/last-week`);
  const {
    data: closedByAgentData,
    loading: closedByAgentLoading,
    error: closedByAgentError,
  } = useFetch(`${backendUrl}/report/closed-by-agent`);

  const leadsStatusPieChart = useRef(null);
  const leadsStatusPieChartInstance = useRef(null);
  const pipelineAndClosedPieChart = useRef(null);
  const pipelineAndClosedPieChartInstance = useRef(null);

  const barChartRef = useRef(null);
  const barChartInstance = useRef(null);

  const { filteredLeads } = useLeads();

  const statusCounts = filteredLeads.reduce(
    (acc, lead) => {
      const status = lead.status;
      if (status === "New") acc.new++;
      else if (status === "Contacted") acc.contacted++;
      else if (status === "Qualified") acc.qualified++;
      else if (status === "Closed") acc.closed++;
      return acc;
    },
    { new: 0, contacted: 0, qualified: 0, closed: 0 }
  );

  useEffect(() => {
    if (
      !filteredLeads ||
      filteredLeads.length === 0 ||
      !closedByAgentData ||
      !leadsInPipeline ||
      !leadsClosed
    )
      return;

    // Prepare data for charts
    const labels = closedByAgentData.map((agent) => agent.salesAgentName);
    const dataCounts = closedByAgentData.map((agent) => agent.closedLeadsCount);

    const pieDataForLeadStatus = {
      labels: ["New", "Contacted", "Qualified", "Closed"],
      datasets: [
        {
          label: "Lead Status",
          data: [
            statusCounts.new,
            statusCounts.contacted,
            statusCounts.qualified,
            statusCounts.closed,
          ],
          backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB", "#9966FF"],
          hoverOffset: 30,
        },
      ],
    };

    const pieDataForLeadsClosedAndInPipeline = {
      labels: ["Leads In Pipeline", "Leads Closed in the Last Week"],
      datasets: [
        {
          label: "Leads Distribution",
          data: [leadsInPipeline.totalLeadsInPipeline, leadsClosed.length],
          backgroundColor: ["#00C49F", "#FF8042"],
          hoverOffset: 30,
        },
      ],
    };

    // Destroy previous charts if exist
    if (barChartInstance.current) barChartInstance.current.destroy();
    if (leadsStatusPieChartInstance.current)
      leadsStatusPieChartInstance.current.destroy();
    if (pipelineAndClosedPieChartInstance.current)
      pipelineAndClosedPieChartInstance.current.destroy();

    // Create bar chart - Leads Closed by Agent
    barChartInstance.current = new Chart(barChartRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Leads Closed by Agent",
            data: dataCounts,
            backgroundColor: "#36a2eb",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
            title: {
              display: true,
              text: "Number of Leads Closed",
            },
          },
          x: {
            title: {
              display: true,
              text: "Sales Agents",
            },
          },
        },
      },
    });

    // Pie Chart - Lead Status Distribution
    leadsStatusPieChartInstance.current = new Chart(leadsStatusPieChart.current, {
      type: "pie",
      data: pieDataForLeadStatus,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });

    // Pie Chart - Leads in Pipeline vs Leads Closed
    pipelineAndClosedPieChartInstance.current = new Chart(
      pipelineAndClosedPieChart.current,
      {
        type: "pie",
        data: pieDataForLeadsClosedAndInPipeline,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              enabled: true,
            },
          },
        },
      }
    );

    // Cleanup on unmount
    return () => {
      barChartInstance.current?.destroy();
      leadsStatusPieChartInstance.current?.destroy();
      pipelineAndClosedPieChartInstance.current?.destroy();
    };
  }, [
    filteredLeads,
    closedByAgentData,
    leadsInPipeline?.totalLeadsInPipeline,
    leadsClosed,
  ]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Reports & Visualizations</h2>

      {/* Bar Chart */}
      <section className="mb-5">
        <h4 className="text-center mb-3 text-primary">Leads Closed By Agents</h4>
        <div
          className="shadow-sm p-3 bg-white rounded"
          style={{ height: "400px" }}
        >
          <canvas ref={barChartRef} />
        </div>
      </section>

      {/* Pie Chart - Lead Status */}
      <section className="mb-5">
        <h4 className="text-center mb-3 text-success">Lead Status Distribution</h4>
        <div
          className="shadow-sm p-3 bg-white rounded"
          style={{ height: "400px" }}
        >
          <canvas ref={leadsStatusPieChart} />
        </div>
      </section>

      {/* Pie Chart - Pipeline vs Closed */}
      <section>
        <h4 className="text-center mb-3 text-warning">
          Leads In Pipeline vs Leads Closed (Last Week)
        </h4>
        <div
          className="shadow-sm p-3 bg-white rounded"
          style={{ height: "400px" }}
        >
          <canvas ref={pipelineAndClosedPieChart} />
        </div>
      </section>
    </div>
  );
};

export default ReportsAndVisualization;
