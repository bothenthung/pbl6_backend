import { Request } from "express";
import { BadRequestError, NotFoundError } from "../core/error.response";
import { AppDataSource } from "../data-source";
import { Columns } from "../entity/column.entity";
import { Project } from "../entity/project.entity";
import { Task } from "../entity/task.entity";
import { User } from "../entity/user.entity";
import { UserProject } from "../entity/userProject.entity";
import { CheckProjectExists, checkUserInProject } from "../utils/project.utils";
import { UserEntity } from "../entities/User.entity";
import { IColumnCreateReq, IInvitationUpdateReq, IProjectCreateReq, IProjectInviteReq, IProjectUserReq } from "../types/dto/project.request.dto";
import { ProjectEntity } from "../entities/Project.entity";
import { ProjectUserEntity } from "../entities/ProjectUser.entity";
import { EProjectInvitationStatus, EProjectRole } from "../enums/entity-enums";
import QueryString from "qs";
import { parseQuery } from "../utils/pagination";
import { Not } from "typeorm";
import { ColumnEntity } from "../entities/Column.entity";

class ProjectService {
  async create(owner: UserEntity, body: IProjectCreateReq) {
    const projectOwner = await UserEntity.findOneBy({ id: owner.id });

    const newProject = new ProjectEntity();
    newProject.title = body.title;
    newProject.description = body.description;
    newProject.roles = [];
    await newProject.save();

    if (projectOwner) {
      const projectUsers: IProjectUserReq[] = [
        ...body.projectUsers,
        {
          id: projectOwner.id,
          role: EProjectRole.OWNER,
          status: EProjectInvitationStatus.ACCEPTED
        }
      ];

      await this.addUsersToProjectAndSave(projectUsers, newProject);
    } else {
      await newProject.remove();
    }

    return undefined;
  }

