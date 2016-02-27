(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, $rootScope, $location, FormService) {
        var user = $rootScope.currentUser;
        $scope.location = $location;

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function updateFormsForUser() {
            FormService.findAllFormsForUser(user._id,
                function (response) {
                    $scope.forms = response;
                });
        }

        updateFormsForUser();

        function addForm(form) {
            FormService.createFormForUser(user._id, form,
                function(response) {
                    $scope.forms.push(response);
                    $scope.form = null;
                });
        }

        function updateForm(form) {
            FormService.updateFormById(form._id, form,
                function(response) {
                    var id = response._id;
                    for (var form in $scope.forms){
                        if ($scope.forms[form]._id === id) {
                            $scope.forms[form] = response;
                        }
                    }
                });
            $scope.form = null;
        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.forms[index]._id,
                function(response) {
                    $scope.forms.splice(index,1);
                });
        }

        function selectForm(index) {
            var selectedForm = $scope.forms[index];
            $scope.form = {
                _id : selectedForm._id,
                title: selectedForm.title,
                userId: selectedForm.userId
            };
        }
    }
})();