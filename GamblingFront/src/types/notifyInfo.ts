export type NotifyInfo = {
  id: number;

  title: string;
  createdAt: string;
};

export type NotifyInfoContent = {
  id: number;
  agentCode: string;
  UserCode: string;
  title: string;
  content: string;
  isRead: boolean;
  isPartner: boolean;
  registerId: string;
  createdAt: string;
};
