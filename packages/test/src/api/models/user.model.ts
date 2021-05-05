import { Serializable, JsonProperty, deserialize } from 'typescript-json-serializer';
import request from 'src/utils/request';
import requestUrl from 'src/api/requestUrl';

@Serializable()
class UserModel {
  constructor() {
  }
  @JsonProperty() avatar: string;
  @JsonProperty() email:string;
  @JsonProperty() introduction: string;
  @JsonProperty() username:string;
  @JsonProperty() roles:string[];
  //======methods
  static async login(data): Promise<void> {
   await request.post(requestUrl.login, data)
  }
  static async logOut(): Promise<void> {
    await request.post(requestUrl.logout);
  }
  static async getUserInfo(params): Promise<UserModel> {
    const {data} = await request.get(requestUrl.getUserInfo, {
      params
    })
    return  deserialize<UserModel>(data, UserModel)
  }
  static async getUsers() {
    return request.get(requestUrl.getAllUser);
  }
  //======methods end
}
export default UserModel;
