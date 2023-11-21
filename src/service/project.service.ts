import { Request } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entity/user.entity"
import { Project } from "../entity/project.entity"
import { BadRequestError } from "../core/error.response"
import { In } from "typeorm"
import { Columns } from "../entity/column.entity"

class ProjectService {
  static createProject = async (user: any, project: any) => {
    const userRepository = AppDataSource.getRepository(User)
    const projectRepository = AppDataSource.getRepository(Project)

    const currentUser = await userRepository.findOneBy({ userID: user.userID })
    if (!currentUser) {
      throw new BadRequestError("User not found!")
    }

    const newProject = projectRepository.create({
      title: project.title,
      users: [currentUser],
    })
    const saveProject = await projectRepository.save(newProject)

    const projectCreated = {
      projectID: saveProject.projectID,
      title: saveProject.title,
      created_at: saveProject.created_at,
    }

    if (!projectCreated) {
      throw new BadRequestError("Project not created!")
    }
    return projectCreated
  }

  static getAllProjectByUserID = async (user: any) => {
    const projectRepository = AppDataSource.getRepository(Project)

    const projects = await projectRepository
      .createQueryBuilder("project")
      .select(["project.projectID", "project.title"]) // Chọn các trường bạn muốn
      .leftJoin("project.users", "user")
      .where("user.userID = :userID", { userID: user.userID })
      .getMany()
    if (!projects) {
      throw new BadRequestError("Project not found")
    }
    return projects
  }

  static addUserToProject = async (req: Request) => {
    const { projectID, userIDs } = req.body
    const projectRepository = AppDataSource.getRepository(Project)
    const userRepository = AppDataSource.getRepository(User)

    const project = await projectRepository.findOneBy({
      projectID: projectID,
    })
    if (!project) {
      throw new BadRequestError("Project not found!")
    }
    const users = await userRepository.find({
      where: { userID: In(userIDs) },
    })
    if (!users) {
      throw new BadRequestError("Add users failed ")
    }
    console.log(project.users)

    // project.users = [...project.users, ...users]
    project.users.push(...users)
    await projectRepository.save(project)

    const updatedProject = await projectRepository
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.users", "user")
      .select([
        "project.projectID",
        "project.title",
        "user.userID",
        "user.userName",
        "user.email",
      ])
      .where("project.projectID = :projectID", { projectID })
      .getOne()

    if (!updatedProject) {
      throw new BadRequestError("Error getting user list after adding!")
    }

    return updatedProject
  }

  static addColumnToProject = async (columns: any) => {
    const columnRepository = AppDataSource.getRepository(Columns)
    const projectRepository = AppDataSource.getRepository(Project)
    const project = await projectRepository.findOneBy({
      projectID: columns.projectID,
    })
    if (!project) {
      throw new BadRequestError("Project not found!")
    }
    const column = await columnRepository.save({
      title: columns.title,
      index: columns.index,
      project: project,
    })
    if (!column) {
      throw new BadRequestError("Add column failed!")
    }
    const columnadded = await columnRepository
      .createQueryBuilder("columns")
      .select(["columns.columnID", "columns.title", "columns.index"])
      .where("columns.columnID = :columnID", { columnID: column.columnID })
      .getOne()
    if (!columnadded) {
      throw new BadRequestError("Add column failed!")
    }
    return columnadded
  }
}
export default ProjectService
