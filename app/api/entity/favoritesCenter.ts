import { Entity, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member";
import { Center } from "./center";

@Entity({name:'favorites_center'})
export class FavoritesCenter {
  @PrimaryGeneratedColumn('increment')
  id?: number;    
    
  @ManyToOne(() => Member)
  member?: Member;

  @ManyToOne(() => Center)
  center?: Center;
}