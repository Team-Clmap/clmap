import { createPool } from "mysql2";
import type { Pool } from "mysql2";
//connection pool을 사용하면 항상 새로운 연결을 하는게 아니라 재사용 가능함. 
const pool: Pool = createPool({
    user : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 3306,
    database: process.env.DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.getConnection((err, conn) => {
    if (err) console.log('Error connecting to db...')
    else console.log('Connected to db...!')
    conn.release()
})

const executeQuery = (query: string, arrParams: any) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, arrParams, (err, data) => {
                if (err) {
                    console.log('Error in executing the query')
                    reject(err)
                }
                //console.log(data)
                resolve(data)
            })
        } catch (err) {
            reject(err)
        }
    })
}

export default executeQuery