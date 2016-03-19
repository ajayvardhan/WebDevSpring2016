(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {
        var api = {
            findFieldsForForm: findFieldsForForm,
            createFieldForForm : createFieldForForm,
            deleteFieldFromForm : deleteFieldFromForm,
            updateField : updateField
        };

        return api;

        function updateField(formId, fieldId, field){
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function findFieldsForForm(id) {
            return $http.get("/api/assignment/form/" + id + "/field");
        }

        function createFieldForForm(formId, field){
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function deleteFieldFromForm(formId, fieldId){
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }
    }

})();