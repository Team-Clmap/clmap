import { DataSource } from "typeorm";
import { Member } from "../app/api/entity/member";
import { Profile } from "../app/api/entity/profile";
import { Membership } from "../app/api/entity/membership";
import { Title } from "../app/api/entity/title";
import { MemberTitle } from "../app/api/entity/memberTitle";
import { Center } from "../app/api/entity/center";
import dotenv from 'dotenv';
import 'reflect-metadata';
import { CenterReview } from "@/app/api/entity/centerReview";
import { CenterReviewImage } from "@/app/api/entity/centerReviewImage";
import { Expectation } from "@/app/api/entity/expectation";
import { FavoritesCenter } from "@/app/api/entity/favoritesCenter";
import { ProblemReview } from "@/app/api/entity/problemReview";
import { ProblemReviewImage } from "@/app/api/entity/problemReviewImage";
import { Record } from "@/app/api/entity/record";
import { RecordImage } from "@/app/api/entity/recordImage";
import { TryRecord } from "@/app/api/entity/tryRecord";
import { Visit } from "@/app/api/entity/visit";

dotenv.config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  synchronize: false,
  timezone: 'Z',
  logging: ['query', 'error'],
  entities: [
    Member,
    Profile, 
    Membership, 
    Title, 
    MemberTitle, 
    Center, 
    CenterReview, 
    CenterReviewImage, 
    Expectation, 
    FavoritesCenter, 
    ProblemReview, 
    ProblemReviewImage,
    Record,
    RecordImage,
    TryRecord,
    Visit
  ],
  subscribers: [],
  migrations: ['src/database/migrations/*.ts'], // 마이그레이션 파일 위치
  migrationsTableName: 'migrations',
});

export default AppDataSource;