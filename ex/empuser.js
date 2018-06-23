module.exports = {
    insertEmpUser: function (empID, empUsername, empPassword, hasAccessReserv, hasAccessRoom, hasAccessEmployees, hasAccessFacilities, hasAccessInventory, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `INSERT INTO EMPUSER
(EMPID, EMPUSERNAME, EMPPASSWORD, HASACCESSRESERV,HASACCESSROOM,HASACCESSEMPLOYEES,HASACCESSFACILITIES,HASACCESSINVENTORY)
VALUES
(:empID, :empUsername, :empPassword, :hasAccessReserv,:hasAccessRoom,:hasAccessEmployees,:hasAccessFacilities,:hasAccessInventory)`,
                    [empID, empUsername, empPassword, hasAccessReserv, hasAccessRoom, hasAccessEmployees, hasAccessFacilities, hasAccessInventory],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    login: function (username, password, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT e.*,usern.* FROM EMPLOYEE e,EMPUSER usern WHERE usern.EMPUSERNAME = :username AND usern.EMPPASSWORD = :password AND usern.EMPID = e.EMPID`,
                    [username, password], { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    listEmpUser: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT e.*,usern.* FROM EMPLOYEE e,EMPUSER usern WHERE usern.EMPID = :id AND usern.EMPID=e.EMPID`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    deleteEmpUser: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `DELETE FROM EMPUSER
	WHERE EMPID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    updateEmpUser: function (id, empUsername, empPassword, hasAccessReserv, hasAccessRoom, hasAccessEmployees, hasAccessFacilities, hasAccessInventory, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE EMPUSER
SET 
EMPUSERNAME = :empUsername,
EMPPASSWORD = :empPassword,
HASACCESSRESERV = :hasAccessReserv,
HASACCESSROOM = :hasAccessRoom,
HASACCESSEMPLOYEES = :hasAccessEmployees,
HASACCESSFACILITIES = :hasAccessFacilities,
HASACCESSINVENTORY = :hasAccessInventory
WHERE EMPID = :id`,
                    [empUsername, empPassword, hasAccessReserv, hasAccessRoom, hasAccessEmployees, hasAccessFacilities, hasAccessInventory, id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    }
};