import { useState } from 'react';
import { usePersonas } from '../hooks/usePersonas';
import PersonaCard from '../components/PersonaCard';
import PersonaForm from '../components/PersonaForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import './PersonasPage.css';

function PersonasPage() {
  const { personas, loading, error, createPersona, updatePersona, deletePersona } = usePersonas();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateOrEdit = async (personaData) => {
    setFormLoading(true);
    const action = selectedPersona ? updatePersona : createPersona;
    const result = await action(selectedPersona?.id_persona, personaData);
    if (result.success) {
      setModalOpen(false);
      setSelectedPersona(null);
    } else {
      alert(result.error);
    }
    setFormLoading(false);
  };

  const handleDelete = async (id) => {
    const result = await deletePersona(id);
    if (!result.success) {
      alert(result.error);
    }
  };

  return (
    <div className="personas-page">
      <header className="personas-page__header">
        <h1 className="heading-2">Gestión de Personas</h1>
        <Button onClick={() => { setSelectedPersona(null); setModalOpen(true); }} variant="primary">
          Crear Persona
        </Button>
      </header>

      {loading && <p className="personas-page__loading">Cargando personas...</p>}
      {error && <p className="personas-page__error">Error: {error}</p>}

      <div className="personas-page__list">
        {personas.map(persona => (
          <PersonaCard 
            key={persona.id_persona} 
            persona={persona}
            onEdit={() => { setSelectedPersona(persona); setModalOpen(true); }}
            onDelete={handleDelete}
          />
        ))}
        {personas.length === 0 && !loading && <p>No hay personas registradas</p>}
      </div>

      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title={selectedPersona ? 'Editar Persona' : 'Crear Persona'}
        size="medium"
      >
        <PersonaForm 
          persona={selectedPersona} 
          onSubmit={handleCreateOrEdit}
          onCancel={() => setModalOpen(false)}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
}

export default PersonasPage;
