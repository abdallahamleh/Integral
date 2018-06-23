module.exports = {
    listRooms: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT R.* , T.ROOMTYPENAME
   FROM ROOM R, ROOMTYPE T WHERE R.ROOMTYPEID = T.ROOMTYPEID`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    listRoom: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT R.* , T.ROOMTYPENAME
                    FROM ROOM R, ROOMTYPE T WHERE R.ROOMTYPEID = T.ROOMTYPEID AND R.ROOMNUM = :id`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    insertRoom: function (roomNum, roomTypeID, roomLocation, roomStatus, smokingStatus, hasBalcony, hasInternet, hasSafe, hasMiniBar, hasBathTub, roomDescription, roomPrice, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    //`INSERT INTO supplier (SUPPLIERCOMPANYNAME) VALUES(':companyName');`,
                    `INSERT INTO ROOM
(ROOMNUM, ROOMTYPEID, ROOMLOCATION, ROOMSTATUS, SMOKINGSTATUS, HASBALCONY,HASINTERNET,HASSAFE,HASMINIBAR,HASBATHTUB,ROOMDESCRIPTION,ROOMPRICE)
VALUES
(:roomNum, :roomTypeID, :roomLocation, :roomStatus, :smokingStatus, :hasBalcony,:hasInternet,:hasSafe,:hasMiniBar,:hasBathTub,:roomDescription,:roomPrice)`,
                    [roomNum, roomTypeID, roomLocation, roomStatus, smokingStatus, hasBalcony, hasInternet, hasSafe, hasMiniBar, hasBathTub, roomDescription, roomPrice],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    updateRoom: function (roomNum, roomTypeID, roomLocation, roomStatus, smokingStatus, hasBalcony, hasInternet, hasSafe, hasMiniBar, hasBathTub, roomDescription, roomPrice, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE ROOM
SET ROOMTYPEID = :roomTypeID,
ROOMLOCATION = :roomLocation,
ROOMSTATUS = :roomStatus,
SMOKINGSTATUS = :smokingStatus,
HASBALCONY = :hasBalcony,
HASINTERNET = :hasInternet,
HASSAFE = :hasSafe,
HASMINIBAR = :hasMiniBar,
HASBATHTUB = :hasBathTub,
ROOMDESCRIPTION = :roomDescription,
ROOMPRICE = :roomPrice
WHERE ROOMNUM = :roomNum`,
                    [roomTypeID, roomLocation, roomStatus, smokingStatus, hasBalcony, hasInternet, hasSafe, hasMiniBar, hasBathTub, roomDescription, roomPrice, roomNum],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    changeAvailable: function (roomNum, roomStatus, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE ROOM
SET 
ROOMSTATUS = :roomStatus
WHERE ROOMNUM = :roomNum`,
                    [roomStatus, roomNum],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    deleteRoom: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `DELETE FROM ROOM
	WHERE ROOMNUM = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    searchRooms: function (roomStatus, roomTypeID, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT R.* , T.ROOMTYPENAME
                    FROM ROOM R, ROOMTYPE T WHERE R.ROOMTYPEID = T.ROOMTYPEID AND R.ROOMSTATUS = :roomStatus AND R.ROOMTYPEID = :roomTypeID`,
                    [roomStatus, roomTypeID],
                    { outFormat: oracledb.OBJECT, autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    searchRoom: function (roomNum, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT R.* , T.ROOMTYPENAME
                    FROM ROOM R, ROOMTYPE T WHERE R.ROOMTYPEID = T.ROOMTYPEID AND R.ROOMNUM = :roomNum`,
                    [roomNum],
                    { outFormat: oracledb.OBJECT, autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    listRoomTypes: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT *
   FROM ROOMTYPE `,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    }, listRoomType: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT * 
                    FROM ROOMTYPE WHERE ROOMTYPEID = :id`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    insertRoomType: function (roomTypeName, roomMaxCapacity, roomTypeDescription, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    //`INSERT INTO supplier (SUPPLIERCOMPANYNAME) VALUES(':companyName');`,
                    `INSERT INTO ROOMTYPE
(ROOMTYPENAME, ROOMMAXCAPACITY, ROOMTYPEDESCRIPTION)
VALUES
(:roomTypeName, :roomMaxCapacity, :roomTypeDescription)`,
                    [roomTypeName, roomMaxCapacity, roomTypeDescription],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    updateRoomType: function (id, roomTypeName, roomMaxCapacity, roomTypeDescription, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE ROOMTYPE
SET ROOMTYPENAME = :roomTypeName,
ROOMMAXCAPACITY = :roomMaxCapacity,
ROOMTYPEDESCRIPTION = :roomTypeDescription,
WHERE ROOMTYPEID = :id`,
                    [roomTypeName, roomMaxCapacity, roomTypeDescription, id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    deleteRoomType: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `DELETE FROM ROOMTYPE
	WHERE ROOMTYPEID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    }

};