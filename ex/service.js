module.exports = {
    listServices: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT S.*,T.SERVICETYPENAME FROM SERVICE S, SERVICETYPE T`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    listService: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT S.*,T.SERVICETYPENAME FROM SERVICE S,SERVICETYPE T WHERE S.SERVICEID = :id AND S.SERVICETYPEID = T.SERVICETYPEID`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    insertService: function (serviceTypeID, reservID, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    //`INSERT INTO supplier (SUPPLIERCOMPANYNAME) VALUES(':companyName');`,
                    `INSERT INTO SERVICE
(SERVICETYPEID, RESERVID)
VALUES
(:serviceTypeID,:reservID)`,
                    [serviceTypeID, reservID],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    updateService: function (id, serviceTypeID, serviceStartingDate, reservID, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE SERVICE
SET SERVICETYPEID = :serviceTypeID,
SERVICESTARTINGDATE = TO_DATE(:serviceStartingDate, 'yyyy/mm/dd'),
RESERVID = :reservID
WHERE SERVICEID = :id`,
                    [ serviceTypeID, serviceStartingDate, reservID, id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    deleteService: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `DELETE FROM SERVICE
	WHERE SERVICEID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    //----------------------------types
    listServiceTypes: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT * FROM SERVICETYPE`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    listServiceType: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT * FROM SERVICETYPE WHERE SERVICETYPEID = :id`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    insertServiceType: function (serviceTypeName, serviceTypeDescription, serviceTypePrice, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    //`INSERT INTO supplier (SUPPLIERCOMPANYNAME) VALUES(':companyName');`,
                    `INSERT INTO SERVICETYPE
(SERVICETYPENAME, SERVICETYPEDESCRIPTION,SERVICETYPEPRICE)
VALUES
(:serviceTypeName, :serviceTypeDescription, :serviceTypePrice)`,
                    [serviceTypeName, serviceTypeDescription, serviceTypePrice],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    updateServiceType: function (id, serviceTypeName, serviceTypeDescription,serviceTypePrice, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE SERVICETYPE
SET SERVICETYPENAME = :serviceTypeName,
SERVICETYPEDESCRIPTION = :serviceTypeDescription,
SERVICETYPEPRICE=:serviceTypePrice
WHERE SERVICETYPEID = :id`,
                    [serviceTypeName, serviceTypeDescription, serviceTypePrice, id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    searchServiceType: function (serviceTypeName, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT * FROM SERVICETYPE WHERE SERVICETYPENAME LIKE :serviceTypeName `,
                    ['%' + serviceTypeName + '%'],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    deleteServiceType: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `DELETE FROM SERVICETYPE
	WHERE SERVICETYPEID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
};