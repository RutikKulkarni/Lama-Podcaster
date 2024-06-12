// export const createProject = (user, projectName) => {
//   const projects = JSON.parse(localStorage.getItem(user)) || [];
//   const newProject = {
//     name: projectName,
//     episodeName: "Episode 1",
//     creationTime: new Date().toISOString(),
//   };
//   const updatedProjects = [...projects, newProject];
//   localStorage.setItem(user, JSON.stringify(updatedProjects));
//   return updatedProjects;
// };


import axios from 'axios';

export const createProject = async (user, projectName) => {
  try {
    const response = await axios.post('https://lama-podcaster.onrender.com/projects', {
      userId: user,
      projectName,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};
