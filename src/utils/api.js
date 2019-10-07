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
