"use strict";
const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migration1740397677865 {
    name = 'Migration1740397677865'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`member_title\` (\`id\` varchar(255) NOT NULL, \`visible\` int NOT NULL, \`memberId\` varchar(255) NULL, \`titleId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`center_review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`member_id\` varchar(255) NOT NULL, \`center_id\` int NOT NULL, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`memberId\` varchar(255) NULL, \`centerId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`center_review_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(100) NOT NULL, \`center_review_id\` int NOT NULL, \`centerReviewId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`favorites_center\` (\`id\` int NOT NULL AUTO_INCREMENT, \`memberId\` varchar(255) NULL, \`centerId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`problem_review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sector\` varchar(10) NOT NULL, \`member_id\` varchar(255) NOT NULL, \`center_id\` int NOT NULL, \`actual_level\` varchar(10) NOT NULL, \`expected_v_level\` varchar(10) NOT NULL, \`expected_color_level\` varchar(10) NOT NULL, \`content\` text NOT NULL, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`memberId\` varchar(255) NULL, \`centerId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`problem_review_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(100) NOT NULL, \`problem_review_id\` int NOT NULL, \`problemReviewId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`record_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(100) NOT NULL, \`record_id\` int NOT NULL, \`recordId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`try_record\` (\`id\` int NOT NULL AUTO_INCREMENT, \`v_level\` varchar(255) NOT NULL, \`record_id\` int NOT NULL, \`color_level\` varchar(255) NOT NULL, \`try_count\` int NOT NULL, \`complete_count\` int NOT NULL, \`recordId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`visit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`center_id\` int NOT NULL, \`member_id\` varchar(255) NOT NULL, \`start_time\` datetime NOT NULL, \`memberId\` varchar(255) NULL, \`centerId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`member_title\` ADD CONSTRAINT \`FK_1ea4886403484cb8053d46d87d0\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`member_title\` ADD CONSTRAINT \`FK_6d42ae53255332e7aa0872f9c60\` FOREIGN KEY (\`titleId\`) REFERENCES \`title\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`center_review\` ADD CONSTRAINT \`FK_f82d98bdac5be2c791980aa8842\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`center_review\` ADD CONSTRAINT \`FK_374ac570b1c72443dedbd029864\` FOREIGN KEY (\`centerId\`) REFERENCES \`center\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`center_review_image\` ADD CONSTRAINT \`FK_10941517f8b0cb6e37a11f7a149\` FOREIGN KEY (\`centerReviewId\`) REFERENCES \`center_review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorites_center\` ADD CONSTRAINT \`FK_d5daec99770ae7c2861dfd22903\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorites_center\` ADD CONSTRAINT \`FK_ef2b617854e6e857e8c552b3bbd\` FOREIGN KEY (\`centerId\`) REFERENCES \`center\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`problem_review\` ADD CONSTRAINT \`FK_249f103b99522201a797f186f63\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`problem_review\` ADD CONSTRAINT \`FK_99fdf43873adfc518d4620429bc\` FOREIGN KEY (\`centerId\`) REFERENCES \`center\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`problem_review_image\` ADD CONSTRAINT \`FK_cd1d959af280ef7adab33f65690\` FOREIGN KEY (\`problemReviewId\`) REFERENCES \`problem_review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`record_image\` ADD CONSTRAINT \`FK_d2520e5877f386dfd84af4303d2\` FOREIGN KEY (\`recordId\`) REFERENCES \`record\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`try_record\` ADD CONSTRAINT \`FK_4c6260933366e7de550664bbe91\` FOREIGN KEY (\`recordId\`) REFERENCES \`record\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`visit\` ADD CONSTRAINT \`FK_9b02ee4c619a401fa6f124d96c5\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`visit\` ADD CONSTRAINT \`FK_58b1e0b017a46ba8674495c52a0\` FOREIGN KEY (\`centerId\`) REFERENCES \`center\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`visit\` DROP FOREIGN KEY \`FK_58b1e0b017a46ba8674495c52a0\``);
        await queryRunner.query(`ALTER TABLE \`visit\` DROP FOREIGN KEY \`FK_9b02ee4c619a401fa6f124d96c5\``);
        await queryRunner.query(`ALTER TABLE \`try_record\` DROP FOREIGN KEY \`FK_4c6260933366e7de550664bbe91\``);
        await queryRunner.query(`ALTER TABLE \`record_image\` DROP FOREIGN KEY \`FK_d2520e5877f386dfd84af4303d2\``);
        await queryRunner.query(`ALTER TABLE \`problem_review_image\` DROP FOREIGN KEY \`FK_cd1d959af280ef7adab33f65690\``);
        await queryRunner.query(`ALTER TABLE \`problem_review\` DROP FOREIGN KEY \`FK_99fdf43873adfc518d4620429bc\``);
        await queryRunner.query(`ALTER TABLE \`problem_review\` DROP FOREIGN KEY \`FK_249f103b99522201a797f186f63\``);
        await queryRunner.query(`ALTER TABLE \`favorites_center\` DROP FOREIGN KEY \`FK_ef2b617854e6e857e8c552b3bbd\``);
        await queryRunner.query(`ALTER TABLE \`favorites_center\` DROP FOREIGN KEY \`FK_d5daec99770ae7c2861dfd22903\``);
        await queryRunner.query(`ALTER TABLE \`center_review_image\` DROP FOREIGN KEY \`FK_10941517f8b0cb6e37a11f7a149\``);
        await queryRunner.query(`ALTER TABLE \`center_review\` DROP FOREIGN KEY \`FK_374ac570b1c72443dedbd029864\``);
        await queryRunner.query(`ALTER TABLE \`center_review\` DROP FOREIGN KEY \`FK_f82d98bdac5be2c791980aa8842\``);
        await queryRunner.query(`ALTER TABLE \`member_title\` DROP FOREIGN KEY \`FK_6d42ae53255332e7aa0872f9c60\``);
        await queryRunner.query(`ALTER TABLE \`member_title\` DROP FOREIGN KEY \`FK_1ea4886403484cb8053d46d87d0\``);
        await queryRunner.query(`DROP TABLE \`visit\``);
        await queryRunner.query(`DROP TABLE \`try_record\``);
        await queryRunner.query(`DROP TABLE \`record_image\``);
        await queryRunner.query(`DROP TABLE \`problem_review_image\``);
        await queryRunner.query(`DROP TABLE \`problem_review\``);
        await queryRunner.query(`DROP TABLE \`favorites_center\``);
        await queryRunner.query(`DROP TABLE \`center_review_image\``);
        await queryRunner.query(`DROP TABLE \`center_review\``);
        await queryRunner.query(`DROP TABLE \`member_title\``);
    }

}
