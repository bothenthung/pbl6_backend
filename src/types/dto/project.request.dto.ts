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