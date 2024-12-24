import executeQuery from "@/utils/db";
export async function checkConnection() {
    const query = 'SHOW TABLES;';
    return executeQuery(query, "");
}