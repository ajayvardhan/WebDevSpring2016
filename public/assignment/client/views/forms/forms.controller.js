(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, $location, $rootScope, FormService) {
        var user = $rootScope.currentUser;
        $scope.location = $location;

        function updateForms(){
            FormService
                .findAllFormsForUser(user._id)
                .then(
                    function (response) {
                        $scope.forms = response.data;
                    });
        }

        updateForms();

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        function addForm(form) {
            FormService
                .createFormForUser(user._id, form)
                .then(
                    function(response) {
                        updateForms();
                        //$scope.forms.push(response.data);
                        $scope.form = null;
                    });
        }

        function updateForm(form) {
            FormService
                .updateFormById(form._id, form)
                .then(
                    function(response) {
                        updateForms();
                        $scope.form = null;
                        /*
                         var id = response.data._id;
                         for (var form in $scope.forms){
                         if ($scope.forms[form]._id === id) {
                         $scope.forms[form] = response.data;
                         }
                         }*/
                    });
        }

        function deleteForm(index) {
            FormService
                .deleteFormById($scope.forms[index]._id)
                .then(
                    function(response) {
                        updateForms();
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