import executeQuery from "@/config/db/db";
export async function checkConnection() {
    const query = 'SHOW TABLES;';
    return executeQuery(query, "");
}