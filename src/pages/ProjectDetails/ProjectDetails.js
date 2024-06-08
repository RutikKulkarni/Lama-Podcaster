import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Cards/Card/Card";
import UploadModal from "../../components/Modals/UploadModal/UploadModal";
import EditDescription from "../../components/EditDescription/EditDescription";
import styles from "./ProjectDetails.module.css";
import YoutubeImg from "../../assets/Youtube.png";
import SpotifyImg from "../../assets/Spotify.png";
import rssImg from "../../assets/rss.png";
import circleImg from "../../assets/Circle.png";

const ProjectDetails = ({ user }) => {
  const { projectName } = useParams();
  const storedProjects = JSON.parse(localStorage.getItem(user)) || [];
  const project = storedProjects.find((p) => p.name === projectName) || null;

  const [showModal, setShowModal] = useState(false);
  const [uploadData, setUploadData] = useState(project ? project.uploads || [] : []);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (project) {
      const updatedProjects = storedProjects.map((p) =>
        p.name === projectName ? { ...p, uploads: uploadData } : p
      );
      localStorage.setItem(user, JSON.stringify(updatedProjects));
    }
  }, [uploadData]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveUpload = (name, description) => {
    const uploadItem = {
      name,
      description,
      uploadDateTime: new Date().toLocaleString(),
      status: "Done",
    };
    setUploadData([...uploadData, uploadItem]);
  };

  const handleDeleteItem = (index) => {
    const updatedUploadData = [...uploadData];
    updatedUploadData.splice(index, 1);
    setUploadData(updatedUploadData);
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
    setIsEditing(true);
  };

  const handleSaveEdit = (newDescription) => {
    const updatedUploadData = [...uploadData];
    updatedUploadData[editIndex].description = newDescription;
    setUploadData(updatedUploadData);
    setIsEditing(false);
    setEditIndex(null);
  };

  if (!storedProjects.length || !project) {
    return <div>Project not found</div>;
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link> / <Link to="/projects">Projects</Link> / {projectName}
        </nav>
        {isEditing ? (
          <EditDescription
            description={uploadData[editIndex].description}
            onSave={handleSaveEdit}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <h1 className={styles.title}>Upload</h1>
            <div className={styles.cardsContainer}>
              <Card
                imgSrc={YoutubeImg}
                title="Upload Youtube Video"
                onClick={handleOpenModal}
              />
              <Card
                imgSrc={SpotifyImg}
                title="Upload Spotify Podcast"
                onClick={handleOpenModal}
              />
              <Card
                imgSrc={rssImg}
                title="Upload from RSS Feed"
                onClick={handleOpenModal}
              />
              <Card
                imgSrc={circleImg}
                title="Upload Media or Text"
                onClick={handleOpenModal}
              />
            </div>
            <div className={styles.widgetBox}>
              <p>All files are processed! Your widget is ready to go!</p>
              <button className={styles.tryButton}>Try it out!</button>
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Upload Date & Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.uploadDateTime}</td>
                      <td>{item.status}</td>
                      <td className={styles.actionButtons}>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEditItem(index)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDeleteItem(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>This {projectName} Created on {new Date(project.creationTime).toLocaleString()}</p>
          </>
        )}
      </main>
      {showModal && (
        <UploadModal onClose={handleCloseModal} onSave={handleSaveUpload} />
      )}
    </div>
  );
};

export default ProjectDetails;
