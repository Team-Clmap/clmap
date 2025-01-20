import { DataSource } from "typeorm";
import { Member } from "@/app/api/entity/member";
import { Profile } from "@/app/api/entity/profile";

import 'reflect-metadata';

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  synchronize: false,
  timezone: 'Z',
  logging: ['query', 'error'],
  entities: [Member, Profile],
  subscribers: [],
  migrations: [],
});

let dataSource: DataSource | undefined;

export const getDataSource = async ()=> {
  if (!dataSource) {
    dataSource = AppDataSource;
    console.log(`create DataSource`);
    await dataSource.initialize().then(() => {
      console.log(`connect complete`);
    });
  }
  return dataSource;
};