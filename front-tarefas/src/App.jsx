import { useState, useEffect } from 'react';
import API from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Toast, ToastContainer, Spinner } from 'react-bootstrap';
import TarefaForm from './components/TarefaForm';
import TarefaLista from './components/TarefaLista';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [notificacao, setNotificacao] = useState({
    exibir: false,
    mensagem: '',
    cor: 'success'
  });

  function mostrarAviso(msg, cor) {
    if (!cor) {
      cor = 'success';
    }

    setNotificacao({
      exibir: true,
      mensagem: msg,
      cor: cor
    });
  }

  async function buscarTarefas() {
    setCarregando(true);

    try {
      const res = await API.get('/tarefas');
      setTarefas(res.data);
    } catch (e) {
      mostrarAviso("Erro na conexão com KronaServer", "danger");
    }

    setCarregando(false);
  }

  useEffect(function () {
    buscarTarefas();
  }, []);

  async function adicionarTarefa(dados) {
    try {
      await API.post('/tarefas', dados);
      buscarTarefas();
      mostrarAviso("Demanda registrada com sucesso!");
    } catch (e) {
      mostrarAviso("Erro ao salvar no banco", "danger");
    }
  }

  async function apagarTarefa(id) {
    try {
      await API.delete('/tarefas/' + id);
      buscarTarefas();
      mostrarAviso("Demanda removida!", "warning");
    } catch (e) {
      mostrarAviso("Erro ao excluir", "danger");
    }
  }

  async function alternarConclusao(id, novoStatus) {
    try {
      await API.put('/tarefas/' + id, { concluida: novoStatus });
      buscarTarefas();

      if (novoStatus) {
        mostrarAviso("Concluída! 🎉", "success");
      } else {
        mostrarAviso("Reaberta", "info");
      }

    } catch (e) {
      mostrarAviso("Erro ao atualizar status", "danger");
    }
  }

  let spinner = null;

  if (carregando) {
    spinner = <Spinner animation="border" variant="primary" size="sm" />;
  }

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', width: '100vw', margin: 0, padding: 0, overflowX: 'hidden' }}>
      
      <Navbar bg="dark" variant="dark" className="shadow-sm mb-4 py-3 border-0 w-100">
        <div className="container-fluid px-4">
          <Navbar.Brand className="fw-bold fs-3 p-0 m-0 d-flex align-items-center border-0">
            <span style={{ color: '#ffffff' }}>Krona</span>
            <span style={{ color: '#0d6efd' }}>Task</span>
          </Navbar.Brand>

          {spinner}
        </div>
      </Navbar>

      <div className="container-fluid px-4 w-100">
        <TarefaForm aoAdicionar={adicionarTarefa} />
        <TarefaLista 
          tarefas={tarefas}
          aoApagar={apagarTarefa}
          aoAlternarConclusao={alternarConclusao}
        />
      </div>

      <ToastContainer position="bottom-end" className="p-4" style={{ zIndex: 9999 }}>
        <Toast
          bg={notificacao.cor}
          onClose={function () {
            setNotificacao({
              exibir: false,
              mensagem: '',
              cor: notificacao.cor
            });
          }}
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