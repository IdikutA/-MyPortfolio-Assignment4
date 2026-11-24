import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiRequest from '../api/api';

export default function AdminDashboard() {
  const token = sessionStorage.getItem('jwt');
  const role = sessionStorage.getItem('role');

const [projects, setProjects] = useState([]);
const [qualifications, setQualifications] = useState([]);
const [qualificationsLoading, setQualificationsLoading] = useState(true);
const [qualificationsError, setQualificationsError] = useState('');
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [newProject, setNewProject] = useState({
  title: '',
  description: '',
  firstName: '',
  lastName: ''
});

const [saving, setSaving] = useState(false);
const [message, setMessage] = useState('');
const [editingProjectId, setEditingProjectId] = useState(null);
const [editProject, setEditProject] = useState({
  title: '',
  description: '',
  firstName: '',
  lastName: ''
});

const [newQualification, setNewQualification] = useState({
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  completionDate: '',
  description: ''
});

const [qualificationSaving, setQualificationSaving] = useState(false);
const [qualificationMessage, setQualificationMessage] = useState('');

const [editingQualificationId, setEditingQualificationId] = useState(null);

const [editQualification, setEditQualification] = useState({
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  completionDate: '',
  description: ''
});
const [contacts, setContacts] = useState([]);
const [contactsLoading, setContactsLoading] = useState(true);
const [contactsError, setContactsError] = useState('');



useEffect(() => {
  if (!token || role !== 'admin') {
    setLoading(false);
    return;
  }

  const loadProjects = async () => {
    try {
      const data = await apiRequest('/api/projects');
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  loadProjects();
}, [token, role]);


const handleCreateProject = async (e) => {
  e.preventDefault();
  setSaving(true);
  setError('');
  setMessage('');

  try {
    const createdProject = await apiRequest('/api/projects', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newProject)
    });

    setProjects((previous) => [...previous, createdProject]);

    setNewProject({
      title: '',
      description: '',
      firstName: '',
      lastName: ''
    });

    setMessage('Project created successfully!');
  } catch (err) {
    setError(err.message);
  } finally {
    setSaving(false);
  }
};


const handleDeleteProject = async (projectId) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this project?'
  );

  if (!confirmed) {
    return;
  }

  setError('');
  setMessage('');

  try {
    await apiRequest(`/api/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setProjects((previous) =>
      previous.filter((project) => project._id !== projectId)
    );

    setMessage('Project deleted successfully!');
  } catch (err) {
    setError(err.message);
  }
};


const handleEditProject = (project) => {
  setEditingProjectId(project._id);

  setEditProject({
    title: project.title || '',
    description: project.description || '',
    firstName: project.firstName || '',
    lastName: project.lastName || ''
  });

  setError('');
  setMessage('');
};

const handleUpdateProject = async (e) => {
  e.preventDefault();
  setSaving(true);
  setError('');
  setMessage('');

  try {
    const updatedProject = await apiRequest(
      `/api/projects/${editingProjectId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editProject)
      }
    );

    setProjects((previous) =>
      previous.map((project) =>
        project._id === editingProjectId
          ? { ...project, ...updatedProject }
          : project
      )
    );

    setEditingProjectId(null);
    setMessage('Project updated successfully!');
  } catch (err) {
    setError(err.message);
  } finally {
    setSaving(false);
  }
};

useEffect(() => {
  if (!token || role !== 'admin') {
    setQualificationsLoading(false);
    return;
  }

  const loadQualifications = async () => {
    try {
      const data = await apiRequest('/api/qualifications');
      setQualifications(data);
    } catch (err) {
      setQualificationsError(err.message);
    } finally {
      setQualificationsLoading(false);
    }
  };

  loadQualifications();
}, [token, role]);


const handleCreateQualification = async (e) => {
  e.preventDefault();

  setQualificationSaving(true);
  setQualificationsError('');
  setQualificationMessage('');

  try {
    const createdQualification = await apiRequest('/api/qualifications', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newQualification)
    });

    setQualifications((previous) => [
      ...previous,
      createdQualification
    ]);

    setNewQualification({
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      completionDate: '',
      description: ''
    });

    setQualificationMessage('Qualification created successfully!');
  } catch (err) {
    setQualificationsError(err.message);
  } finally {
    setQualificationSaving(false);
  }
};

