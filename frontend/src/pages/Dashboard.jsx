import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getIncidents } from "../api/incidents";
import { getWorkers } from "../api/workers";
import { getEquipment } from "../api/equipment";
import { Container, Row, Col, Card } from "react-bootstrap";
import Chatbot from "../components/Chatbot";


ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [workers, setWorkers] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const w = await getWorkers();
      const e = await getEquipment();
      const i = await getIncidents();
      setWorkers(w.data);
      setEquipment(e.data);
      setIncidents(i.data);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  const severityCounts = incidents.reduce(
    (acc, i) => {
      if (i.severity === "high") acc.high++;
      else if (i.severity === "medium") acc.medium++;
      else acc.low++;
      return acc;
    },
    { high: 0, medium: 0, low: 0 }
  );

  const chartData = {
    labels: ["High Risk", "Medium Risk", "Low Risk"],
    datasets: [
      {
        data: [severityCounts.high, severityCounts.medium, severityCounts.low],
        backgroundColor: ["#dc3545", "#ffc107", "#198754"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="page-container">
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card className="text-center p-3 shadow">
            <h6>Total Workers</h6>
            <h2>{workers.length}</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3 shadow">
            <h6>Total Equipment</h6>
            <h2>{equipment.length}</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3 shadow">
            <h6>Incidents Logged</h6>
            <h2>{incidents.length}</h2>
          </Card>
        </Col>
      </Row>

      {/* TOP ROW — PIE + RECENT INCIDENTS */}
<Row className="mt-5">
  <Col md={6}>
    <Card className="p-4 shadow text-center">
      <h5>Incident Severity Overview</h5>
      <Pie data={chartData} />
    </Card>
  </Col>

  <Col md={6}>
    <Card className="p-3 shadow mb-4">
      <h5>Recent Incidents</h5>
      <ul className="mt-2 mb-0">
        {incidents.slice(0, 5).map((i) => (
          <li key={i._id}>
            [{i.severity}] {i.description}{" "}
            {i.createdAt && (
              <small className="text-muted">
                – {new Date(i.createdAt).toLocaleString()}
              </small>
            )}
          </li>
        ))}
      </ul>
    </Card>
  </Col>
</Row>

{/* SECOND ROW — AI ASSISTANT BELOW RECENT INCIDENTS */}
<Row>
  <Col md={{ span: 6, offset: 6 }}>
    <Chatbot />
  </Col>
</Row>




    </Container>
     </div>
  );
}


