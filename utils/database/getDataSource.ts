import { DataSource } from "typeorm";
import AppDataSource from "./db";

let dataSource: DataSource | undefined;

const getDataSource = async ()=> {
  if (!dataSource) {
    dataSource = AppDataSource;
    console.log(`create DataSource`);
    await dataSource.initialize().then(() => {
      console.log(`connect complete`);
    });
  }
  return dataSource;
};

export default getDataSource;