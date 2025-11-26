import { useEffect, useState } from "react";
import { getWorkers, createWorker, deleteWorker } from "../api/workers";
import { Table, Button, Form, Container } from "react-bootstrap";

export default function Workers() {
  const [workers, setWorkers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadWorkers();
  }, []);

  const loadWorkers = async () => {
    const res = await getWorkers();
    setWorkers(res.data);
  };

  const addWorker = async () => {
    if (!name.trim()) return;
    await createWorker({ name });
    setName("");
    loadWorkers();
  };

  return (
    <Container className="page-container"> 
      <h2>Workers</h2>

      <Form className="d-flex gap-2 mt-3 w-50"> 
        <Form.Control
          placeholder="Enter worker name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={addWorker}>Add Worker</Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Worker Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((w, index) => (
            <tr key={w._id}>
              <td>{index + 1}</td>
              <td>{w.name}</td>
              <td>
                <Button variant="danger" onClick={() => deleteWorker(w._id).then(loadWorkers)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
