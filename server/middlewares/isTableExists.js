const {pool} = require( "../db/db.config" );

isExists = async (req, res, next) => {
    const checkIfTableExistsQuery = `SELECT EXISTS (
    SELECT FROM 
        pg_tables
    WHERE 
        schemaname = 'public' AND 
        tablename  = 'users'
    );`
    const isTableExsitsQuery = await pool.query(checkIfTableExistsQuery);

    const isTableExsits = isTableExsitsQuery.rows[0].exists;
    if (isTableExsits) {
        next();
    } else {
        return res.status(400).send({ message: "Don't have table Users in database" });
    }
};

const tableExistsStatus = isExists;

module.exports = tableExistsStatus;
