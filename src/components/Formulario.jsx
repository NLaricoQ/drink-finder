import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import useCategories from "../hooks/useCategories";

import { useState } from "react";
import useDrinks from "../hooks/useDrinks";

const Formulario = () => {
  const [find, setFind] = useState({
    name: "",
    category: "",
  });
  const [alert, setAlert] = useState("");
  const { categories } = useCategories();
  const { getDrink } = useDrinks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(find).includes("")) {
      setAlert("Both fields are required");
      return;
    }
    setAlert("");
    getDrink(find);
  };
  return (
    <Form onSubmit={handleSubmit}>
      {alert && (
        <Alert variant="danger" className="text-center">
          {alert}
        </Alert>
      )}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Drink Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              placeholder="Ex: Tequilla, Vodka, etc"
              name="name"
              value={find.name}
              onChange={(e) =>
                setFind({
                  ...find,
                  [e.target.name]: e.target.value,
                })
              }
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="category">Drink Category</Form.Label>
            <Form.Select
              id="category"
              name="category"
              value={find.category}
              onChange={(e) =>
                setFind({
                  ...find,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option>- Select Category -</option>
              {categories.map((category) => (
                <option key={category.strCategory} value={category.strCategory}>
                  {category.strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col md={3}>
          <Button
            variant="danger"
            className="text-uppercase w-100"
            type="submit"
          >
            Find Drink
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Formulario;
