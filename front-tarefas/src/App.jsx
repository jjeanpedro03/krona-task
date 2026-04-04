import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Toast, ToastContainer, Spinner } from 'react-bootstrap';
import TarefaForm from './components/TarefaForm';
import TarefaLista from './components/TarefaLista';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [notificacao, setNotificacao] = useState({ exibir: false, mensagem: '', cor: 'success' });

  const mostrarAviso = (msg, cor = 'success') => {
    setNotificacao({ exibir: true, mensagem: msg, cor });
  };

  const buscarTarefas = async () => {
    setCarregando(true);
    try {
      const res = await axios.get('http://localhost:3001/tarefas');
      setTarefas(res.data);
    } catch (e) {
      mostrarAviso("Erro na conexão com KronaServer", "danger");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { buscarTarefas(); }, []);

  const adicionarTarefa = async (dados) => {
    try {
      await axios.post('http://localhost:3001/tarefas', dados);
      buscarTarefas();
      mostrarAviso("Demanda registrada com sucesso!");
    } catch (e) { mostrarAviso("Erro ao salvar", "danger"); }
  };

  const apagarTarefa = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tarefas/${id}`);
      buscarTarefas();
      mostrarAviso("Demanda removida!", "warning");
    } catch (e) { mostrarAviso("Erro ao excluir", "danger"); }
  };

  const alternarConclusao = async (id, novoStatus) => {
    try {
      await axios.put(`http://localhost:3001/tarefas/${id}`, { concluida: novoStatus });
      buscarTarefas();
      mostrarAviso(novoStatus ? "Concluída! 🎉" : "Reaberta", novoStatus ? "success" : "info");
    } catch (e) { mostrarAviso("Erro no servidor", "danger"); }
  };

  return (
    <div style={{ 
      backgroundColor: '#f0f2f5', 
      minHeight: '100vh', 
      width: '100vw', 
      margin: 0, 
      padding: 0,
      overflowX: 'hidden' 
    }}>
      
      {}
      <Navbar bg="dark" variant="dark" className="shadow-sm mb-4 py-3 border-0 w-100">
        <div className="container-fluid px-4">
          <Navbar.Brand className="fw-bold fs-3 p-0 m-0 d-flex align-items-center border-0">
            <span style={{ color: '#ffffff' }}>Krona</span>
            <span style={{ color: '#0d6efd' }}>Task</span>
          </Navbar.Brand>
          {carregando && <Spinner animation="border" variant="primary" size="sm" />}
        </div>
      </Navbar>

      {}
      <div className="container-fluid px-4 w-100" style={{ maxWidth: '100%' }}>
        <TarefaForm aoAdicionar={adicionarTarefa} />
        <TarefaLista 
          tarefas={tarefas} 
          aoApagar={apagarTarefa} 
          aoAlternarConclusao={alternarConclusao} 
        />
      </div>

      {}
      <ToastContainer position="bottom-end" className="p-4" style={{ zIndex: 9999 }}>
        <Toast 
          bg={notificacao.cor} 
          onClose={() => setNotificacao({ ...notificacao, exibir: false })} 
          show={notificacao.exibir} 
          delay={3000} 
          autohide
        >
          <Toast.Body className="text-white fw-bold px-3 py-2">
            {notificacao.mensagem}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;