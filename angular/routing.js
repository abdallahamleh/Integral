app.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/login');

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'html/login/login.html',
			controller: "loginController"
		})
		.state('home', {
			url: '/home',
			templateUrl: 'html/home/main.html',
			controller: "mainController"
		})
		.state("home.item", {
			url: '/item',
			templateUrl: "html/item/items.html",
			controller: "itemController"
		})
		.state("home.home", {
			url: '/main',
			templateUrl: "html/home/home.html"
		})
		.state("home.addItem", {
			url: '/addItem',
			templateUrl: "html/item/additem.html",
			controller: "itemAddController"
		})
		.state("home.editItem", {
			url: '/editItem/:id',
			templateUrl: "html/item/editItem.html",
			controller: "itemEditController"
		})
		.state("home.addItemType", {
			url: '/addItemType',
			templateUrl: "html/item/additemtype.html",
			controller: "itemTypeAddController"
		})
		.state("home.supplier", {
			url: '/supplier',
			templateUrl: "html/supplier/supplier.html",
			controller: "supplierController"
		})
		.state("home.viewSupp", {
			url: '/viewSupp/:id',
			templateUrl: "html/supplier/viewSupplier.html",
			controller: "supplierViewController"
		})
		.state("home.addSupplier", {
			url: '/addSupplier',
			templateUrl: "html/supplier/addsupplier.html",
			controller: "supplierAddController"
		})
		.state("home.editSupplier", {
			url: '/editSupplier/:id',
			templateUrl: "html/supplier/editSupplier.html",
			controller: "supplierEditController"
		})
		.state("home.viewSuppItems", {
			url: '/viewSuppItems/:id',
			templateUrl: "html/supplier/viewSupplierItems.html",
			controller: "supplierViewItemsController"

		})
		.state("home.manageItemType", {
			url: '/manageItemType',
			templateUrl: "html/item/manageItemTypes.html",
			controller: "itemTypeManageController"

		})
		.state("home.employees", {
			url: '/employees',
			templateUrl: "html/employee/employees.html",
			controller: "employeeController"

		})
		.state("home.addEmployee", {
			url: '/addEmployee',
			templateUrl: "html/employee/addEmployee.html",
			controller: "employeeAddController"

		})
		.state("home.viewEmployee", {
			url: '/viewEmployee/:id',
			templateUrl: "html/employee/viewEmployee.html",
			controller: "employeeViewController"

		})
		.state("home.editEmployee", {
			url: '/editEmployee/:id',
			templateUrl: "html/employee/editEmployee.html",
			controller: "employeeEditController"

		})
		.state("home.managePermissions", {
			url: '/managePermissions/:id',
			templateUrl: "html/employee/managePermissions.html",
			controller: "managePermissionsController"

		})
		.state("home.pendingRequests", {
			url: '/pendingRequests',
			templateUrl: "html/requests/pendingRequests.html",
			controller: "requestPendingController"
		})
		.state("home.completedRequests", {
			url: '/completedRequests',
			templateUrl: "html/requests/completedRequests.html",
			controller: "requestCompletedController"
		})
		.state("home.room", {
			url: '/room',
			templateUrl: "html/room/rooms.html",
			controller: "roomsController"
		})
		.state("home.addRoom", {
			url: '/addRoom',
			templateUrl: "html/room/addRoom.html",
			controller: "roomAddController"
		})
		.state("home.viewRoom", {
			url: '/viewRoom/:id',
			templateUrl: "html/room/viewRoom.html",
			controller: "roomViewController"
		})
		.state("home.editRoom", {
			url: '/editRoom/:id',
			templateUrl: "html/room/editRoom.html",
			controller: "roomEditController"
		})
		.state("home.manageRoomType", {
			url: '/manageRoomType',
			templateUrl: "html/room/manageRoomType.html",
			controller: "roomTypeManageController"

		})
		.state("home.addRoomType", {
			url: '/addRoomType',
			templateUrl: "html/room/addRoomType.html",
			controller: "roomTypeAddController"

		})
		.state("home.service", {
			url: '/services',
			templateUrl: "html/service/services.html",
			controller: "serviceController"
		})
		.state("home.addService", {
			url: '/addService',
			templateUrl: "html/service/addService.html",
			controller: "serviceAddController"
		})
		.state("home.editService", {
			url: '/editService/:id',
			templateUrl: "html/service/editService.html",
			controller: "serviceEditController"
		})
		.state("home.client", {
			url: '/client',
			templateUrl: "html/client/clients.html",
			controller: "clientController"
		})
		.state("home.addClient", {
			url: '/addClient',
			templateUrl: "html/client/addClient.html",
			controller: "clientAddController"
		})
		.state("home.editClient", {
			url: '/editClient/:id',
			templateUrl: "html/client/editClient.html",
			controller: "clientEditController"
		})
		.state("home.viewClient", {
			url: '/viewClient/:id',
			templateUrl: "html/client/viewClient.html",
			controller: "clientViewController"
		})
		.state("home.reservation", {
			url: '/reservation',
			templateUrl: "html/reservation/reservations.html",
			controller: "reservationController"
		})
		.state("home.completedReservations", {
			url: '/completedReservations',
			templateUrl: "html/reservation/completedReservations.html",
			controller: "reservationCompletedController"
		})
		.state("home.manageReservationType", {
			url: '/manageReservationTypes',
			templateUrl: "html/reservation/manageReservationTypes.html",
			controller: "reservationTypeManageController"
		})
		.state("home.addReservationType", {
			url: '/addReservationType',
			templateUrl: "html/reservation/addReservationType.html",
			controller: "reservationTypeAddController"
		})
		.state("home.addReservation", {
			url: '/addReservation',
			templateUrl: "html/reservation/addReservation.html",
			controller: "reservationAddController"
		})
		.state("home.viewReservation", {
			url: '/viewReservation/:id',
			templateUrl: "html/reservation/viewReservation.html",
			controller: "reservationViewController"
		})
		.state("home.viewCompReservation", {
			url: '/viewCompReservation/:id',
			templateUrl: "html/reservation/viewCompReservation.html",
			controller: "reservationCompletedViewController"
		})
		.state("home.editReservation", {
			url: '/editReservation/:id',
			templateUrl: "html/reservation/editReservation.html",
			controller: "reservationEditController"
		})
		.state("home.viewBill", {
			url: '/viewBill/:id',
			templateUrl: "html/reservation/viewBill.html",
			controller: "viewBillController"
		})
		.state("home.viewBillCompleted", {
			url: '/viewBillCompleted/:id',
			templateUrl: "html/reservation/viewBillCompleted.html",
			controller:"viewCompletedBillController"
		});
});