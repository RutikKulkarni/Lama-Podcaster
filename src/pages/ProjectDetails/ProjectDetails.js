import React, { useEffect, useState } from "react";
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
import axios from "axios";

const ProjectDetails = ({ user }) => {
  const { projectName } = useParams();
  const [storedProjects, setStoredProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [uploadData, setUploadData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const fetchUserProjects = async (username) => {
    try {
      let response = await axios.get(
        `https://lama-podcaster.onrender.com/projects/${username}`
      );
      setStoredProjects(response.data);
    } catch (err) {
      console.error("Error fetching projects:", err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserProjects(user);
    }
  }, [user]);

  useEffect(() => {
    const project = storedProjects.find((p) => p.name === projectName);
    if (project) {
      setUploadData(project.uploads || []);
    }
  }, [storedProjects, projectName]);

  useEffect(() => {
    if (storedProjects.length && projectName) {
      const project = storedProjects.find((p) => p.name === projectName);
      if (project) {
        const updatedProjects = storedProjects.map((p) =>
          p.name === projectName ? { ...p, uploads: uploadData } : p
        );
        localStorage.setItem(user, JSON.stringify(updatedProjects));
      }
    }
  }, [uploadData, storedProjects, projectName, user]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveUpload = async (name, description) => {
    try {
      const response = await axios.put(
        `https://lama-podcaster.onrender.com/projects/${project._id}/upload`,
        { name, description }
      );
      setUploadData(response.data.uploads);
    } catch (error) {
      console.error("Error saving upload:", error);
    }
  };

  // const handleDeleteItem = (index) => {
  //   const updatedUploadData = [...uploadData];
  //   updatedUploadData.splice(index, 1);
  //   setUploadData(updatedUploadData);
  // };
  const handleDeleteItem = async (index) => {
    const updatedUploadData = [...uploadData];
    const uploadItem = updatedUploadData[index];
    try {
      await axios.delete(
        `https://lama-podcaster.onrender.com/projects/${project._id}/upload/${uploadItem._id}`,
        { headers: { "Content-Type": "application/json" } }
      );
      updatedUploadData.splice(index, 1);
      setUploadData(updatedUploadData);
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
    setIsEditing(true);
  };

  const handleSaveEdit = async (newDescription) => {
    try {
      const response = await axios.put(
        `https://lama-podcaster.onrender.com/projects/${project._id}/upload/${uploadData[editIndex]._id}/edit`,
        { newDescription }
      );
      setUploadData(response.data.uploads);
      setIsEditing(false);
      setEditIndex(null);
    } catch (error) {
      console.error("Error saving edit:", error);
    }
  };

  if (
    !storedProjects.length ||
    !storedProjects.find((p) => p.name === projectName)
  ) {
    return <div>Project not found</div>;
  }

  const project = storedProjects.find((p) => p.name === projectName);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-GB", options);
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link> / <Link to="/projects">Projects</Link> /{" "}
          {projectName}
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
                      <td>{formatDate(item.uploadDateTime)}</td>
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
            <p>
              This {projectName} was created on{" "}
              {new Date(project.creationTime).toLocaleString()}
            </p>
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
