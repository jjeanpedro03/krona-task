import { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

const TarefaForm = ({ aoAdicionar }) => {
  const [titulo, setTitulo] = useState('');
  const [prioridade, setPrioridade] = useState('baixa');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    aoAdicionar({ titulo, prioridade });
    setTitulo('');
    setPrioridade('baixa');
  };

  return (
    <Card className="p-4 shadow-sm border-0 mb-4 bg-white rounded-3">
      <Form onSubmit={handleSubmit}>
        {}
        <Row className="align-items-end g-3">
          <Col xs={12} lg={8}>
            <Form.Group>
              <Form.Label className="fw-bold small text-muted text-uppercase">O QUE PRECISA SER FEITO?</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Digite a nova demanda..." 
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="py-2"
              />
            </Form.Group>
          </Col>
          <Col xs={6} lg={2}>
            <Form.Group>
              <Form.Label className="fw-bold small text-muted text-uppercase">URGÊNCIA</Form.Label>
              <Form.Select 
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
                className="py-2"
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={6} lg={2}>
            <Button variant="primary" type="submit" className="w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2">
              <FaPlus /> <span>CRIAR</span>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default TarefaForm;