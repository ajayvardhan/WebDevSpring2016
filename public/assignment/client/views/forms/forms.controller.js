(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($location, UserService, FormService) {
        var vm = this;

        vm.location = $location;

        function updateForms(){
            UserService
                .getCurrentUser()
                .then(
                    function(response){
                        FormService
                            .findAllFormsForUser(response.data._id)
                            .then(
                                function (res) {
                                    vm.forms = res.data;
                                });
                    }
                );

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
            UserService
                .getCurrentUser()
                .then(
                    function(response){
                        FormService
                            .createFormForUser(response.data._id, form)
                            .then(
                                function(res) {
                                    updateForms();
                                    vm.form = null;
                                });
                    }
                );
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