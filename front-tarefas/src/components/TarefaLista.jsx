import { ListGroup, Card, Container } from 'react-bootstrap';
import TarefaItem from './TarefaItem';
import { FaInbox } from 'react-icons/fa';

const TarefaLista = ({ tarefas, aoApagar, aoAlternarConclusao }) => {
  
  if (tarefas.length === 0) {
    return (
      <Card fluid className="text-center p-5 border-0 shadow-sm bg-light mb-4">
        <FaInbox size={50} className="text-muted mb-3 mx-auto" />
        <h5 className="text-muted fw-bold">Nenhuma demanda pendente</h5>
        <p className="small text-secondary">O seu painel de controle está limpo! 😁</p>
      </Card>
    );
  }

  return (
    <div className="mt-4 pb-5">
      <h5 className="mb-3 fw-bold text-secondary d-flex justify-content-between">
        Demandas Ativas
        <span className="badge bg-primary rounded-pill" style={{ fontSize: '0.8rem' }}>
          {tarefas.length}
        </span>
      </h5>
      
      <ListGroup className="shadow-sm">
        {tarefas.map((t) => (
          <TarefaItem 
            key={t.id} 
            tarefa={t} 
            aoApagar={aoApagar} 
            aoAlternarConclusao={aoAlternarConclusao} 
          />
        ))}
      </ListGroup>
    </div>
  );
};

export default TarefaLista;