(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($location, $rootScope, FormService) {
        var vm = this;

        var user = $rootScope.currentUser;
        vm.location = $location;

        function updateForms(){
            FormService
                .findAllFormsForUser(user._id)
                .then(
                    function (response) {
                        vm.forms = response.data;
                    });
        }

        updateForms();

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.formFields = formFields;


        function formFields(form){
            $location.url("/form/" + form._id + "/fields");
        }


        function addForm(form) {
            FormService
                .createFormForUser(user._id, form)
                .then(
                    function(response) {
                        console.log(response.data);
                        updateForms();
                        vm.form = null;
                    });
        }

        function updateForm(form) {
            FormService
                .updateFormById(form._id, form)
                .then(
                    function(response) {
                        updateForms();
                        vm.form = null;
                    });
        }

        function deleteForm(index) {
            FormService
                .deleteFormById(vm.forms[index]._id)
                .then(
                    function(response) {
                        updateForms();
                    });
        }

        function selectForm(index) {
            var selectedForm = vm.forms[index];
            vm.form = {
                _id : selectedForm._id,
                title: selectedForm.title,
                userId: selectedForm.userId
            };
        }
    }
})();