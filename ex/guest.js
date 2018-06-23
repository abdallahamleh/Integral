module.exports = {
    listGuests: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT * FROM GUEST`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    listGuest: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT * FROM GUEST WHERE GUESTID = :id`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    insertGuest: function (roomNum, guestFirstName, guestLastName, guestShare, passportCopy, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    //`INSERT INTO supplier (SUPPLIERCOMPANYNAME) VALUES(':companyName');`,
                    `INSERT INTO GUEST
(ROOMNUM, GUESTFIRSTNAME, GUESTLASTNAME, GUESTSHARE,PASSPORTCOPY)
VALUES
(:roomNum, :guestFirstName, :guestLastName, :guestShare,:passportCopy)`,
                    [roomNum, guestFirstName, guestLastName, guestShare, passportCopy],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    updateGuest: function (id, roomNum, guestFirstName, guestLastName, guestShare, passportCopy, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE GUEST
SET ROOMNUM = :roomNum,
GUESTFIRSTNAME = :guestFirstName,
GUESTLASTNAME = :guestLastName,
GUESTSHARE = :guestShare,
PASSPORTCOPY = :passportCopy
WHERE GUESTID = :id`,
                    [roomNum, guestFirstName, guestLastName, guestShare, passportCopy, id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    searchGuest: function (guestFirstName, guestLastName, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT * FROM GUEST WHERE GUESTFIRSTNAME LIKE :guesttFirstName OR GUESTLASTNAME LIKE :guestLastName OR GUESTTFIRSTNAME LIKE :guestLastName OR GUESTLASTNAME LIKE :guestFirstName`,
                    ['%' + guestFirstName + '%', '%' + guestLastName + '%', '%' + guestLastName + '%', '%' + guestFirstName + '%'],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    deleteGuest: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `DELETE FROM GUEST
	WHERE GUESTID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    deleteGuests: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `DELETE FROM GUEST
	WHERE ROOMNUM = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    }
};