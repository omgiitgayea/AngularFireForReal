/**
 * Created by GodaiYuusaku on 1/31/17.
 */
(function () {
    angular
        .module("myApp")
        .component("testPage", {
            templateUrl: "test.page.html",
            controller: TestingController,
            controllerAs: "vm"
        });

    function TestingController($firebaseArray) {
        var vm = this;
        vm.name = "";
        vm.item = "";
        vm.currName = "";
        vm.items = [];
        vm.listArray = [];

        var ref = firebase.database().ref("names");
        vm.names = $firebaseArray(ref);

        // sets a current list
        vm.names.$loaded(function () {
            vm.currName = vm.names[0];
        }, function (error) {
            console.error("Error:", error);
        });

        // really easy to add a list
        vm.addName = function () {
            vm.names.$add({name: vm.name, items: "empty"}).then(function () {
                vm.currName = vm.names[vm.names.length - 1];
            });
            vm.name = "";
        };
        // really easy to remove a list
        vm.delName = function (name) {
            vm.names.$remove(name).then(function () {
                if (vm.currName === name) {
                    vm.currName = vm.names[0];
                }
            });
        };

        vm.setList = function (name) {
            vm.currName = name;
        };

        vm.addItem = function () {
            var currIndex = getDBIndex();
            if (vm.currName.items === "empty") {
                vm.currName.items = [vm.item];
            }
            else {
                vm.currName.items.push(vm.item);
            }
            vm.names[currIndex].items = vm.currName.items;
            vm.names.$save(currIndex);
            vm.item = "";
        };

        vm.delItem = function(item) {
            var currIndex = getDBIndex();
            vm.currName.items.splice(vm.currName.items.indexOf(item), 1);
            vm.names[currIndex].items = vm.currName.items;
            vm.names.$save(currIndex);
        };

        function getDBIndex() {
            for (var i = 0; i < vm.names.length; i++) {
                if (vm.names[i] === vm.currName) {
                    return i;
                }
            }
        }
    }
})();