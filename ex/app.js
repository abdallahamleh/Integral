var express = require('express');
var path = require('path');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var express = require('express');
var app = express();
var oracledb = require('oracledb');
var dbConfig = require('../dbconfig.js');
var bodyParser = require('body-parser');
var supplier = require('./supplier.js');
var item = require('./item.js');
var request = require('./request.js');
var employee = require('./employee.js');
var empuser = require('./empuser.js');
var room = require('./room.js');
var client = require('./client.js');
var service = require('./service.js');
var guest = require('./guest.js');
var reservation = require('./reservation.js');

const config = {
	user: dbConfig.user,
	password: dbConfig.password,
	connectString: dbConfig.connectString
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods", "*");
	next();
});

app.post('/ReceiveJSON', function (req, res) {
	console.log(req.body);
	res.send("ok");
});
//---------------------------------------------------------------------------------------SUPPLIER
app.get('/supplier', function (req, res) {
	if (req.query.id !== undefined) {
		supplier.listSupplier(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	}
	else if (req.query.compname !== undefined) {
		supplier.searchSupplier(req.query.compname, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else {
		supplier.listSuppliers(oracledb, config).then(function (result) {
			res.send(result)
		});
	}
});
app.get('/supplieritems', function (req, res) {
	supplier.listSupplierItems(req.query.id, oracledb, config).then(function (result) {
		res.send(result)
	});
});
app.post('/addsupplier', function (req, res) {
	supplier.insertSupplier(req.body.companyName, req.body.companyEmail, req.body.companyPhoneNum, req.body.companyAddress, req.body.companyCity, req.body.companyCountry, req.body.contactName, req.body.contactPhoneNum, req.body.notes, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/editsupplier', function (req, res) {
	supplier.updateSupplier(req.body.id, req.body.companyName, req.body.companyEmail, req.body.companyPhoneNum, req.body.companyAddress, req.body.companyCity, req.body.companyCountry, req.body.contactName, req.body.contactPhoneNum, req.body.notes, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.delete('/removesupplier', function (req, res) {
	supplier.deleteSupplier(req.query.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

//---------------------------------------------------------------------------------------------INVENTORY

app.get('/item', function (req, res) {
	if (req.query.id !== undefined) {
		item.listItem(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else if (req.query.itemname !== undefined) {
		item.searchItem(req.query.itemname, oracledb, config).then(function (result) {
			res.send(result)
		})
	} else {
		item.listItems(oracledb, config).then(function (result) {
			res.send(result)
		});
	}
});
app.get('/itemsuppliers', function (req, res) {
	item.listItemSuppliers(req.query.id, oracledb, config).then(function (result) {
		res.send(result)
	});
});
app.post('/additem', function (req, res) {
	item.insertItem(req.body.itemtypeid, req.body.itemName, req.body.itemAmount, req.body.itemUnit, req.body.lastPurchasePrice, req.body.minAllowedAmount, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/edititem', function (req, res) {
	item.updateItem(req.body.itemid, req.body.itemTypeid, req.body.itemName, req.body.itemUnit, req.body.lastPurchasePrice, req.body.minAllowedAmount, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/edititemamount', function (req, res) {
	item.updateItemAmount(req.body.itemid, req.body.itemAmount, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.delete('/removeitem', function (req, res) {
	item.deleteItem(req.query.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

//--------------------------------------------------------------------------------------------------ITEMTYPE

app.get('/itemtype', function (req, res) {
	if (req.query.id !== undefined) {
		item.listItemType(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else {
		item.listItemTypes(oracledb, config).then(function (result) {
			res.send(result)
		});
	}
});
app.post('/additemtype', function (req, res) {
	item.insertItemType(req.body.itemTypeName, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/edititemtype', function (req, res) {
	item.updateItemType(req.body.itemtypeid, itemTypeName, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.delete('/removeitemtype', function (req, res) {
	item.deleteItemType(req.query.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

//---------------------------------------------------------------------------------------------------REQUESTS

app.get('/request', function (req, res) {
	if (req.query.id !== undefined) {
		request.listRequest(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else if (req.query.name !== undefined) {
		request.searchRequest(req.query.name, oracledb, config).then(function (result) {
			res.send(result)
		})
	} else {
		request.listRequests(oracledb, config).then(function (result) {
			res.send(result)
		});
	}
});

app.post('/addrequest', function (req, res) {
	request.insertRequest(req.body.invItemId, req.body.supplierID, req.body.empID, req.body.requestQuantity, req.body.requestNotes, req.body.requestTotalPrice, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/editrequest', function (req, res) {
	request.updateRequest(req.body.id, invItemId, req.body.supplierID, req.body.empID, req.body.requestQuantity, req.body.requestNotes, req.body.requestTotalPrice, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.get('/listdonerequest', function (req, res) {
	request.listDoneRequest(oracledb, config).then(function (result) {
		res.send(result)
	});

});
app.get('/listundonerequest', function (req, res) {
	request.listUnDoneRequest(oracledb, config).then(function (result) {
		res.send(result)
	});
});
app.post('/requestdone', function (req, res) {
	request.requestDone(req.body.id, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/requestundone', function (req, res) {
	request.requestUnDone(req.body.id, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.delete('/removerequest', function (req, res) {
	request.deleteRequest(req.query.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

//--------------------------------------------------------------------------------------------------EMPLOYEE

app.get('/employee', function (req, res) {
	if (req.query.id !== undefined) {
		employee.listEmployee(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else if (req.query.lastName !== undefined) {
		employee.searchEmployee(req.query.lastName, oracledb, config).then(function (result) {
			res.send(result)
		})
	} else {
		employee.listEmployees(oracledb, config).then(function (result) {
			res.send(result)
		});
	}
});

app.post('/addemployee', function (req, res) {
	employee.insertEmployee(req.body.empSupervisor, req.body.empFirstName, req.body.empLastName, req.body.empGender, req.body.empAddress, req.body.empSalary, req.body.empPosition, req.body.empDepartment, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/editemployee', function (req, res) {
	employee.updateEmployee(req.body.id, req.body.empSupervisor, req.body.empFirstName, req.body.empLastName, req.body.empGender, req.body.empAddress, req.body.empSalary, req.body.empPosition, req.body.empDepartment, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.delete('/removeemployee', function (req, res) {
	employee.deleteEmployee(req.query.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
//---------------------------------------------------------------------------------username

app.get('/empuser', function (req, res) {
	empuser.listEmpUser(req.query.id, oracledb, config).then(function (result) {
		res.send(result)
	});
});

app.post('/addempuser', function (req, res) {
	empuser.insertEmpUser(req.body.empID, req.body.empUserName, req.body.empPassword, req.body.hasAccessReserv, req.body.hasAccessRoom, req.body.hasAccessEmployees, req.body.hasAccessFacilities, req.body.hasAccessInventory, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');

});

app.post('/editempuser', function (req, res) {
	empuser.updateEmpUser(req.body.id, req.body.empUsername, req.body.empPassword, req.body.hasAccessReserv, req.body.hasAccessRoom, req.body.hasAccessEmployees, req.body.hasAccessFacilities, req.body.hasAccessInventory, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

app.post('/login', function (req, res) {
	empuser.login(req.body.username, req.body.password, oracledb, config).then(function (result) {
		res.send(result)
	});
	//res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.delete('/removeempuser', function (req, res) {
	empuser.deleteEmpUser(req.query.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

//------------------------------------------------------------------------------------------------------------------rooms

app.get('/room', function (req, res) {
	if (req.query.id !== undefined) {
		room.listRoom(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else if (req.query.roomStatus !== undefined && req.query.roomTypeID !== undefined) {
		room.searchRooms(req.query.roomStatus, req.query.roomTypeID, oracledb, config).then(function (result) {
			res.send(result)
		})
	} else if (req.query.roomNum !== undefined) {
		room.searchRoom(req.query.roomNum, oracledb, config).then(function (result) {
			res.send(result)
		})
	}
	else {
		room.listRooms(oracledb, config).then(function (result) {
			res.send(result)
		});
	}
});
app.post('/addroom', function (req, res) {
	room.insertRoom(req.body.roomNum, req.body.roomTypeID, req.body.roomLocation, req.body.roomStatus, req.body.smokingStatus, req.body.hasBalcony, req.body.hasInternet, req.body.hasSafe, req.body.hasMiniBar, req.body.hasBathTub, req.body.roomDescription, req.body.roomPrice, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/editroom', function (req, res) {
	room.updateRoom(req.body.roomNum, req.body.roomTypeID, req.body.roomLocation, req.body.roomStatus, req.body.smokingStatus, req.body.hasBalcony, req.body.hasInternet, req.body.hasSafe, req.body.hasMiniBar, req.body.hasBathTub, req.body.roomDescription, req.body.roomPrice, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/makeavailable', function (req, res) {
	room.changeAvailable(req.body.roomNum, req.body.roomStatus, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.delete('/removeroom', function (req, res) {
	room.deleteRoom(req.query.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

//-----roomtypes
app.get('/roomtype', function (req, res) {
	if (req.query.id !== undefined) {
		room.listRoomType(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else {
		room.listRoomTypes(oracledb, config).then(function (result) {
			res.send(result)
		});
	}
});
app.post('/addroomtype', function (req, res) {
	room.insertRoomType(req.body.roomTypeName, req.body.roomMaxCapacity, req.body.roomTypeDescription, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/editroomtype', function (req, res) {
	room.updateRoomType(req.body.id, req.body.roomTypeName, req.body.roomMaxCapacity, req.body.roomTypeDescription, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.delete('/removeroomtype', function (req, res) {
	room.deleteRoomType(req.query.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
//--------------------------------------------------------------------------------Client

app.get('/client', function (req, res) {
	if (req.query.id !== undefined) {
		client.listClient(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else if (req.query.clientLastName !== undefined) {
		client.searchClient(req.query.clientLastName, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else {
		client.listClients(oracledb, config).then(function (result) {
			res.send(result)
		});
	}
});
app.post('/addclient', function (req, res) {
	client.insertClient(req.body.clientFirstName, req.body.clientLastName, req.body.clientEmail, req.body.clientPhoneNum, req.body.clientAddress, req.body.clientCity, req.body.clientCountry, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/editclient', function (req, res) {
	client.updateClient(req.body.id, req.body.clientFirstName, req.body.clientLastName, req.body.clientEmail, req.body.clientPhoneNum, req.body.clientAddress, req.body.clientCity, req.body.clientCountry, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.delete('/removeclient', function (req, res) {
	client.deleteClient(req.query.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

//------------------------------------------------------------------------------GUEST

app.get('/guest', function (req, res) {
	if (req.query.id !== undefined) {
		guest.listguest(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else if (req.query.guestFirstName !== undefined || req.query.guestLastName !== undefined) {
		if (req.query.guestFirstName === undefined) {
			guest.searchGuest("NONAME", req.query.guestLastName, oracledb, config).then(function (result) {
				res.send(result)
			});
		} else if (req.query.guestLastName === undefined) {
			guest.searchGuest(req.query.guestFirstName, "NONAME", oracledb, config).then(function (result) {
				res.send(result)
			})
		} else {
			guest.searchGuest(req.query.guestFirstName, req.query.guestLastName, oracledb, config).then(function (result) {
				res.send(result)
			});
		}
	} else {
		guest.listGuests(oracledb, config).then(function (result) {
			res.send(result)
		});
	}
});
app.post('/addguest', function (req, res) {
	guest.insertGuest(req.body.roomNum, req.body.guestFirstName, req.body.guestLastName, req.body.guestShare, req.body.passportCopy, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/editguest', function (req, res) {
	guest.updateGuest(req.body.id, req.body.roomNum, req.body.guestFirstName, req.body.guestLastName, req.body.guestShare, req.body.passportCopy, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.delete('/removeguest', function (req, res) {
	guest.deleteGuest(req.query.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

//--------------------------------------------------------------------------------------Reservations
//------------------dates format is yyyy/mm/dd if you want to change it :
/*
go to reservation.js and change the format in the TO_DATE function inside the queries and you will be done 
*/
app.get('/reservation', function (req, res) {
	if (req.query.id !== undefined) {
		reservation.listReservation(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else if (req.query.mainId !== undefined) {
		reservation.listReservationById(req.query.mainId, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else {
		reservation.listReservations(oracledb, config).then(function (result) {
			res.send(result)
		});
	}
});

app.get('/reservationservices', function (req, res) {
	reservation.listServicesReservation(req.query.id, oracledb, config).then(function (result) {
		res.send(result)
	});

});

app.get('/reservationavailable', function (req, res) {
	if (req.query.id !== undefined) {
		reservation.listReservationAvailable(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else {
		reservation.listReservationsAvailable(oracledb, config).then(function (result) {
			res.send(result)
		});
	}
});
app.get('/reservationdone', function (req, res) {
	if (req.query.id !== undefined) {
		reservation.listReservationDone(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else {
		reservation.listReservationsdone(oracledb, config).then(function (result) {
			res.send(result)
		});
	}

});
app.post('/addreservation', function (req, res) {
	reservation.insertReservation(req.body.clientID, req.body.roomNum, req.body.reservTypeId, req.body.empID, req.body.reservCheckInDate, req.body.reservCheckOutDate, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/editreservation', function (req, res) {
	reservation.updateReservation(req.body.id, req.body.clientID, req.body.roomNum, req.body.reservTypeId, req.body.empID, req.body.reservCheckInDate, req.body.reservCheckOutDate, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.delete('/removereservation', function (req, res) {
	reservation.deleteReservation(req.query.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/checkout', function (req, res) { 
	reservation.checkout(req.body.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

//------------reservationtype

app.get('/reservationtype', function (req, res) {
	if (req.query.id !== undefined) {
		reservation.listReservationType(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else {
		reservation.listReservationTypes(oracledb, config).then(function (result) {
			res.send(result)
		});
	}
});
app.post('/addreservationtype', function (req, res) {
	reservation.insertReservationType(req.body.reservTypeName, req.body.reservTypeDescription, req.body.reservRoomPrice, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/editreservationtype', function (req, res) {
	reservation.updateReservationType(req.body.id, req.body.clientID, req.body.reservTypeName, req.body.reservTypeDescription, req.body.reservRoomPrice, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.delete('/removereservationtype', function (req, res) {
	reservation.deleteReservationType(req.query.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

//-------------------------------------------------------------------------Services

app.get('/service', function (req, res) {
	if (req.query.id !== undefined) {
		service.listService(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else {
		service.listServices(oracledb, config).then(function (result) {
			res.send(result)
		});
	}
});

app.post('/addservice', function (req, res) {
	service.insertService(req.body.serviceTypeID, req.body.reservID, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/editservice', function (req, res) {
	service.updateService(req.body.id, req.body.serviceTypeID, req.body.serviceStartingDate, req.body.reservID, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.delete('/removeservice', function (req, res) {
	service.deleteService(req.query.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

//------service types

app.get('/servicetypes', function (req, res) {
	if (req.query.id !== undefined) {
		service.listServiceType(req.query.id, oracledb, config).then(function (result) {
			res.send(result)
		});
	} else if (req.query.serviceTypeName !== undefined) {
		service.searchServiceType(req.query.serviceTypeName, oracledb, config).then(function (result) {
			res.send(result)
		})
	} else {
		service.listServiceTypes(oracledb, config).then(function (result) {
			res.send(result)
		});
	}
});

app.post('/addservicetype', function (req, res) {
	service.insertServiceType(req.body.serviceTypeName, req.body.serviceTypeDescription, req.body.serviceTypePrice, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.post('/editservicetype', function (req, res) {
	service.updateServiceType(req.body.id, req.body.serviceTypeName, req.body.serviceTypeDescription, req.body.serviceTypePrice, oracledb, config)
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});
app.delete('/removeservicetype', function (req, res) {
	service.deleteServiceType(req.query.id, oracledb, config);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

app.listen(3001);
module.exports = app;