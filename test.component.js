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

        var ref = firebase.database().ref("names");
        vm.names = $firebaseArray(ref);

        vm.addName = function() {
            vm.names.$add({name: vm.name, items: "empty"});
            vm.currName = vm.name;
            vm.name = "";
        };

        vm.addItem = function() {
            vm.items.push(vm.item);
            vm.names.$save({name: vm.currName, items: vm.items});
            vm.item = "";
        }
    }
})();