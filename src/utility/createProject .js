export const createProject = (user, projectName) => {
  const projects = JSON.parse(localStorage.getItem(user)) || [];
  const newProject = {
    name: projectName,
    episodeName: "Episode 1",
    creationTime: new Date().toISOString(),
  };
  const updatedProjects = [...projects, newProject];
  localStorage.setItem(user, JSON.stringify(updatedProjects));
  return updatedProjects;
};
