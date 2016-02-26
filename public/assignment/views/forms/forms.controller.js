(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, $rootScope, FormService){
        var user = $rootScope.currentUser;
        FormService.findAllFormsForUser(user._id,function(response){
            $scope.forms = response;
            console.log(response);
        });


        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(form){
            FormService.createFormForUser(user._id, form, function(response){
                $scope.forms.push(response);
            });
        }

        function updateForm(form){
            FormService.updateFormById(form._id, form, function(response){
                var index = $scope.forms.indexOf(response);
                $scope.forms[index] = response;
                $scope.form = null;
            });
        }

        function deleteForm(index){
            FormService.deleteFormById($scope.forms[index]._id,function(response){
                var forms_list = [];
                for (var form in response) {
                    if (response[form].userId == user._id) {
                        forms_list.push(response[form]);
                    }
                }
                $scope.forms = forms_list;
            });
        }

        function selectForm(index){
            $scope.form = $scope.forms[index];
        }
    }
})();