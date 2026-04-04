import { useState } from 'react';
import { ListGroup, Button, Badge, Stack, Modal } from 'react-bootstrap';
import { FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const TarefaItem = ({ tarefa, aoApagar, aoAlternarConclusao }) => {
  const [exibirModal, setExibirModal] = useState(false);

  const getPrioridadeCor = (p) => {
    const cores = { alta: 'danger', media: 'warning', baixa: 'success' };
    return cores[p] || 'secondary';
  };

  return (
    <>
      <ListGroup.Item 
        className={`p-3 mb-3 rounded-3 shadow-sm border-start border-4 ${
          tarefa.concluida ? 'border-secondary bg-light opacity-75' : 'border-primary bg-white'
        }`}
        style={{ transition: 'all 0.2s ease-in-out' }}
      >
        <Stack direction="horizontal" gap={4} className="w-100">
          <div 
            style={{ cursor: 'pointer', fontSize: '1.6rem' }} 
            className={tarefa.concluida ? "text-success" : "text-muted opacity-50"}
            onClick={() => aoAlternarConclusao(tarefa.id, !tarefa.concluida)}
          >
            {tarefa.concluida ? <FaCheckCircle /> : <FaRegCircle />}
          </div>

          <div className="flex-grow-1">
            <h5 className={`mb-1 fw-bold ${tarefa.concluida ? 'text-decoration-line-through text-muted' : 'text-dark'}`}>
              {tarefa.titulo}
            </h5>
            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>
              Registrado em: {new Date(tarefa.data_criacao).toLocaleDateString('pt-BR')}
            </small>
          </div>

          <Stack direction="horizontal" gap={3}>
            <Badge pill bg={getPrioridadeCor(tarefa.prioridade)} className="px-3 py-2 text-uppercase" style={{ fontSize: '0.7rem' }}>
              {tarefa.prioridade}
            </Badge>
            <Button variant="outline-danger" className="border-0 p-2" onClick={() => setExibirModal(true)}>
              <FaTrash size={18} />
            </Button>
          </Stack>
        </Stack>
      </ListGroup.Item>

      <Modal show={exibirModal} onHide={() => setExibirModal(false)} centered backdrop="static">
        <Modal.Header closeButton className="bg-white border-0 pt-4 px-4">
          <Modal.Title className="fw-bold text-danger">Confirmar Remoção</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-3 fs-5">
          Deseja excluir a demanda: <br/> 
          <span className="fw-bold">"{tarefa.titulo}"</span>?
        </Modal.Body>
        <Modal.Footer className="border-0 pb-4 px-4">
          <Button variant="light" onClick={() => setExibirModal(false)}>Voltar</Button>
          <Button variant="danger" className="px-4 fw-bold" onClick={() => { aoApagar(tarefa.id); setExibirModal(false); }}>Excluir Agora</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TarefaItem;