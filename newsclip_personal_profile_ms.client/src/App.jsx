import { useEffect, useState } from 'react';
import './App.css';

function Modal({ title, children, onClose }) {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>{title}</h2>
                {children}
                <button className="modal-close-btn" onClick={onClose} title="Close">&times;</button>
            </div>
        </div>
    );
}

function App() {
    const [profiles, setProfiles] = useState();
    const [editIndex, setEditIndex] = useState(null);
    const [editProfile, setEditProfile] = useState(null);

    // Modal state
    const [modalType, setModalType] = useState(null); // 'skill' | 'experience' | 'education' | null
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        populateProfileData();
    }, []);

    const handleEdit = (idx) => {
        setEditIndex(idx);
        setEditProfile(JSON.parse(JSON.stringify(profiles[idx])));
    };

    const handleCancel = () => {
        setEditIndex(null);
        setEditProfile(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (section, idx, field, value) => {
        setEditProfile(prev => {
            const updated = [...prev[section]];
            updated[idx] = { ...updated[idx], [field]: value };
            return { ...prev, [section]: updated };
        });
    };

    async function handleSave() {
        const updatedProfiles = [...profiles];
        updatedProfiles[editIndex] = editProfile;
        setProfiles(updatedProfiles);
        setEditIndex(null);
        setEditProfile(null);

        // Save to backend
        await fetch('profiledata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editProfile)
        });
    }

    // Modal open handlers
    const openAddSkill = () => {
        setModalType('skill');
        setModalData({ name: '', proficiency: '' });
    };
    const openAddExperience = () => {
        setModalType('experience');
        setModalData({ jobTitle: '', companyName: '', startDate: '', endDate: '', description: '' });
    };
    const openAddEducation = () => {
        setModalType('education');
        setModalData({ degree: '', institutionName: '', startDate: '', endDate: '', description: '' });
    };

    // Modal save handlers
    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setModalData(prev => ({ ...prev, [name]: value }));
    };

    const handleModalSave = () => {
        if (modalType === 'skill') {
            setEditProfile(prev => ({
                ...prev,
                skills: [
                    ...prev.skills,
                    { id: Date.now(), name: modalData.name, proficiency: modalData.proficiency }
                ]
            }));
        } else if (modalType === 'experience') {
            setEditProfile(prev => ({
                ...prev,
                workExperiences: [
                    ...prev.workExperiences,
                    {
                        id: Date.now(),
                        jobTitle: modalData.jobTitle,
                        companyName: modalData.companyName,
                        startDate: modalData.startDate,
                        endDate: modalData.endDate,
                        description: modalData.description
                    }
                ]
            }));
        } else if (modalType === 'education') {
            setEditProfile(prev => ({
                ...prev,
                educationHistory: [
                    ...prev.educationHistory,
                    {
                        id: Date.now(),
                        degree: modalData.degree,
                        institutionName: modalData.institutionName,
                        startDate: modalData.startDate,
                        endDate: modalData.endDate,
                        description: modalData.description
                    }
                ]
            }));
        }
        setModalType(null);
        setModalData({});
    };

    const renderProfile = (profile, idx) => (
        <div key={profile.id} className="profile-card">
            <div className="profile-header">
                <img className="profile-picture" src={profile.profilePictureUrl} alt={profile.name} />
                <div>
                    <h2>{profile.name}</h2>
                    <p>{profile.bio}</p>
                    <p>
                        <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a> |{' '}
                        <a href={profile.gitHubUrl} target="_blank" rel="noopener noreferrer">GitHub</a> |{' '}
                        <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer">Website</a>
                    </p>
                </div>
            </div>
            <div className="profile-details">
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Phone:</strong> {profile.phoneNumber}</p>
                <p><strong>Address:</strong> {profile.address}</p>
                <p><strong>Date of Birth:</strong> {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Interests:</strong> {profile.interests}</p>
            </div>
            <div className="profile-section">
                <h3>Skills</h3>
                <ul>
                    {profile.skills.map(skill => (
                        <li key={skill.id}>{skill.name} ({skill.proficiency})</li>
                    ))}
                </ul>
            </div>
            <div className="profile-section">
                <h3>Experience</h3>
                <ul>
                    {profile.workExperiences.map(exp => (
                        <li key={exp.id}>
                            <strong>{exp.jobTitle}</strong> at {exp.companyName} <br />
                            <span>{new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</span>
                            <div>{exp.description}</div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="profile-section">
                <h3>Education</h3>
                <ul>
                    {profile.educationHistory.map(edu => (
                        <li key={edu.id}>
                            <strong>{edu.degree}</strong> at {edu.institutionName} <br />
                            <span>{new Date(edu.startDate).toLocaleDateString()} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}</span>
                            <div>{edu.description}</div>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={() => handleEdit(idx)}>Edit</button>
        </div>
    );

    const renderEditForm = (profile, idx) => (
        <div key={profile.id} className="profile-card">
            <div className="profile-header">
                <img className="profile-picture" src={profile.profilePictureUrl} alt={profile.name} />
                <div>
                    <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
                    <textarea name="bio" value={profile.bio} onChange={handleChange} placeholder="Bio" />
                    <p>
                        <input name="linkedInUrl" value={profile.linkedInUrl} onChange={handleChange} placeholder="LinkedIn URL" /> |{' '}
                        <input name="gitHubUrl" value={profile.gitHubUrl} onChange={handleChange} placeholder="GitHub URL" /> |{' '}
                        <input name="websiteUrl" value={profile.websiteUrl} onChange={handleChange} placeholder="Website URL" />
                    </p>
                </div>
            </div>
            <div className="profile-details">
                <p><strong>Email:</strong> <input name="email" value={profile.email} onChange={handleChange} /></p>
                <p><strong>Phone:</strong> <input name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} /></p>
                <p><strong>Address:</strong> <input name="address" value={profile.address} onChange={handleChange} /></p>
                <p><strong>Date of Birth:</strong> <input name="dateOfBirth" type="date" value={profile.dateOfBirth?.slice(0, 10)} onChange={handleChange} /></p>
                <p><strong>Interests:</strong> <input name="interests" value={profile.interests} onChange={handleChange} /></p>
                <p><strong>Profile Picture URL:</strong> <input name="profilePictureUrl" value={profile.profilePictureUrl} onChange={handleChange} /></p>
            </div>
            <div className="profile-section">
                <h3>Skills</h3>
                <ul>
                    {profile.skills.map((skill, i) => (
                        <li key={skill.id}>
                            <input
                                value={skill.name}
                                onChange={e => handleArrayChange('skills', i, 'name', e.target.value)}
                                placeholder="Skill Name"
                            />
                            <input
                                value={skill.proficiency}
                                onChange={e => handleArrayChange('skills', i, 'proficiency', e.target.value)}
                                placeholder="Proficiency"
                            />
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={openAddSkill}>Add Skill</button>
            </div>
            <div className="profile-section">
                <h3>Experience</h3>
                <ul>
                    {profile.workExperiences.map((exp, i) => (
                        <li key={exp.id}>
                            <input
                                value={exp.jobTitle}
                                onChange={e => handleArrayChange('workExperiences', i, 'jobTitle', e.target.value)}
                                placeholder="Job Title"
                            />
                            <input
                                value={exp.companyName}
                                onChange={e => handleArrayChange('workExperiences', i, 'companyName', e.target.value)}
                                placeholder="Company Name"
                            />
                            <input
                                type="date"
                                value={exp.startDate?.slice(0, 10)}
                                onChange={e => handleArrayChange('workExperiences', i, 'startDate', e.target.value)}
                            />
                            <input
                                type="date"
                                value={exp.endDate?.slice(0, 10)}
                                onChange={e => handleArrayChange('workExperiences', i, 'endDate', e.target.value)}
                            />
                            <textarea
                                value={exp.description}
                                onChange={e => handleArrayChange('workExperiences', i, 'description', e.target.value)}
                                placeholder="Description"
                            />
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={openAddExperience}>Add Experience</button>
            </div>
            <div className="profile-section">
                <h3>Education</h3>
                <ul>
                    {profile.educationHistory.map((edu, i) => (
                        <li key={edu.id}>
                            <input
                                value={edu.degree}
                                onChange={e => handleArrayChange('educationHistory', i, 'degree', e.target.value)}
                                placeholder="Degree"
                            />
                            <input
                                value={edu.institutionName}
                                onChange={e => handleArrayChange('educationHistory', i, 'institutionName', e.target.value)}
                                placeholder="Institution"
                            />
                            <input
                                type="date"
                                value={edu.startDate?.slice(0, 10)}
                                onChange={e => handleArrayChange('educationHistory', i, 'startDate', e.target.value)}
                            />
                            <input
                                type="date"
                                value={edu.endDate?.slice(0, 10)}
                                onChange={e => handleArrayChange('educationHistory', i, 'endDate', e.target.value)}
                            />
                            <textarea
                                value={edu.description}
                                onChange={e => handleArrayChange('educationHistory', i, 'description', e.target.value)}
                                placeholder="Description"
                            />
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={openAddEducation}>Add Education</button>
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel} style={{ marginLeft: '1rem' }}>Cancel</button>
            {modalType && (
                <Modal
                    title={
                        modalType === 'skill' ? 'Add Skill' :
                            modalType === 'experience' ? 'Add Experience' :
                                'Add Education'
                    }
                    onClose={() => setModalType(null)}
                >
                    {modalType === 'skill' && (
                        <form onSubmit={e => { e.preventDefault(); handleModalSave(); }}>
                            <div>
                                <label>Skill Name: <input name="name" value={modalData.name} onChange={handleModalChange} required /></label>
                            </div>
                            <div>
                                <label>Proficiency: <input name="proficiency" value={modalData.proficiency} onChange={handleModalChange} required /></label>
                            </div>
                            <button type="submit">Add</button>
                        </form>
                    )}
                    {modalType === 'experience' && (
                        <form onSubmit={e => { e.preventDefault(); handleModalSave(); }}>
                            <div>
                                <label>Job Title: <input name="jobTitle" value={modalData.jobTitle} onChange={handleModalChange} required /></label>
                            </div>
                            <div>
                                <label>Company Name: <input name="companyName" value={modalData.companyName} onChange={handleModalChange} required /></label>
                            </div>
                            <div>
                                <label>Start Date: <input type="date" name="startDate" value={modalData.startDate} onChange={handleModalChange} required /></label>
                            </div>
                            <div>
                                <label>End Date: <input type="date" name="endDate" value={modalData.endDate} onChange={handleModalChange} /></label>
                            </div>
                            <div>
                                <label>Description: <textarea name="description" value={modalData.description} onChange={handleModalChange} /></label>
                            </div>
                            <button type="submit">Add</button>
                        </form>
                    )}
                    {modalType === 'education' && (
                        <form onSubmit={e => { e.preventDefault(); handleModalSave(); }}>
                            <div>
                                <label>Degree: <input name="degree" value={modalData.degree} onChange={handleModalChange} required /></label>
                            </div>
                            <div>
                                <label>Institution: <input name="institutionName" value={modalData.institutionName} onChange={handleModalChange} required /></label>
                            </div>
                            <div>
                                <label>Start Date: <input type="date" name="startDate" value={modalData.startDate} onChange={handleModalChange} required /></label>
                            </div>
                            <div>
                                <label>End Date: <input type="date" name="endDate" value={modalData.endDate} onChange={handleModalChange} /></label>
                            </div>
                            <div>
                                <label>Description: <textarea name="description" value={modalData.description} onChange={handleModalChange} /></label>
                            </div>
                            <button type="submit">Add</button>
                        </form>
                    )}
                </Modal>
            )}
        </div>
    );

    const contents = profiles === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : profiles.map((profile, idx) =>
            editIndex === idx
                ? renderEditForm(editProfile, idx)
                : renderProfile(profile, idx)
        );

    return (
        <div>
            <h1>Profile</h1>
            {contents}
        </div>
    );

    async function populateProfileData() {
        const response = await fetch('profiledata');
        if (response.ok) {
            const data = await response.json();
            setProfiles(data);
        }
    }
}

export default App;