const handleDeleteQualification = async (qualificationId) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this qualification?'
  );

  if (!confirmed) return;

  setQualificationsError('');
  setQualificationMessage('');

  try {
    await apiRequest(`/api/qualifications/${qualificationId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setQualifications((previous) =>
      previous.filter(
        (qualification) => qualification._id !== qualificationId
      )
    );

    setQualificationMessage('Qualification deleted successfully!');
  } catch (err) {
    setQualificationsError(err.message);
  }
};


const handleEditQualification = (qualification) => {
  setEditingQualificationId(qualification._id);

  setEditQualification({
    title: qualification.title || '',
    firstName: qualification.firstName || '',
    lastName: qualification.lastName || '',
    email: qualification.email || '',
    completionDate: qualification.completionDate
      ? qualification.completionDate.substring(0, 10)
      : '',
    description: qualification.description || ''
  });

  setQualificationsError('');
  setQualificationMessage('');
};

const handleUpdateQualification = async (e) => {
  e.preventDefault();

  setQualificationSaving(true);
  setQualificationsError('');
  setQualificationMessage('');

  try {
    const updatedQualification = await apiRequest(
      `/api/qualifications/${editingQualificationId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editQualification)
      }
    );

    setQualifications((previous) =>
      previous.map((qualification) =>
        qualification._id === editingQualificationId
          ? { ...qualification, ...updatedQualification }
          : qualification
      )
    );

    setEditingQualificationId(null);
    setQualificationMessage('Qualification updated successfully!');
  } catch (err) {
    setQualificationsError(err.message);
  } finally {
    setQualificationSaving(false);
  }
};

