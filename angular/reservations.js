app.controller('reservationTypeAddController', function ($scope, $http, $window) {
    $scope.addResType = function () {
        $http({
            url: 'http://localhost:3001/addreservationtype',
            method: "POST",
            data: { "reservTypeName": $scope.reservTypeName, "reservTypeDescription": $scope.reservTypeDescription, "reservRoomPrice": $scope.reservRoomPrice }
        })
            .then(function (response) {
                $window.location.href = '#!/home/manageReservationTypes';
            },
                function (response) {
                    console.log("fail");
                });
    }
});
app.controller('reservationTypeManageController', function ($scope, $http, $state) {
    $http.get("http://localhost:3001/reservationtype")
        .then(function (response) {
            $scope.types = response.data;
        }
        );
    $scope.deleteType = function (id) {
        $http.delete('http://localhost:3001/removereservationtype?id=' + id).then(
            function () {
                $state.reload();
            },
            function () {
                console.log("error");
            });
    }
});
app.controller('reservationAddController', function ($scope, $filter, $http, $window, $cookieStore) {
    $http.get("http://localhost:3001/reservationtype")
        .then(function (response) {
            $scope.types = response.data;
        }
        );
    $http.get("http://localhost:3001/room")
        .then(function (response) {
            $scope.rooms = response.data;
        }
        );
    $http.get("http://localhost:3001/client")
        .then(function (response) {
            $scope.clients = response.data;
        }
        );
    $scope.selectTheClient = function (client) {
        $scope.selectedClient = client;
    }
    $scope.searchClient = function () {
        $http.get("http://localhost:3001/client?clientLastName=" + $scope.clientSearchValue)
            .then(function (response) {
                $scope.clients = response.data;
            }
            );
    }

    $scope.selectTheRoom = function (room) {

        $scope.selectedRoom = room;
    }
    $scope.searchRoom = function () {
        $http.get("http://localhost:3001/room?roomNum=" + $scope.roomSearchValue)
            .then(function (response) {
                $scope.rooms = response.data;
            }
            );
    }
    $scope.$watch('outDate', function (newValue) {
        $scope.outDate = $filter('date')(newValue, 'dd/MM/yyyy');
    });
    $scope.$watch('inDate', function (newValue) {
        $scope.inDate = $filter('date')(newValue, 'dd/MM/yyyy');
    });
    $scope.addReserv = function () {
        $http({
            url: 'http://localhost:3001/addreservation',
            method: "POST",
            data: {
                "clientID": $scope.selectedClient.CLIENTID, "roomNum": $scope.selectedRoom.ROOMNUM, "reservTypeId": $scope.resTypeName.RESERVTYPEID, "empID": $cookieStore.get('loggedemp'), "reservCheckInDate": $scope.inDate, "reservCheckOutDate": $scope.outDate
            }
        })
            .then(
                function (response) {
                    $window.location.href = '#!/home/reservation';
                },
                function (response) {
                    console.log("fail");
                });
    }
});
app.controller('reservationController', function ($scope, $http, $state) {
    $http.get("http://localhost:3001/reservationavailable")
        .then(function (response) {
            $scope.reservations = response.data;
        }
        );

    $scope.removeRes = function (id) {
        $http.delete('http://localhost:3001/removereservation?id=' + id).then(
            function () {
                $state.reload();
            },
            function () {
                console.log("error");
            });
    }
    $scope.searchRes = function () {
        $http.get("http://localhost:3001/reservationavailable?id=" + $scope.searchValue)
            .then(function (response) {
                $scope.reservations = response.data;
            }
            );
    }
});

