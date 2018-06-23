module.exports = {
    listReservations: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT R.* , C.CLIENTFIRSTNAME, C.CLIENTLASTNAME , T.RESERVTYPENAME
       FROM RESERVATION R, CLIENT C, RESERVATIONTYPE T WHERE R.CLIENTID = C.CLIENTID AND R.RESERVTYPEID = T.RESERVTYPEID`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    listServicesReservation: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT T.SERVICETYPENAME,T.SERVICETYPEPRICE,S.SERVICEID FROM SERVICE S,SERVICETYPE T WHERE S.RESERVID = :id AND S.SERVICETYPEID = T.SERVICETYPEID`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    listReservationsdone: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT R.* , C.CLIENTFIRSTNAME, C.CLIENTLASTNAME , T.RESERVTYPENAME
       FROM RESERVATION R, CLIENT C, RESERVATIONTYPE T WHERE R.CLIENTID = C.CLIENTID AND R.RESERVTYPEID = T.RESERVTYPEID AND RESERVCHECKOUTDATE < TRUNC(SYSDATE)`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    listReservationDone: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT R.* , C.CLIENTFIRSTNAME, C.CLIENTLASTNAME , T.RESERVTYPENAME
       FROM RESERVATION R, CLIENT C, RESERVATIONTYPE T WHERE R.CLIENTID = C.CLIENTID AND R.RESERVTYPEID = T.RESERVTYPEID AND RESERVCHECKOUTDATE < TRUNC(SYSDATE) AND R.ROOMNUM = :id`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    listReservationAvailable: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT R.* , C.CLIENTFIRSTNAME, C.CLIENTLASTNAME , T.RESERVTYPENAME
       FROM RESERVATION R, CLIENT C, RESERVATIONTYPE T WHERE R.CLIENTID = C.CLIENTID AND R.RESERVTYPEID = T.RESERVTYPEID AND RESERVCHECKOUTDATE >= TRUNC(SYSDATE) AND R.ROOMNUM = :id`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    listReservationsAvailable: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT R.* , C.CLIENTFIRSTNAME, C.CLIENTLASTNAME , T.RESERVTYPENAME
       FROM RESERVATION R, CLIENT C, RESERVATIONTYPE T WHERE R.CLIENTID = C.CLIENTID AND R.RESERVTYPEID = T.RESERVTYPEID AND RESERVCHECKOUTDATE >= TRUNC(SYSDATE)`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    listReservation: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT R.* , C.CLIENTFIRSTNAME, C.CLIENTLASTNAME , T.RESERVTYPENAME
       FROM RESERVATION R, CLIENT C, RESERVATIONTYPE T WHERE R.CLIENTID = C.CLIENTID AND R.RESERVTYPEID = T.RESERVTYPEID AND R.ROOMNUM = :id`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    listReservationById: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT R.* , C.CLIENTFIRSTNAME, C.CLIENTLASTNAME , T.RESERVTYPENAME
       FROM RESERVATION R, CLIENT C, RESERVATIONTYPE T WHERE R.CLIENTID = C.CLIENTID AND R.RESERVTYPEID = T.RESERVTYPEID AND R.RESERVID = :id`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    insertReservation: function (clientID, roomNum, reservTypeId, empID, reservCheckInDate, reservCheckOutDate, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    //`INSERT INTO supplier (SUPPLIERCOMPANYNAME) VALUES(':companyName');`,
                    `INSERT INTO RESERVATION
(CLIENTID, ROOMNUM, RESERVTYPEID, EMPID, RESERVCHECKINDATE, RESERVCHECKOUTDATE,ISPAID)
VALUES
(:clientID, :roomNum, :reservTypeId, :empID,TO_DATE(:reservCheckInDate, 'dd/mm/yyyy') ,TO_DATE(:reservCheckOutDate, 'dd/mm/yyyy'),0)`,
                    [clientID, roomNum, reservTypeId, empID, reservCheckInDate, reservCheckOutDate],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    updateReservation: function (id, clientID, roomNum, reservTypeId, empID, reservCheckInDate, reservCheckOutDate, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE RESERVATION
SET CLIENTID = :clientID,
ROOMNUM = :roomNum,
RESERVTYPEID = :reservTypeId,
EMPID = :empID,
RESERVCHECKINDATE =TO_DATE(:reservCheckInDate, 'dd/mm/yyyy'),
RESERVCHECKOUTDATE = TO_DATE(:reservCheckOutDate, 'dd/mm/yyyy')
WHERE RESERVID = :id`,
                    [clientID, roomNum, reservTypeId, empID, reservCheckInDate, reservCheckOutDate, id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    deleteReservation: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `DELETE FROM RESERVATION
	WHERE RESERVID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    checkout: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE RESERVATION
                    SET ISPAID = 1 WHERE RESERVID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

    //----------------------type

    listReservationTypes: function (oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT *
       FROM RESERVATIONTYPE`,
                    [],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    listReservationType: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT *
       FROM RESERVATIONTYPE RESERVTYPEID = :id`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    insertReservationType: function (reservTypeName, reservTypeDescription, reservRoomPrice, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    //`INSERT INTO supplier (SUPPLIERCOMPANYNAME) VALUES(':companyName');`,
                    `INSERT INTO RESERVATIONTYPE
(RESERVTYPENAME, RESERVTYPEDESCRIPTION,RESERVROOMPRICE)
VALUES
(:reservTypeName, :reservTypeDescription,:reservRoomPrice)`,
                    [reservTypeName, reservTypeDescription, reservRoomPrice],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    updateReservationType: function (id, reservTypeName, reservTypeDescription, reservRoomPrice, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `UPDATE RESERVATIONTYPE
SET RESERVTYPENAME = :reservTypeName,
RESERVTYPEDESCRIPTION = :reservTypeDescription,
RESERVROOMPRICE = :reservRoomPrice
WHERE RESERVTYPEID = :id`,
                    [reservTypeName, reservTypeDescription, reservRoomPrice, id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },
    deleteReservationType: function (id, oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `DELETE FROM RESERVATIONTYPE
	WHERE RESERVTYPEID = :id`,
                    [id],
                    { autoCommit: true });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    }

};