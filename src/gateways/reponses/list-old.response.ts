export interface ListOldResponse {
  items: ListOldItem[];
  timestamp: number;
}

export interface ListOldItem {
  createdAt: Date;
  id: number;
  image: string;
  read: boolean;
  teamName: string;
}