app.controller('reservationEditController', function ($scope, $filter, $http, $stateParams, $window) {
    $http.get("http://localhost:3001/reservationtype")
        .then(function (response) {
            $scope.types = response.data;
        }
        );
    $http.get("http://localhost:3001/room")
        .then(function (response) {
            $scope.rooms = response.data;
        }
        );
    $http.get("http://localhost:3001/client")
        .then(function (response) {
            $scope.clients = response.data;
        }
        );

    $scope.selectTheClient = function (client) {
        $scope.client = client.CLIENTID;
        $scope.clientLastName = client.CLIENTLASTNAME;
    }
    $scope.searchClient = function () {
        $http.get("http://localhost:3001/client?clientLastName=" + $scope.clientSearchValue)
            .then(function (response) {
                $scope.clients = response.data;
            }
            );
    }

    $scope.selectTheRoom = function (room) {
        $scope.room = room.ROOMNUM;
    }
    $scope.searchRoom = function () {
        $http.get("http://localhost:3001/room?roomNum=" + $scope.roomSearchValue)
            .then(function (response) {
                $scope.rooms = response.data;
            }
            );
    }
    $http.get("http://localhost:3001/reservation?mainId=" + $stateParams.id)
        .then(function (response) {
            $scope.client = response.data[0].CLIENTID;
            $scope.room = response.data[0].ROOMNUM;
            $scope.clientLastName = response.data[0].CLIENTLASTNAME;
            $scope.mainid = response.data[0].RESERVID;
            $scope.resid = response.data[0].RESERVTYPEID;
            $scope.resname = response.data[0].RESERVTYPENAME;
            $scope.emp = response.data[0].EMPID;
        }
        );
    $scope.$watch('outDate', function (newValue) {
        $scope.outDate = $filter('date')(newValue, 'dd/MM/yyyy');
    });
    $scope.$watch('inDate', function (newValue) {
        $scope.inDate = $filter('date')(newValue, 'dd/MM/yyyy');
        console.log($scope.inDate)
    });
    $http.get("http://localhost:3001/reservationtype")
        .then(function (response) {
            $scope.types = response.data;
            for (var i = 0; i < $scope.types.length; i++) {
                if ($scope.types[i].RESERVTYPENAME == $scope.resname) {
                    $scope.resname = $scope.types[i];
                }
            }
        }
        );
    $scope.editResPost = function () {
        $http({
            url: 'http://localhost:3001/editreservation',
            method: "POST",
            data: { "id": $stateParams.id, "clientID": $scope.client, "roomNum": $scope.room, "reservTypeId": $scope.resname.RESERVTYPEID, "empID": $scope.emp, "reservCheckInDate": $scope.inDate, "reservCheckOutDate": $scope.outDate }
        })
            .then(function (response) {
                $window.location.href = '#!/home/reservation';
            },
                function (response) {
                    console.log("fail");
                });
    }
});

app.controller('reservationViewController', function ($scope, $http, $state, $stateParams) {
    $scope.resID = $stateParams.id;
    $http.get("http://localhost:3001/reservation?mainId=" + $stateParams.id)
        .then(function (response) {
            $scope.viewRes = response.data[0];
            $scope.viewRes.RESERVCHECKINDATE = $scope.viewRes.RESERVCHECKINDATE.substring(0, 10);
            $scope.viewRes.RESERVCHECKOUTDATE = $scope.viewRes.RESERVCHECKOUTDATE.substring(0, 10);
        }
        );
    $http.get("http://localhost:3001/reservationservices?id=" + $stateParams.id)
        .then(function (response) {
            $scope.services = response.data;
        }
        );
    $http.get("http://localhost:3001/servicetypes")
        .then(function (response) {
            $scope.types = response.data;
        }
        );

    $scope.selectService = function (service) {
        $http({
            url: 'http://localhost:3001/addservice',
            method: "POST",
            data: { "serviceTypeID": service.SERVICETYPEID, "reservID": $stateParams.id }
        })
            .then(function (response) {
                $state.reload();
            },
                function (response) {
                    console.log("fail");
                });
    }
    $scope.deleteService = function (id) {
        $http.delete('http://localhost:3001/removeservice?id=' + id).then(
            function () {
                $state.reload();
            },
            function () {
                console.log("error");
            });
    }
});
app.controller('viewBillController', function ($scope, $http, $state, $window, $stateParams) {

    $scope.totalServices = 0;
    $scope.totalRoom = 0;
    $scope.total = 0;
    $http.get("http://localhost:3001/reservation?mainId=" + $stateParams.id)
        .then(function (response) {
            $scope.res = response.data[0];
            var date2 = new Date($scope.res.RESERVCHECKOUTDATE);
            var date1 = new Date($scope.res.RESERVCHECKINDATE);
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            $http.get("http://localhost:3001/room?roomNum=" + $scope.res.ROOMNUM)
                .then(function (response) {
                    $scope.room = response.data[0];
                    $scope.totalRoom = $scope.room.ROOMPRICE * diffDays;
                    $scope.total += $scope.totalRoom;
                }
                );
        }
        );
    $http.get("http://localhost:3001/reservationservices?id=" + $stateParams.id)
        .then(function (response) {
            $scope.services = response.data;
            for (var i = 0; i < $scope.services.length; i++) {
                $scope.totalServices += $scope.services[i].SERVICETYPEPRICE;
            }
            $scope.total += $scope.totalServices;
        }
        );
    $scope.return = function () {
        $window.location.href = '#!/home/viewReservation/' + $stateParams.id;
    }
});

