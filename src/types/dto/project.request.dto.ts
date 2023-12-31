import { EProjectInvitationStatus, EProjectRole } from "../../enums/entity-enums";
import { TSort } from "./common";

export interface IProjectUserReq {
  id: string;
  role: EProjectRole;
  status?: EProjectInvitationStatus;
}
export interface IProjectCreateReq {
  title: string;
  description?: string;
  projectUsers: IProjectUserReq[];
}

export interface IProjectListReq {
  limit: number;
  page: number;
  orderBy: string;
  sort: TSort;
}

export interface IProjectInviteReq {
  projectId: string;
  userId: string;
  role: EProjectRole;
}

export interface IInvitationUpdateReq {
  invitationId: string;
  isAccept: boolean;
}

export interface IColumnCreateReq {
  title: string;
}

export interface IColumnUpdateReq {
  title: string;
  index: number;
}

export interface ITaskCreateReq {
  title: string;
  description: string;
  dueDate?: Date;
  startDate?: Date;
  assigneeId?: string;
}

export interface ITaskUpdateReq {
  title: string;
  description: string;
  dueDate?: Date;
  startDate?: Date;
  assigneeId?: string;
  index: number;
  sourceColumnId: string;
  targetColumnId: string;
}