  async getAll(user: UserEntity, query: QueryString.ParsedQs) {
    const projectUser = await UserEntity.findOneBy({ id: user.id });

    if (!projectUser) throw new NotFoundError();

    const projects = await ProjectEntity.find(parseQuery<ProjectEntity>(query, {
      where: {
        roles: {
          userId: user.id
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        updatedAt: true,
        createdAt: true,
      },
      withDeleted: false
    }));
    return projects;
  }

  async get(user: UserEntity, params: QueryString.ParsedQs) {
    if (!params.id) throw new BadRequestError();
    const project = await ProjectEntity.getDetailById(user.id, params.id as string);
    if (!project) throw new NotFoundError();

    return project;
  }

  async invite(user: UserEntity, body: IProjectInviteReq) {
    const project = await ProjectEntity.findOne({
      where: {
        id: body.projectId,
        roles: {
          userId: user.id
        }
      },
      withDeleted: false
    });

    const invitedUser = await UserEntity.findOneBy({ id: body.userId });

    const oldProjectUsers = await ProjectUserEntity.findOne({
      where: {
        userId: body.userId,
        status: Not(EProjectInvitationStatus.REJECT)
      }
    });

    if (oldProjectUsers) return {
      message: "user has been invited"
    };

    if (!project || !invitedUser) throw new NotFoundError();

    const newProjectUser = new ProjectUserEntity();
    newProjectUser.user = invitedUser;
    newProjectUser.project = project;
    newProjectUser.roleInvited = body.role;

    newProjectUser.save();

    return undefined;
  }

  async getAllInvitation(user: UserEntity, query: QueryString.ParsedQs) {
    const projectUsers = await ProjectUserEntity.find(parseQuery<ProjectUserEntity>(query, {
      where: {
        userId: user.id
      },
      select: {
        id: true,
        roleInvited: true,
        status: true,
        project: {
          id: true,
          title: true,
          description: true
        },
      },
      relations: {
        project: true
      },
      withDeleted: false
    }));

    return projectUsers;
  }

  async acceptInvitation(user: UserEntity, body: IInvitationUpdateReq) {
    const projectUser = await ProjectUserEntity.findOneBy({
      id: body.invitationId,
      userId: user.id
    });

    if (!projectUser) throw new NotFoundError();

    if (body.isAccept) {
      projectUser.role = projectUser.roleInvited;
      projectUser.status = EProjectInvitationStatus.ACCEPTED;
    }

    if (body.isAccept === false) {
      projectUser.status = EProjectInvitationStatus.REJECT;
      projectUser.softRemove();
    }

    projectUser.save();

    return undefined;
  }

  async createColumn(params: QueryString.ParsedQs, body: IColumnCreateReq) {
    if (!params.projectId) throw new BadRequestError();

    const project = await ProjectEntity.findOneBy({ id: params.projectId as string });

    if (!project) throw new NotFoundError();

    const columns = await ColumnEntity.findBy({ projectId: project.id });

    const column = new ColumnEntity();
    column.title = body.title;
    column.index = columns.length;
    column.project = project;
    await column.save();

    return undefined;
  }

  async getAllColumns(params: QueryString.ParsedQs) {
    if (!params.projectId) throw new BadRequestError();

    const project = await ProjectEntity.findOneBy({ id: params.projectId as string });

    if (!project) throw new NotFoundError();

    const columns = await ColumnEntity.findBy({ projectId: project.id });

    return columns;
  }

  async addUsersToProjectAndSave(projectUsers: IProjectUserReq[], project: ProjectEntity) {
    const roles: ProjectUserEntity[] = [];

    for (const reqUser of projectUsers) {
      const user = await UserEntity.findOneBy({ id: reqUser.id });

      if (user) {
        const newProjectUser = new ProjectUserEntity();
        newProjectUser.user = user;
        newProjectUser.project = project;
        newProjectUser.roleInvited = reqUser.role;

        if (reqUser.status === EProjectInvitationStatus.ACCEPTED) {
          newProjectUser.status = EProjectInvitationStatus.ACCEPTED;
          newProjectUser.role = reqUser.role;
        }

        await newProjectUser.save();

        roles.push(newProjectUser);
      }
    }
    project.roles = [...project.roles, ...roles];

    await project.save();
  }

  /** @deprecated */
  static addProject = async (user: any, project: any) => {
    const projectRepository = AppDataSource.getRepository(Project);
    const userProjectRepository = AppDataSource.getRepository(UserProject);

    const newProject = projectRepository.create({
      title: project.title,
      users: [user],
    });

    const savedProject = await projectRepository.save(newProject);

    const userProject = userProjectRepository.create({
      userID: user.userID,
      projectID: savedProject.projectID,
    });

    await userProjectRepository.save(userProject);

    return savedProject;
  };

  /** @deprecated */
  static deletePoject = async (projectID: string, userID: string) => {
    const user = await checkUserInProject(projectID, userID);
    if (!user) {
      throw new BadRequestError("User does not belong to project!");
    }
    await AppDataSource.getRepository(Project)
      .createQueryBuilder("project")
      .where("projectID = :projectID", { projectID: projectID })
      .delete()
      .execute();
    return {};
  };

  /** @deprecated */
  static getAllProjectByUserID = async (user: any) => {
    const projectRepository = AppDataSource.getRepository(Project);
    const projects = await projectRepository
      .createQueryBuilder("project")
      .select([
        "project.projectID",
        "project.title",
        "project.description",
        "project.created_at",
      ])
      .innerJoin(UserProject, "userProject", "userProject.projectID = project.projectID")
      .innerJoin(User, "user", "user.userID = userProject.userID")
      .where("user.userID = :userID", { userID: user.userID })
      .getMany();

    if (!projects) {
      throw new BadRequestError("Project not found!");
    }
    return projects;
  };

  static getProjectDetails = async (userID: string, req: Request) => {
    const user = await checkUserInProject(req.body.projectID, userID);
    if (!user) {
      throw new BadRequestError("User does not belong to project!");
    }

    const project = await AppDataSource.getRepository(Project)
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.columns", "columns")
      .leftJoinAndSelect("columns.tasks", "tasks")
      .leftJoinAndSelect("project.users", "users")
      .select([
        "project.projectID",
        "project.title",
        "project.description",
        "project.created_at",
        "columns.columnID",
        "columns.title",
        "columns.index",
        "tasks.taskID",
        "tasks.title",
        "tasks.description",
        "tasks.index",
        "tasks.deadline_date",
        "users.userID",
        "users.userName",
        "users.email",
      ])
      .where("project.projectID = :projectID", {
        projectID: req.body.projectID,
      })
      .orderBy({
        "columns.index": "ASC",
        "tasks.index": "ASC",
      })
      .getOne();

    if (!project) {
      throw new BadRequestError("Project not found!");
    }
    return project;
  };

  static addUserToProject = async (req: Request) => {
    const { projectID, email } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const projectRepository = AppDataSource.getRepository(Project);
    const userProjectRepository = AppDataSource.getRepository(UserProject);

    const project = await projectRepository.findOneBy({
      projectID: projectID,
    });
    if (!project) throw new BadRequestError("Project not found!");

    const user = await userRepository.findOneBy({ email: email });
    if (!user) throw new BadRequestError("User is not registered!");


    const userProject = userProjectRepository.create({
      userID: user.userID,
      projectID: project.projectID,
    });

    const addedUserToProject = await userProjectRepository.save(userProject);
    return addedUserToProject;
    // project.users.push(users)
    // await projectRepository.save(project)

    // const updatedProject = await projectRepository
    //   .createQueryBuilder("project")
    //   .leftJoinAndSelect("project.users", "user")
    //   .select([
    //     "project.projectID",
    //     "project.title",
    //     "user.userID",
    //     "user.userName",
    //     "user.email",
    //   ])
    //   .where("project.projectID = :projectID", { projectID })
    //   .getOne()
    // if (!updatedProject) {
    //   throw new BadRequestError("Error getting user list after adding!")
    // }
  };

  static addColumnToProject = async (reqBody: any) => {
    const columnRepository = AppDataSource.getRepository(Columns);
    const existingColumn = await columnRepository
      .createQueryBuilder("columns")
      .where("columns.project= :projectID", { projectID: reqBody.projectID })
      .andWhere("columns.index = :index", { index: reqBody.index })
      .getOne();
    if (existingColumn) {
      throw new BadRequestError(
        "A column with the same index already exists or Project not found!"
      );
    }

    const project = await CheckProjectExists(reqBody.projectID);
    if (!project) {
      throw new BadRequestError("Project not found!");
    }

    const column = await columnRepository.save({
      title: reqBody.title,
      index: reqBody.index,
      project: project,
    });
    if (!column) {
      throw new BadRequestError("Add column failed!");
    }

    const columnadded = await columnRepository
      .createQueryBuilder("columns")
      .select(["columns.columnID", "columns.title", "columns.index"])
      .where("columns.columnID = :columnID", { columnID: column.columnID })
      .getOne();
    if (!columnadded) {
      throw new BadRequestError("Add column failed!");
    }
    return columnadded;
  };

  static getAllColumn = async (projectID: string) => {
    const project = await AppDataSource.getRepository(Project)
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.columns", "column")
      .where("project.projectID = :projectID", {
        projectID: projectID,
      })
      .orderBy("column.index", "ASC")
      .getOne();
    if (!project) {
      throw new BadRequestError("Columns not found!");
    }
    return project;
  };

  static deleteColumn = async (req: Request, columnID: string) => {
    const projectID = req.body.projectID;

    const user = await checkUserInProject(req.body.projectID, req.user.userID);
    if (!user) {
      throw new BadRequestError("User does not belong to project!");
    }
    const columnRepository = AppDataSource.getRepository(Columns);
    const existingColumn = await columnRepository
      .createQueryBuilder("columns")
      .where("columns.project = :projectID", { projectID: req.body.projectID })
      .andWhere("columns.columnID = :columnID", { columnID: columnID })
      .getOne();
    if (!existingColumn) {
      throw new BadRequestError(
        "ColumnID not found or Column does not belong to the project "
      );
    }

    await columnRepository
      .createQueryBuilder()
      .update(Columns)
      .set({ index: () => "`index` - 1" })
      .where("`index` > :columnIndex", { columnIndex: existingColumn.index })
      .andWhere("projectID = :projectID", { projectID: projectID })
      .execute();

    await AppDataSource.getRepository(Task)
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where("columnID = :columnID", { columnID: columnID })
      .execute();

    await columnRepository
      .createQueryBuilder()
      .delete()
      .from(Columns)
      .where("columnID = :columnID", { columnID: columnID })
      .execute();

    return {};
  };

  static changeIndexColumn = async (req: Request) => {
    const columnRepository = await AppDataSource.getRepository(Columns);
    const { projectID, columnID, newIndex, oldIndex } = req.body;
    const currentUser = await checkUserInProject(projectID, req.user.userID);
    if (!currentUser) {
      throw new BadRequestError("User is not in the project!");
    }
    const column = await AppDataSource.getRepository(Columns).findOneBy({
      columnID: columnID,
    });
    if (column?.index != oldIndex) {
      throw new BadRequestError("The index of the column is incorrect!");
    }
    if (!column) {
      throw new BadRequestError("Column not found!");
    }
    if (oldIndex < newIndex) {
      await columnRepository
        .createQueryBuilder()
        .update(Columns)
        .set({ index: () => "`index` - 1" })
        .where(
          "projectID = :projectID AND index >= :oldIndex AND index <= :newIndex",
          { projectID, oldIndex, newIndex }
        )
        .execute();
      await columnRepository
        .createQueryBuilder()
        .update(Columns)
        .set({ index: newIndex })
        .where("columnID = :columnID AND index = :oldIndex - 1", {
          columnID,
          oldIndex,
        })
        .execute();
    } else if (oldIndex > newIndex) {
      await columnRepository
        .createQueryBuilder()
        .update(Columns)
        .set({ index: () => "`index` + 1" })
        .where(
          "projectID = :projectID AND index >= :newIndex AND index <= :oldIndex",
          { projectID, newIndex, oldIndex }
        )
        .execute();
      await columnRepository
        .createQueryBuilder()
        .update(Columns)
        .set({ index: newIndex })
        .where("columnID = :columnID AND index = :oldIndex + 1", {
          columnID,
          oldIndex,
        })
        .execute();
    }

    const project = await this.getAllColumn(projectID);
    return project;
  };

  static addTask = async (req: Request) => {
    const { title, description, deadline_date, index, columnID } = req.body;
    const deadline_Date = new Date(deadline_date);
    const taskRepository = AppDataSource.getRepository(Task);

    const existingTask = await taskRepository
      .createQueryBuilder("task")
      .where("task.column=:columnID", { columnID: columnID })
      .andWhere("task.index = :index", { index: index })
      .getOne();
    if (existingTask) {
      throw new BadRequestError("Index already exists in the column");
    }

    const column = await AppDataSource.getRepository(Columns).findOneBy({
      columnID: columnID,
    });
    if (!column) {
      throw new BadRequestError("Column not found!");
    }

    const newTask = taskRepository.create({
      title: title,
      description: description,
      index: index,
      deadline_date: deadline_Date,
      column: column,
      user: req.user,
    });
    const saveTask = await taskRepository.save(newTask);
    const savedTask = {
      title: saveTask.title,
      description: saveTask.description,
      index: saveTask.index,
      deadline_date: saveTask.deadline_date,
      column: saveTask.column,
    };

    return savedTask;
  };

  static changeIndexTask = async (req: Request) => {
    const { taskID, sourceColumnID, targetColumnID, newIndex, oldIndex } =
      req.body;
    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository
      .createQueryBuilder("task")
      .where("task.column=:columnID", { columnID: sourceColumnID })
      .andWhere("task.taskID = :taskID", { taskID: taskID })
      .andWhere("task.index = :oldIndex", { oldIndex: oldIndex })
      .getOne();
    if (!task) {
      throw new BadRequestError("Task not found or Index is incorrect!");
    }

    if (targetColumnID == sourceColumnID) {
      if (oldIndex > newIndex) {
        await taskRepository
          .createQueryBuilder()
          .update(Task)
          .set({ index: () => "`index` + 1" })
          .where("`index` >= :newIndex", { newIndex })
          .andWhere("`index` < :oldIndex", { oldIndex })
          .andWhere("columnID = :sourceColumnID", { sourceColumnID })
          .execute();
      } else if (oldIndex < newIndex) {
        await taskRepository
          .createQueryBuilder()
          .update(Task)
          .set({ index: () => "`index` - 1" })
          .where("`index` <= :newIndex", { newIndex })
          .andWhere("`index` > :oldIndex", { oldIndex })
          .andWhere("columnID = :sourceColumnID", { sourceColumnID })
          .execute();
      }

      await taskRepository
        .createQueryBuilder()
        .update(Task)
        .set({ index: newIndex })
        .where("taskID = :taskID AND index = :oldIndex", {
          taskID: task.taskID,
          oldIndex,
        })
        .execute();
    } else {
      await taskRepository
        .createQueryBuilder()
        .update(Task)
        .set({ index: () => "`index` - 1" })
        .where("`index` > :oldIndex", { oldIndex: oldIndex })
        .andWhere("columnID = :sourceColumnID", { sourceColumnID })
        .execute();

      await taskRepository
        .createQueryBuilder()
        .update(Task)
        .set({ index: () => "`index` + 1" })
        .where("`index` >= :newIndex", { newIndex })
        .andWhere("columnID = :targetColumnID", { targetColumnID })
        .execute();

      await taskRepository
        .createQueryBuilder()
        .update(Task)
        .set({ index: newIndex, column: targetColumnID })
        .where("taskID = :taskID", {
          taskID: task.taskID,
        })
        .execute();
    }

    return {};
  };

  static getAllTask = async (req: Request) => {
    const { columnID } = req.body;

    const column = await AppDataSource.getRepository(Columns)
      .createQueryBuilder("columns")
      .leftJoinAndSelect("columns.tasks", "task")
      .where("columns.columnID = :columnID", {
        columnID: columnID,
      })
      .orderBy("task.index", "ASC")
      .getOne();
    if (!column) {
      throw new BadRequestError("Column not found!");
    }

    return column;
  };

  static deleteTaskByTaskID = async (req: Request, taskID: string) => {
    const taskRepository = AppDataSource.getRepository(Task);
    const checkUserInProject = await taskRepository
      .createQueryBuilder("task")
      .leftJoinAndSelect("task.column", "column")
      .leftJoinAndSelect("column.project", "project")
      .leftJoinAndSelect("project.users", "user")
      .where("task.taskID = :taskID", { taskID: taskID })
      .andWhere("user.userID = :userID", {
        userID: req.user.userID,
      })
      .getOne();
    if (!checkUserInProject) {
      throw new BadRequestError("User not belong to project or Task not found!");
    }

    const taskDelete = await taskRepository
      .createQueryBuilder("task")
      .where("task.taskID = :taskID", { taskID })
      .getOne();
    if (!taskDelete) {
      throw new BadRequestError("Task not found!");
    }
    await taskRepository
      .createQueryBuilder()
      .update(Task)
      .set({ index: () => "`index` - 1" })
      .where("`index` > :taskIndex", { taskIndex: taskDelete.index })
      .execute();

    await taskRepository
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where("taskID = :taskID", { taskID })
      .execute();
    return {};
  };
}

export default ProjectService;
