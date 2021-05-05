import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { getToken, setToken, removeToken, setUsername, removeUsername, getUsername } from 'src/utils/cookies';
import { resetRouter } from 'src/router';
import {store} from 'src/store';
import { uid } from 'quasar'
import UserModel from 'src/api/models/user.model';
export interface IUserState {
  token: string;
  username: string;
  avatar: string;
  introduction: string;
  pageEditPermission: any[];
  pagePermissionId: any[];
  email: string;
  userInfo: any;
}
const name = 'user';
@Module({ dynamic: true, store, name})
class User extends VuexModule implements IUserState {
  public token = getToken() || '';
  public username = getUsername() || '';
  public roleId = getUsername() || '';
  public avatar = '';
  public introduction = '';
  public pageEditPermission: any[] = [];
  public pagePermissionId: any[] = [];
  public userList = [];
  public email = '';
  public userInfo = {};
  public loginLoading = false;
  @Mutation
  public SET_LOGIN_LOADING(status: boolean) {
    this.loginLoading = status;
  }
  @Mutation
  public SET_ROLEID(id: any) {
    this.roleId = id;
  }
  @Mutation
  public SET_PAGE_PERMISION_ID(arr: any) {
    this.pagePermissionId = arr;
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private SET_USERNAME(username: string) {
    this.username = username;
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar;
  }
  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction;
  }

  @Mutation
  private SET_PAGE_EDIT_PERMISSION(data: any) {
    this.pageEditPermission = data;
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email;
  }
  // 登录
  @Action({ rawError: true })
  public async Login(data: any) {
    const { username, password } = data;
    await UserModel.login({ username, password });
    const token = uid();
    setToken(token);
    setUsername(username);
    this.SET_TOKEN(token);
    this.SET_USERNAME(username);
    this.SET_ROLEID('1');
  }
  // 获取用户信息
  @Action({ rawError: true })
  public async getUserInfo() {
    const data = await  UserModel.getUserInfo({ username: this.username });
    const { avatar, email, introduction, username } = data;
    this.SET_AVATAR(avatar);
    this.SET_EMAIL(email);
    this.SET_INTRODUCTION(introduction);
    if (username === 'admin') {
      this.SET_PAGE_PERMISION_ID(['1']);
      this.SET_PAGE_EDIT_PERMISSION([{ modify: true, permissionId: '1' }]);
    } else {
      this.SET_PAGE_PERMISION_ID(['2']);
      this.SET_PAGE_EDIT_PERMISSION([
        { modify: true, permissionId: '1' },
        { modify: false, permissionId: '2' },
      ]);
    }
  }
  // 退出
  @Action({ rawError: true })
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!');
    }
    await UserModel.logOut();
    this.ResetToken();
  }
  // 重置cookie
  @Action({ rawError: true })
  public ResetToken() {
    removeUsername();
    removeToken();
    this.SET_TOKEN('');
    this.SET_PAGE_PERMISION_ID([]);
    this.SET_PAGE_EDIT_PERMISSION([]);
    this.SET_AVATAR('');
    this.SET_INTRODUCTION('');
    this.SET_EMAIL('');
    this.SET_USERNAME('');
    resetRouter();
  }
}

export const UserModule = getModule(User);
