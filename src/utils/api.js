/**   
 * api接口统一管理
 */
import { get, post } from './http';

//登录短信
export const smsLogin = p => post('v1/manage/sms/login', p);

//登录
export const login = p => post('/v1/manage/sysUser/login', p);


// 列表用户
export const listUser = p => get('/v1/manage/sysUser/list', p);

//分页获取所有的url数据
export const listUrl = p => get('/v1/manage/display/list', p);

//编辑url数据
export const updateUrl = p => post('/v1/manage/display/update', p);

//增加url数据
export const addUrl = p => post('/v1/manage/display/add', p);

//删除url数据
export const delUrl = p => post('/v1/manage/display/del', p);

// 产线讯息
export const line = p => get('/v1/manage/display/getLine', p);

export const MANAGERS = p => get('/v1/manage/sysUser/list', p);
export const info = p => get('/v1/manage/sysUser/info', p);
export const getMobileById = p => get('/v1/manage/sysUser/getMobileById', p);
export const getMobile = p => get('/v1/manage/sysUser/getMobile', p);
export const listALI = p => get('/v1/manage/sysUser/listALI', p);
export const UPDATE_MANAGER = p => post('/v1/manage/sysUser/update', p);
export const LOCK_MANAGER_PWD = p => post('/v1/manage/sysUser/lock', p);
export const ADD_MANAGER = p => post('/v1/manage/sysUser/add', p);
export const ASSIGN_ROLE = p => post('/v1/manage/sysUserRole/add', p);

export const ALL_MENUS = p => get('/v1/manage/sysRes/list', p);

export const ADD_CHILD_MENU = p => post('/v1/manage/sysRes/list', p);
export const ADD_ROOT_MENU = p => post('/v1/manage/sysRes/addParent', p);
export const UPDATE_MENU = p => post('/v1/manage/sysRes/update', p);
export const DELETE_MENU = p => post('/v1/manage/sysRes/delete', p);
export const LIST_BY_ROLE = p => get('/v1/manage/sysRes/listByRole', p);

export const ROLES = p => get('/v1/manage/sysRole/list', p);
export const UPDATE_ROLE = p => post('/v1/manage/sysRole/updateRes', p);
export const ADD_ROLE = p => post('/v1/manage/sysRole/add', p);
export const UPDATE_ROLE_STATE = p => post('/v1/manage/sysRole/updateState', p);
export const GET_MENUS_BY_ROLE = p => get('/v1/manage/sysRes/listRoleTree', p);
export const ASSIGN_PERMISSIONS = p => post('/v1/manage/sysRole/updateRes', p);



