module.exports = {
    listEmployees: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT e.*,s.EMPFIRSTNAME as superFirstName,s.EMPLASTNAME as superLastName
       FROM EMPLOYEE e,EMPLOYEE s WHERE s.EMPID = e.EMPSUPERVISOR`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    listEmployee: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT e.*,s.EMPFIRSTNAME as supervisorfirstname,s.EMPLASTNAME as supervisorlastname
                    FROM EMPLOYEE e,EMPLOYEE s WHERE e.EMPID = :id AND s.EMPID = e.EMPSUPERVISOR`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    searchEmployee: function (empLastName, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT e.*
       FROM EMPLOYEE e WHERE  e.EMPLASTNAME LIKE :empLastName`,
                    ['%' + empLastName + '%'],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    insertEmployee: function (empSupervisor, empFirstName, empLastName, empGender,empAddress,empSalary,empPosition,empDepartment, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `INSERT INTO EMPLOYEE
(EMPSUPERVISOR, EMPFIRSTNAME, EMPLASTNAME, EMPGENDER,EMPADDRESS,EMPSALARY,EMPPOSITION,EMPDEPARTMENT)
VALUES
(:empSupervisor, :empFirstName, :empLastName, :empGender,:empAddress,:empSalary,:empPosition,:empDepartment)`,
                    [empSupervisor, empFirstName, empLastName, empGender,empAddress,empSalary,empPosition,empDepartment],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    updateEmployee: function (id, empSupervisor, empFirstName, empLastName, empGender,empAddress,empSalary,empPosition,empDepartment, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE EMPLOYEE
SET 
EMPSUPERVISOR = :empSupervisor,
EMPFIRSTNAME = :empFirstName,
EMPLASTNAME = :empLastName,
EMPGENDER = :empGender,
EMPADDRESS = :empAddress,
EMPSALARY = :empSalary,
EMPPOSITION = :empPosition,
EMPDEPARTMENT = :empDepartment
WHERE EMPID = :id`,
                    [empSupervisor, empFirstName, empLastName, empGender,empAddress,empSalary,empPosition,empDepartment,id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    deleteEmployee: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `DELETE FROM EMPLOYEE
	WHERE EMPID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    }
};