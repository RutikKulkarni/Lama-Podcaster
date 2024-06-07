export const createProject = (user, projectName) => {
  const projects = JSON.parse(localStorage.getItem(user)) || [];
  const updatedProjects = [...projects, projectName];
  localStorage.setItem(user, JSON.stringify(updatedProjects));
  return updatedProjects;
};
