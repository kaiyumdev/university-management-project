import { IManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

const createDepartment = async (
  payload: IManagementDepartment,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

export const ManagementDepartmentService = {
  createDepartment,
};
