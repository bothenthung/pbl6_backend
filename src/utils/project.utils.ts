import { BadRequestError } from "../core/error.response";
import { AppDataSource } from "../data-source";
import { Project } from "../entity/project.entity";
import { UserProject } from "../entity/userProject.entity";

export const checkUserInProject = async (projectID: string, userID: string) => {
  const userProjectRepository =AppDataSource.getRepository(UserProject);

  const userInProject = await userProjectRepository
    .createQueryBuilder("userProject")
    .where("userProject.userID = :userID AND userProject.projectID = :projectID", { userID, projectID })
    .getOne();

  return !!userInProject;
}

export const CheckProjectExists = async (projectID: string) => {
  const project = await AppDataSource.getRepository(Project)
    .createQueryBuilder("project")
    .where("project.projectID = :projectID", {
      projectID: projectID,
    })
    .getOne()

  if (!project) {
    throw new BadRequestError("Project not found!")
  }
  return project
}