useEffect(() => {
  if (!token || role !== 'admin') {
    setContactsLoading(false);
    return;
  }

  const loadContacts = async () => {
    try {
      const data = await apiRequest('/api/contacts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setContacts(data);
    } catch (err) {
      setContactsError(err.message);
    } finally {
      setContactsLoading(false);
    }
  };

  loadContacts();
}, [token, role]);


const handleDeleteContact = async (contactId) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this contact message?'
  );

  if (!confirmed) return;

  setContactsError('');

  try {
    await apiRequest(`/api/contacts/${contactId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setContacts((previous) =>
      previous.filter((contact) => contact._id !== contactId)
    );

    alert('Contact message deleted successfully!');
  } catch (err) {
    setContactsError(err.message);
  }
};

  if (!token || role !== 'admin') {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Access Denied</h2>
        <p>Only administrators can access this page.</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1000px',
      margin: '0 auto',
      textAlign: 'left'
    }}>
      <h1>Administrator Dashboard</h1>

      <p>Welcome! You can manage your portfolio information here.</p>

      
    <h2>Manage Projects</h2>

    <h3>Add New Project</h3>

    <form onSubmit={handleCreateProject}
    style={{ maxWidth: '600px', marginBottom: '30px' }}>

    {['title', 'description', 'firstName', 'lastName'].map((field) => (
        <div key={field} style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
            {field}:
        </label>

        <input
            type="text"
            name={field}
            required
            value={newProject[field]}
            onChange={(e) => setNewProject({
            ...newProject,
            [e.target.name]: e.target.value
            })}
            style={{ width: '100%', padding: '8px' }}
        />
        </div>
    ))}

    <button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Add Project'}
    </button>
    </form>

    {message && <p style={{ color: 'green' }}>{message}</p>}

    <p>Projects currently stored in MongoDB:</p>

    {loading && <p>Loading projects...</p>}

    {error && <p style={{ color: 'red' }}>{error}</p>}

    {!loading && !error && projects.length === 0 && (
    <p>No projects found.</p>
    )}

    {!loading && !error && projects.map((project) => (
    <div
        key={project._id}
        style={{
        border: '1px solid #ccc',
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '6px'
        }}
    >
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p>
        Created by: {project.firstName} {project.lastName}
        </p>
        
        <button
            type="button"
            onClick={() => handleEditProject(project)}
            style={{
                padding: '8px 15px',
                marginRight: '10px',
                backgroundColor: 'navy',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}
            >
            Edit
        </button>
        <button
        type="button"
        onClick={() => handleDeleteProject(project._id)}
        style={{
            padding: '8px 15px',
            backgroundColor: '#b22222',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }}
        >
        Delete
        </button>

        {editingProjectId === project._id && (
        <form
            onSubmit={handleUpdateProject}
            style={{
            marginTop: '15px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '6px'
            }}
        >
            <h4>Edit Project</h4>

            {['title', 'description', 'firstName', 'lastName'].map((field) => (
            <div key={field} style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block' }}>
                {field}:
                </label>

                <input
                type="text"
                name={field}
                required
                value={editProject[field]}
                onChange={(e) =>
                    setEditProject({
                    ...editProject,
                    [e.target.name]: e.target.value
                    })
                }
                style={{ width: '100%', padding: '8px' }}
                />
            </div>
            ))}

            <button type="submit" disabled={saving}>
            {saving ? 'Updating...' : 'Save Changes'}
            </button>

            <button
            type="button"
            onClick={() => setEditingProjectId(null)}
            style={{ marginLeft: '10px' }}
            >
            Cancel
            </button>
        </form>
        )}

    </div>
    ))}

      
      <h2>Manage Qualifications</h2>

      <h3>Add New Qualification</h3>

      <form
        onSubmit={handleCreateQualification}
        style={{ maxWidth: '600px', marginBottom: '30px' }}
      >
        {['title', 'firstName', 'lastName', 'email', 'completionDate', 'description'].map((field) => (
          <div key={field} style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              {field}:
            </label>

            <input
              type={
                field === 'completionDate' ? 'date' :
                field === 'email' ? 'email' : 'text'
              }
              name={field}
              required
              value={newQualification[field]}
              onChange={(e) => setNewQualification({
                ...newQualification,
                [e.target.name]: e.target.value
              })}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        ))}

        <button type="submit" disabled={qualificationSaving}>
          {qualificationSaving ? 'Saving...' : 'Add Qualification'}
        </button>
      </form>

      {qualificationMessage && (
        <p style={{ color: 'green' }}>{qualificationMessage}</p>
      )}

      <p>Qualifications currently stored in MongoDB:</p>

      {qualificationsLoading && <p>Loading qualifications...</p>}

      {qualificationsError && (
        <p style={{ color: 'red' }}>{qualificationsError}</p>
      )}

      {!qualificationsLoading && !qualificationsError &&
        qualifications.length === 0 && (
          <p>No qualifications found.</p>
        )}

      {!qualificationsLoading && !qualificationsError &&
        qualifications.map((qualification) => (
          <div
            key={qualification._id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '6px'
            }}
          >
            <h3>{qualification.title}</h3>

            <p>
              Name: {qualification.firstName} {qualification.lastName}
            </p>

            <p>Email: {qualification.email}</p>

            <p>
              Completion Date:{' '}
              {qualification.completionDate
                ? new Date(qualification.completionDate).toLocaleDateString()
                : 'Not specified'}
            </p>

            <p>{qualification.description}</p>

            <button
              type="button"
              onClick={() => handleEditQualification(qualification)}
              style={{
                padding: '8px 15px',
                marginRight: '10px',
                backgroundColor: 'navy',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => handleDeleteQualification(qualification._id)}
              style={{
                padding: '8px 15px',
                backgroundColor: '#b22222',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>


            {editingQualificationId === qualification._id && (
              <form
                onSubmit={handleUpdateQualification}
                style={{
                  marginTop: '15px',
                  padding: '15px',
                  border: '1px solid #ccc',
                  borderRadius: '6px'
                }}
              >
                <h4>Edit Qualification</h4>

                {['title', 'firstName', 'lastName', 'email', 'completionDate', 'description'].map((field) => (
                  <div key={field} style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                      {field}:
                    </label>

                    <input
                      type={
                        field === 'completionDate' ? 'date' :
                        field === 'email' ? 'email' : 'text'
                      }
                      name={field}
                      required
                      value={editQualification[field]}
                      onChange={(e) =>
                        setEditQualification({
                          ...editQualification,
                          [e.target.name]: e.target.value
                        })
                      }
                      style={{ width: '100%', padding: '8px' }}
                    />
                  </div>
                ))}

                <button type="submit" disabled={qualificationSaving}>
                  {qualificationSaving ? 'Updating...' : 'Save Changes'}
                </button>

                <button
                  type="button"
                  onClick={() => setEditingQualificationId(null)}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              </form>
            )}

          </div>
        ))}


      
      <h2>Contact Messages</h2>
      <p>Messages submitted through the Contact form:</p>

      {contactsLoading && <p>Loading messages...</p>}

      {contactsError && (
        <p style={{ color: 'red' }}>{contactsError}</p>
      )}

      {!contactsLoading && !contactsError && contacts.length === 0 && (
        <p>No contact messages found.</p>
      )}

      {!contactsLoading && !contactsError &&
        contacts.map((contact) => (
          <div
            key={contact._id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '6px'
            }}
          >
            <h3>{contact.firstName} {contact.lastName}</h3>

            <p>Phone: {contact.contactNumber}</p>
            <p>Email: {contact.email}</p>
            <p>Message: {contact.message}</p>

            <button
              type="button"
              onClick={() => handleDeleteContact(contact._id)}
              style={{
                padding: '8px 15px',
                backgroundColor: '#b22222',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Delete Message
            </button>

          </div>
        ))}


      <p>
        <Link to="/">Return to Home</Link>
      </p>
    </div>
  );
}
