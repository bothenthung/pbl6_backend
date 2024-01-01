export enum ENotificationType {
  TASK_ASSIGNED = "task-assigned",
  PROJECT_INVITATION = "project-invitation",
  PERMISSION_CHANGE = "permission-change",
  PROJECT_REMOVAL = "project-removal"
}

export enum EProjectRole {
  OWNER = "owner",
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest"
}

export enum EProjectInvitationStatus {
  ACCEPTED = 'accepted',
  WAITING = 'waiting',
  REJECT = 'reject',
}