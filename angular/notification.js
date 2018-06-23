app.controller('notificationController', function ($scope, $translate) {
    // --------------------- //
    // CHANGES SAVED MESSAGE //
    // --------------------- //
    $("body").off("click").on("click", "#btn-savechanges", function () {
        $.notify({
            icon: 'fa fa-check',
            message: $translate.instant('CHANGESMADENOTIFICATION'),
            element: '.card'
        }, {
                type: 'success',
                animate: {
                    enter: 'animated bounceInRight',
                    exit: 'animated bounceOut'
                },
                placement: {
                    from: "bottom",
                    align: "right"
                },
                offset: {
                    x: 0,
                    y: 70
                },
                spacing: 10,
                z_index: 1031,
            });
    });

    // ------------------------ //
    // SUPPLIER REMOVED MESSAGE //
    // ------------------------ //
    $("body").on("click", "#btn-remsupp", function () {
        $.notify({
            icon: 'fa fa-times',
            message: $translate.instant('SUPPLIERREMOVENOTIFICATION'),
            element: '.card'
        }, {
                type: 'danger',
                animate: {
                    enter: 'animated bounceInRight',
                    exit: 'animated bounceOut'
                },
                placement: {
                    from: "bottom",
                    align: "right"
                },
                offset: {
                    x: 0,
                    y: 70
                },
                spacing: 10,
                z_index: 1031,
            });
    });

    // ---------------------- //
    // SUPPLIER ADDED MESSAGE //
    // ---------------------- //
    $("body").on("click", "#btn-addsupp", function () {
        $.notify({
            icon: 'fa fa-check',
            message: $translate.instant('SUPPLIERADDNOTIFICATION'),
            element: '.card'
        }, {
                type: 'success',
                animate: {
                    enter: 'animated bounceInRight',
                    exit: 'animated bounceOut'
                },
                placement: {
                    from: "bottom",
                    align: "right"
                },
                offset: {
                    x: 0,
                    y: 70
                },
                spacing: 10,
                z_index: 1031,
            });
    });

    // -------------------- //
    // ITEM REMOVED MESSAGE //
    // -------------------- //
    $("body").on("click", "#btn-remitem", function () {
        $.notify({
            icon: 'fa fa-times',
            message: $translate.instant('ITEMREMOVENOTIFICATION'),
            element: '.card'
        }, {
                type: 'danger',
                animate: {
                    enter: 'animated bounceInRight',
                    exit: 'animated bounceOut'
                },
                placement: {
                    from: "bottom",
                    align: "right"
                },
                offset: {
                    x: 0,
                    y: 70
                },
                spacing: 10,
                z_index: 1031,
            });
    });

    // ------------------ //
    // ITEM ADDED MESSAGE //
    // ------------------ //
    $("body").on("click", "#btn-additem", function () {
        $.notify({
            icon: 'fa fa-check',
            message: $translate.instant('ITEMADDNOTIFICATION'),
            element: '.card'
        }, {
                type: 'success',
                animate: {
                    enter: 'animated bounceInRight',
                    exit: 'animated bounceOut'
                },
                placement: {
                    from: "bottom",
                    align: "right"
                },
                offset: {
                    x: 0,
                    y: 70
                },
                spacing: 10,
                z_index: 1031,
            });
    });

    // -------------------- //
    // EMPLOYEE REMOVED MESSAGE //
    // -------------------- //
    $("body").on("click", "#btn-rememployee", function () {
        $.notify({
            icon: 'fa fa-times',
            message: $translate.instant('EMPLOYEEREMOVENOTIFICATION'),
            element: '.card'
        }, {
                type: 'danger',
                animate: {
                    enter: 'animated bounceInRight',
                    exit: 'animated bounceOut'
                },
                placement: {
                    from: "bottom",
                    align: "right"
                },
                offset: {
                    x: 0,
                    y: 70
                },
                spacing: 10,
                z_index: 1031,
            });
    });

    // ------------------ //
    // EMPLOYEE ADDED MESSAGE //
    // ------------------ //
    $("body").on("click", "#btn-addemployee", function () {
        $.notify({
            icon: 'fa fa-check',
            message: $translate.instant('EMPLOYEEADDNOTIFICATION'),
            element: '.card'
        }, {
                type: 'success',
                animate: {
                    enter: 'animated bounceInRight',
                    exit: 'animated bounceOut'
                },
                placement: {
                    from: "bottom",
                    align: "right"
                },
                offset: {
                    x: 0,
                    y: 70
                },
                spacing: 10,
                z_index: 1031,
            });
    });

    // -------------------- //
    // ROOM REMOVED MESSAGE //
    // -------------------- //
    $("body").on("click", "#btn-remroom", function () {
        $.notify({
            icon: 'fa fa-times',
            message: $translate.instant('ROOMREMOVENOTIFICATION'),
            element: '.card'
        }, {
                type: 'danger',
                animate: {
                    enter: 'animated bounceInRight',
                    exit: 'animated bounceOut'
                },
                placement: {
                    from: "bottom",
                    align: "right"
                },
                offset: {
                    x: 0,
                    y: 70
                },
                spacing: 10,
                z_index: 1031,
            });
    });
    // ------------------ //
    // ROOM ADDED MESSAGE //
    // ------------------ //
    $("body").on("click", "#btn-addroom", function () {
        $.notify({
            icon: 'fa fa-check',
            message: $translate.instant('ROOMADDNOTIFICATION'),
            element: '.card'
        }, {
                type: 'success',
                animate: {
                    enter: 'animated bounceInRight',
                    exit: 'animated bounceOut'
                },
                placement: {
                    from: "bottom",
                    align: "right"
                },
                offset: {
                    x: 0,
                    y: 70
                },
                spacing: 10,
                z_index: 1031,
            });
    });

    
    
});