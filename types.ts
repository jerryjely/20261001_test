
export type PermissionType = 'READ' | 'CREATE' | 'UPDATE' | 'DELETE';

export interface MenuPermission {
  READ: boolean;
  CREATE: boolean;
  UPDATE: boolean;
  DELETE: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  depth: 1 | 2 | 3 | 4;
  children?: MenuItem[];
  permissions: MenuPermission;
}

export interface PermissionPreset {
  id: string;
  name: string;
  description: string;
  defaultPermissions: Record<string, MenuPermission>; // menuId -> permission
}

export interface AdminInfo {
  userId: string;
  userName: string;
  department: string;
  presetId: string;
}
