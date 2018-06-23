module.exports = {
	listSuppliers: function (oracledb, config) {
		return new Promise(function (resolve, reject) {
			let conn;
			conn = oracledb.getConnection(config).then(function (c) {
				conn = c;
				return conn.execute(
					`SELECT *
       FROM supplier`,
					[],
					{ outFormat: oracledb.OBJECT });
			}).then(function (result) {
				resolve(result.rows);
			})
		});
	},

	listSupplierItems: function (id,oracledb, config) {
        return new Promise(function (resolve, reject) {
            let conn;
            conn = oracledb.getConnection(config).then(function (c) {
                conn = c;
                return conn.execute(
                    `SELECT A.* , I.INVITEMTYPENAME
       FROM INVENTORY A, INVENTORYITEMTYPE I,ITEM B WHERE I.INVITEMTYPEID = A.INVITEMTYPEID AND B.SUPPLIERID = :id AND B.INVITEMID = A.INVITEMID`,
                    [id],
                    { outFormat: oracledb.OBJECT });
            }).then(function (result) {
                resolve(result.rows);
            })
        });
    },

	listSupplier: function (id, oracledb, config) {
		return new Promise(function (resolve, reject) {
			let conn;
			conn = oracledb.getConnection(config).then(function (c) {
				conn = c;
				return conn.execute(
					`SELECT *
       FROM supplier WHERE SUPPLIERID = :id`,
					[id],
					{ outFormat: oracledb.OBJECT });
			}).then(function (result) {
				resolve(result.rows);
			})
		});
	},

	searchSupplier: function (companyName, oracledb, config) {
		return new Promise(function (resolve, reject) {
			let conn;
			conn = oracledb.getConnection(config).then(function (c) {
				conn = c;
				return conn.execute(
					`SELECT *
       FROM supplier WHERE SUPPLIERCOMPANYNAME LIKE :companyName`,
					['%'+companyName+'%'],
					{ outFormat: oracledb.OBJECT });
			}).then(function (result) {
				resolve(result.rows);
			})
		});
	},

	insertSupplier: function (companyName, companyEmail, companyPhoneNum, companyAddress, companyCity, companyCountry, contactName, contactPhoneNum, notes, oracledb, config) {
		return new Promise(function (resolve, reject) {
			let conn;
			conn = oracledb.getConnection(config).then(function (c) {
				conn = c;
				return conn.execute(
					//`INSERT INTO supplier (SUPPLIERCOMPANYNAME) VALUES(':companyName');`,
					`INSERT INTO supplier
(SUPPLIERCOMPANYNAME,SUPPLIERCOMPANYEMAIL,SUPPLIERCOMPANYPHONENUM,SUPPLIERCOMPANYADRESS,SUPPLIERCOMPANYCITY,SUPPLIERCOMPANYCOUNTRY,SUPPLIERCONTACTNAME,SUPPLIERCONTACTPHONENUM,SUPPLIERNOTES,SUPPLIERBALANCE)
VALUES
(:companyName,:companyEmail,:companyPhoneNum,:companyAddress,:companyCity,:companyCountry,:contactName,:contactPhoneNum,:notes,:balance)`,
					[companyName, companyEmail, companyPhoneNum, companyAddress, companyCity, companyCountry, contactName, contactPhoneNum, notes, 0],
					{ autoCommit: true });
			}).then(function (result) {
				resolve(result.rows);
			})
		});
	},

	updateSupplier: function (supplierID, companyName, companyEmail, companyPhoneNum, companyAddress, companyCity, companyCountry, contactName, contactPhoneNum, notes, oracledb, config) {
		return new Promise(function (resolve, reject) {
			let conn;
			conn = oracledb.getConnection(config).then(function (c) {
				conn = c;
				return conn.execute(
					`UPDATE supplier
SET SUPPLIERCOMPANYNAME = :companyName,
SUPPLIERCOMPANYEMAIL = :companyEmail,
SUPPLIERCOMPANYPHONENUM = :companyPhoneNum,
SUPPLIERCOMPANYADRESS = :companyAddress,
SUPPLIERCOMPANYCITY = :companyCity,
SUPPLIERCOMPANYCOUNTRY = :companyCountry,
SUPPLIERCONTACTNAME = :contactName,
SUPPLIERCONTACTPHONENUM = :contactPhoneNum,
SUPPLIERNOTES = :notes
WHERE SUPPLIERID = :supplierID`,
					[companyName, companyEmail, companyPhoneNum, companyAddress, companyCity, companyCountry, contactName, contactPhoneNum, notes, supplierID],
					{ autoCommit: true });
			}).then(function (result) {
				resolve(result.rows);
			})
		});
	},

	deleteSupplier: function (id, oracledb, config) {
		return new Promise(function (resolve, reject) {
			let conn;
			conn = oracledb.getConnection(config).then(function (c) {
				conn = c;
				return conn.execute(
					`DELETE FROM SUPPLIER
	WHERE SUPPLIERID = :id`,
					[id],
					{ autoCommit: true });
			}).then(function (result) {
				resolve(result.rows);
			})
		});
	}
};