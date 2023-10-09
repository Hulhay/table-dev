export interface IDataSourceBasic {
  id: number | string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  createdBy: string;
  domain: string;
  [key: string]: any;
}
