import { useEffect, useState } from "react";
import { getEquipment, createEquipment, deleteEquipment } from "../api/equipment";
import { Table, Button, Form, Container } from "react-bootstrap";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    const res = await getEquipment();
    setEquipment(res.data);
  };

  const addEquipment = async () => {
    if (!name.trim()) return;
    await createEquipment({ name });
    setName("");
    loadEquipment();
  };

  return (
    <Container className="page-container">
      <h2>Equipment</h2>

      <Form className="d-flex gap-2 mt-3 w-50">
        <Form.Control
          placeholder="Enter equipment name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={addEquipment}>Add Equipment</Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Equipment Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((e, index) => (
            <tr key={e._id}>
              <td>{index + 1}</td>
              <td>{e.name}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteEquipment(e._id).then(loadEquipment)}
                >
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
