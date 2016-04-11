(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService){
        var vm = this;

        function init(){
            FieldService
                .findFieldsForForm($routeParams.formId)
                .then(
                    function(response){
                        vm.fields = response.data.fields;
                    }
                );
        }

        init();

        vm.addField = addField;
        vm.createField = createField;
        vm.removeField = removeField;
        vm.editField = editField;

        function editField(field){
            vm.field = field;
            var fieldOptions = [];
            for (var option in vm.field.options){
                var str = vm.field.options[option].label + ":" + vm.field.options[option].value + "\n";
                fieldOptions.push(str);
            }
            vm.field.fieldOptions = fieldOptions;
        }

        function removeField(field){
            FieldService
                .deleteFieldFromForm($routeParams.formId, field._id)
                .then(
                    function(response){
                        init();
                    }
                )
        }


        function addField(type){
            if (type == "singlelinetext"){
                vm.field = {
                    label: "New Text Field",
                    type : "TEXT",
                    placeholder : "New Field"
                }
            }
            else if (type == "paragraphtextfield"){
                vm.field = {
                    label: "New Text Field",
                    type : "TEXTAREA",
                    placeholder : "New Field"
                }
            }
            else if (type == "date"){
                vm.field = {
                    label: "New Date Field",
                    type : "DATE"
                }
            }
            else if (type == "dropdown"){
                vm.field = {
                    label: "New Dropdown",
                    type : "OPTIONS",
                    options : [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                }
            }
            else if (type == "checkboxes"){
                vm.field = {
                    label: "New Checkboxes",
                    type : "CHECKBOXES",
                    options : [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                }
            }
            else if (type == "radiobuttons"){
                vm.field = {
                    label: "New Radio Buttons",
                    type : "RADIOS",
                    options : [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                }
            }
            FieldService
                .createFieldForForm($routeParams.formId, vm.field)
                .then(
                    function(response){
                        vm.fields = response.data.fields;
                    }
                );
        }


        function createField(field){
            FieldService
                .createFieldForForm($routeParams.formId, vm.field)
                .then(
                    function(response){

                    }
                );
        }
    }
})();