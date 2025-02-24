import executeQuery from "@/utils/database/db";
export async function checkConnection() {
    const query = 'SHOW TABLES;';
    return executeQuery(query, "");
}