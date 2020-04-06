import IBaseModel from './interfaces/IBaseModel';
import Db from '../../../config/db';
export default class BaseModel implements IBaseModel {
	DB: any;
	constructor() {
		this.DB = Db;
	}
}