app.controller('reservationCompletedController', function ($scope, $http, $state) {
    $http.get("http://localhost:3001/reservationdone")
        .then(function (response) {
            $scope.reservations = response.data;
            for (var i = 0; i < $scope.reservations.length; i++) {
                if ($scope.reservations[i].ISPAID == 0) {
                    $scope.reservations[i].paid = 'No';
                } else {
                    $scope.reservations[i].paid = 'Yes';
                }
            }
        }
        );

    $scope.searchRes = function () {
        $http.get("http://localhost:3001/reservationdone?id=" + $scope.searchValue)
            .then(function (response) {
                $scope.reservations = response.data;
                for (var i = 0; i < $scope.reservations.length; i++) {
                    if ($scope.reservations[i].ISPAID == 0) {
                        $scope.reservations[i].paid = 'No';
                    } else {
                        $scope.reservations[i].paid = 'Yes';
                    }
                }
            }
            );
    }
});

app.controller('reservationCompletedViewController', function ($scope, $http, $state, $stateParams) {
    $scope.resID = $stateParams.id;
    $http.get("http://localhost:3001/reservation?mainId=" + $stateParams.id)
        .then(function (response) {
            $scope.viewRes = response.data[0];
            $scope.viewRes.RESERVCHECKINDATE = $scope.viewRes.RESERVCHECKINDATE.substring(0, 10);
            $scope.viewRes.RESERVCHECKOUTDATE = $scope.viewRes.RESERVCHECKOUTDATE.substring(0, 10);
        }
        );
    $http.get("http://localhost:3001/reservationservices?id=" + $stateParams.id)
        .then(function (response) {
            $scope.services = response.data;
        }
        );
});

app.controller('viewCompletedBillController', function ($scope, $http, $state, $window, $stateParams) {

    $scope.totalServices = 0;
    $scope.totalRoom = 0;
    $scope.total = 0;
    $http.get("http://localhost:3001/reservation?mainId=" + $stateParams.id)
        .then(function (response) {
            $scope.res = response.data[0];
            if ($scope.res.ISPAID == 0) {
                $scope.notPaid = true;
            } else {
                $scope.notPaid = false;
            }
            var date2 = new Date($scope.res.RESERVCHECKOUTDATE);
            var date1 = new Date($scope.res.RESERVCHECKINDATE);
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            $http.get("http://localhost:3001/room?roomNum=" + $scope.res.ROOMNUM)
                .then(function (response) {
                    $scope.room = response.data[0];
                    $scope.totalRoom = $scope.room.ROOMPRICE * diffDays;
                    $scope.total += $scope.totalRoom;
                }
                );
        }
        );
    $http.get("http://localhost:3001/reservationservices?id=" + $stateParams.id)
        .then(function (response) {
            $scope.services = response.data;
            for (var i = 0; i < $scope.services.length; i++) {
                $scope.totalServices += $scope.services[i].SERVICETYPEPRICE;
            }
            $scope.total += $scope.totalServices;
        }
        );
    $scope.return = function () {
        $window.location.href = '#!/home/viewCompReservation/' + $stateParams.id;
    }
    $scope.payBill = function () {
        $http({
            url: 'http://localhost:3001/checkout',
            method: "POST",
            data: { "id": $stateParams.id }
        })
            .then(function (response) {
                $window.location.href = '#!/home/completedReservations';
            },
                function (response) {
                    console.log("fail");
                });
    }
});