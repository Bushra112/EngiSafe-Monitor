import { useEffect, useState, useMemo } from "react";
import {
  getIncidents,
  createIncident,
  deleteIncident,
  updateIncident,
} from "../api/incidents";
import { getWorkers } from "../api/workers";
import { getEquipment } from "../api/equipment";
import {
  Table,
  Button,
  Form,
  Container,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");
  const [workerId, setWorkerId] = useState("");
  const [equipmentId, setEquipmentId] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [editing, setEditing] = useState(null); // incident being edited
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [iRes, wRes, eRes] = await Promise.all([
        getIncidents(),
        getWorkers(),
        getEquipment(),
      ]);
      setIncidents(iRes.data);
      setWorkers(wRes.data);
      setEquipment(eRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    }
  };

  const handleAddIncident = async () => {
    if (!description.trim()) {
      toast.warning("Description is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("severity", severity);
      if (workerId) formData.append("workerId", workerId);
      if (equipmentId) formData.append("equipmentId", equipmentId);
      if (imageFile) formData.append("image", imageFile);

      await createIncident(formData);
      toast.success("Incident added");
      setDescription("");
      setSeverity("low");
      setWorkerId("");
      setEquipmentId("");
      setImageFile(null);
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add incident");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this incident?")) return;
    try {
      await deleteIncident(id);
      toast.success("Incident deleted");
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete incident");
    }
  };

  const openEditModal = (incident) => {
    setEditing(incident);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await updateIncident(editing._id, {
        description: editing.description,
        severity: editing.severity,
        workerId: editing.workerId,
        equipmentId: editing.equipmentId,
      });
      toast.success("Incident updated");
      setShowModal(false);
      setEditing(null);
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update incident");
    }
  };

  const filteredIncidents = useMemo(
    () =>
      incidents.filter((i) =>
        (i.description || "").toLowerCase().includes(search.toLowerCase())
      ),
    [incidents, search]
  );

  const totalPages = Math.ceil(filteredIncidents.length / pageSize) || 1;
  const pageData = filteredIncidents.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const exportCSV = () => {
    const header = "Description,Severity,Worker,Equipment,Date\n";
    const rows = incidents
      .map((i) => {
        const worker =
          workers.find((w) => w._id === i.workerId)?.name || "";
        const equip =
          equipment.find((e) => e._id === i.equipmentId)?.name || "";
        const date = i.createdAt ? new Date(i.createdAt).toLocaleString() : "";
        return `"${i.description || ""}","${i.severity || ""}","${worker}","${equip}","${date}"`;
      })
      .join("\n");

    const blob = new Blob([header + rows], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, "incidents.csv");
  };

  return (
    <Container className="page-container">
      <Row className="mb-3">
        <Col>
          <h2>Incidents</h2>
        </Col>
        <Col className="text-end">
          <Button variant="outline-secondary" onClick={exportCSV}>
            Export CSV
          </Button>
        </Col>
      </Row>

      {/* Add form */}
      <Form className="d-flex flex-wrap gap-2 mt-3">
        <Form.Control
          className="flex-grow-1"
          placeholder="Describe incident..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Form.Select
          style={{ maxWidth: 160 }}
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="low">Low Severity</option>
          <option value="medium">Medium Severity</option>
          <option value="high">High Severity</option>
        </Form.Select>

        <Form.Select
          style={{ maxWidth: 180 }}
          value={workerId}
          onChange={(e) => setWorkerId(e.target.value)}
        >
          <option value="">Assign Worker</option>
          {workers.map((w) => (
            <option key={w._id} value={w._id}>
              {w.name}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          style={{ maxWidth: 200 }}
          value={equipmentId}
          onChange={(e) => setEquipmentId(e.target.value)}
        >
          <option value="">Related Equipment</option>
          {equipment.map((e) => (
            <option key={e._id} value={e._id}>
              {e.name}
            </option>
          ))}
        </Form.Select>

        <Form.Control
          type="file"
          style={{ maxWidth: 220 }}
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <Button onClick={handleAddIncident}>Add Incident</Button>
      </Form>

      {/* Search bar */}
      <Form.Control
        className="mt-4"
        placeholder="Search incidents by description..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* Table */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Severity</th>
            <th>Worker</th>
            <th>Equipment</th>
            <th>Date & Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((i, index) => {
            const worker = workers.find((w) => w._id === i.workerId);
            const equip = equipment.find((e) => e._id === i.equipmentId);
            const date = i.createdAt
              ? new Date(i.createdAt).toLocaleString()
              : "";

            return (
              <tr key={i._id}>
                <td>{(page - 1) * pageSize + index + 1}</td>
                <td>{i.description}</td>
                <td>
                  <span
                    className={`badge ${
                      i.severity === "high"
                        ? "bg-danger"
                        : i.severity === "medium"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {i.severity}
                  </span>
                </td>
                <td>{worker?.name || "-"}</td>
                <td>{equip?.name || "-"}</td>
                <td>{date}</td>
                <td className="d-flex gap-2">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => openEditModal(i)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(i._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-2">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="d-flex gap-2">
          <Button
            size="sm"
            variant="outline-secondary"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <Button
            size="sm"
            variant="outline-secondary"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={!!editing} onHide={() => setEditing(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Incident</Modal.Title>
        </Modal.Header>
        {editing && (
          <Modal.Body>
            <Form className="d-flex flex-column gap-3">
              <Form.Control
                value={editing.description}
                onChange={(e) =>
                  setEditing({ ...editing, description: e.target.value })
                }
              />
              <Form.Select
                value={editing.severity}
                onChange={(e) =>
                  setEditing({ ...editing, severity: e.target.value })
                }
              >
                <option value="low">Low Severity</option>
                <option value="medium">Medium Severity</option>
                <option value="high">High Severity</option>
              </Form.Select>
            </Form>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditing(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
