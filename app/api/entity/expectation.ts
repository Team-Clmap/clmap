import { Entity, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member";
import { Center } from "./center";

@Entity({name:'expectation'})
export class Expectation {
  @PrimaryGeneratedColumn("increment")
  id?: number;    

  @ManyToOne(() => Member)
  member?: Member;

  @ManyToOne(() => Center)
  center?: Center;
}