module.exports = {
    listRequests: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT *
       FROM REQUESTS`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    listRequest: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT *
       FROM REQUESTS WHERE REQUESTID = :id`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    listDoneRequest: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT r.*,s.SUPPLIERCOMPANYNAME, i.INVITEMNAME,e.EMPFIRSTNAME, e.EMPLASTNAME
                    FROM REQUESTS r, SUPPLIER s, INVENTORY i, EMPLOYEE e WHERE MARKEDDONE = 1 AND r.SUPPLIERID = s.SUPPLIERID AND r.INVITEMID = i.INVITEMID AND r.EMPID = e.EMPID`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    listUnDoneRequest: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT r.*,s.SUPPLIERCOMPANYNAME, i.INVITEMNAME,e.EMPFIRSTNAME, e.EMPLASTNAME
                    FROM REQUESTS r, SUPPLIER s, INVENTORY i, EMPLOYEE e WHERE MARKEDDONE = 0 AND r.SUPPLIERID = s.SUPPLIERID AND r.INVITEMID = i.INVITEMID AND r.EMPID = e.EMPID`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    searchRequest: function (companyName, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT r.*
       FROM REQUESTS r, SUPPLIERS s,INVENTORY i WHERE (s.SUPPLIERCOMPANYNAME LIKE :companyName AND s.SUPPLIERID = r.SUPPLIERID) OR (i.INVITEMNAME LIKE :companyName AND i.INVITEMID = r.INVITEMID)`,
                    ['%' + companyName + '%', '%' + companyName + '%'],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    insertRequest: function (invItemId, supplierID, empID, requestQuantity, requestNotes, requestTotalPrice, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    //`INSERT INTO supplier (SUPPLIERCOMPANYNAME) VALUES(':companyName');`,
                    `INSERT INTO REQUESTS
(INVITEMID, SUPPLIERID, EMPID, REQUESTQUANTITY, REQUESTNOTES, REQUESTTOTALPRICE,MARKEDDONE)
VALUES
(:invItemId, :supplierID, :empID, :requestQuantity, :requestNotes, :requestTotalPrice,0)`,
                    [invItemId, supplierID, empID, requestQuantity, requestNotes, requestTotalPrice],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    updateRequest: function (id, invItemId, supplierID, empID, requestQuantity, requestNotes, requestTotalPrice, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE REQUESTS
SET INVITEMID = :invItemId,
SUPPLIERID = :supplierID,
EMPID = :empID,
REQUESTQUANTITY = :requestQuantity,
REQUESTNOTES = :requestNotes,
REQUESTTOTALPRICE = :requestTotalPrice
WHERE REQUESTID = :id`,
                    [invItemId, supplierID, empID, requestQuantity, requestNotes, requestTotalPrice, id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    requestDone: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE REQUESTS
SET MARKEDDONE =1  
WHERE REQUESTID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    requestUnDone: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE REQUESTS
SET MARKEDDONE =0  
WHERE REQUESTID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    deleteRequest: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `DELETE FROM REQUESTS
	WHERE REQUESTID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    }
};