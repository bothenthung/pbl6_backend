import { BadRequestError } from "../core/error.response"
import { AppDataSource } from "../data-source"
import { Project } from "../entity/project.entity"

export const checkUserInProject = async (projectID: string, userID: string) => {
  const currentUser = await AppDataSource.getRepository(Project)
    .createQueryBuilder("project")
    .leftJoinAndSelect("project.users", "user")
    .where("project.projectID = :projectID", { projectID: projectID })
    .andWhere("user.userID = :userID", { userID: userID })
    .getOne()
  const isUserInProject = Boolean(currentUser)
  return isUserInProject
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
