module.exports = {
    listItems: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT A.* , I.INVITEMTYPENAME
       FROM INVENTORY A, INVENTORYITEMTYPE I WHERE I.INVITEMTYPEID = A.INVITEMTYPEID`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    listItemSuppliers: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT S.*
       FROM supplier S, ITEM I WHERE I.INVITEMID = :id AND I.SUPPLIERID = S.SUPPLIERID`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    listItem: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT A.* , I.INVITEMTYPENAME
                    FROM INVENTORY A, INVENTORYITEMTYPE I WHERE I.INVITEMTYPEID = A.INVITEMTYPEID AND INVITEMID = :id`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    insertItem: function (itemtypeid, itemName, itemAmount, itemUnit, lastPurchasePrice, minAllowedAmount, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    //`INSERT INTO supplier (SUPPLIERCOMPANYNAME) VALUES(':companyName');`,
                    `INSERT INTO INVENTORY
(INVITEMTYPEID, INVITEMNAME, INVITEMAMOUNT, INITEMMEASUREMENTUNIT, LASTPURCHASEPRICE, MINALLOWEDAMOUNT)
VALUES
(:itemtypeid,:itemName,:itemAmount,:itemUnit,:lastPurchasePrice,:minAllowedAmount)`,
                    [itemtypeid, itemName, itemAmount, itemUnit, lastPurchasePrice, minAllowedAmount],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    updateItem: function (itemid, itemTypeid, itemName, itemUnit, lastPurchasePrice, minAllowedAmount, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE INVENTORY
SET INVITEMTYPEID = :itemTypeid,
INVITEMNAME = :itemName,
INITEMMEASUREMENTUNIT = :itemUnit,
LASTPURCHASEPRICE = :lastPurchasePrice,
MINALLOWEDAMOUNT = :minAllowedAmount
WHERE INVITEMID = :itemid`,
                    [itemTypeid, itemName, itemUnit, lastPurchasePrice, minAllowedAmount, itemid],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    updateItemAmount: function (itemid, itemAmount, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE INVENTORY
SET INVITEMAMOUNT = :itemAmount
WHERE INVITEMID = :itemid`,
                    [itemAmount, itemid],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    searchItem: function (itemName, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT A.* , I.INVITEMTYPENAME
       FROM INVENTORY A, INVENTORYITEMTYPE I WHERE INVITEMNAME LIKE :itemName AND I.INVITEMTYPEID = A.INVITEMTYPEID`,
                    ['%' + itemName + '%'],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    deleteItem: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `DELETE FROM INVENTORY
	WHERE INVITEMID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    listItemTypes: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT *
       FROM INVENTORYITEMTYPE`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    listItemType: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT *
       FROM INVENTORYITEMTYPE WHERE INVITEMTYPEID = :id`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    insertItemType: function (itemTypeName, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `INSERT INTO INVENTORYITEMTYPE
(INVITEMTYPENAME)
VALUES
(:itemTypeName)`,
                    [itemTypeName],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    updateItemType: function (itemtypeid, itemTypeName, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE INVENTORYITEMTYPE
SET INVITEMTYPENAME = :itemTypeName
WHERE INVITEMTYPEID = :itemtypeid`,
                    [itemTypeName, itemtypeid],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    deleteItemType: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `DELETE FROM INVENTORYITEMTYPE
	WHERE INVITEMTYPEID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    }
};