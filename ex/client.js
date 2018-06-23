module.exports = {
    listClients: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT * FROM CLIENT`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    listClient: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT * FROM CLIENT WHERE CLIENTID = :id`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    insertClient: function (clientFirstName, clientLastName, clientEmail, clientPhoneNum, clientAddress, clientCity,clientCountry, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    //`INSERT INTO supplier (SUPPLIERCOMPANYNAME) VALUES(':companyName');`,
                    `INSERT INTO CLIENT
(CLIENTFIRSTNAME, CLIENTLASTNAME, CLIENTEMAIL, CLIENTPHONENUM, CLIENTADDRESS, CLIENTCITY,CLIENTCOUNTRY)
VALUES
(:clientFirstName, :clientLastName, :clientEmail, :clientPhoneNum, :clientAddress, :clientCity,:clientCountry)`,
                    [clientFirstName, clientLastName, clientEmail, clientPhoneNum, clientAddress, clientCity,clientCountry],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    updateClient: function (id, clientFirstName, clientLastName, clientEmail, clientPhoneNum, clientAddress, clientCity,clientCountry, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE CLIENT
SET CLIENTFIRSTNAME = :clientFirstName,
CLIENTLASTNAME = :clientLastName,
CLIENTEMAIL = :clientEmail,
CLIENTPHONENUM = :clientPhoneNum,
CLIENTADDRESS = :clientAddress,
CLIENTCITY = :clientCity,
ClIENTCOUNTRY = :clientCountry
WHERE CLIENTID = :id`,
                    [clientFirstName, clientLastName, clientEmail, clientPhoneNum, clientAddress, clientCity,clientCountry, id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    searchClient: function (clientLastName, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT * FROM CLIENT WHERE CLIENTLASTNAME LIKE :clientLastName`,
                    ['%' + clientLastName + '%'],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    deleteClient: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `DELETE FROM CLIENT
	WHERE CLIENTID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    }
};