(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];
        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        var api = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };

        return api;

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
            /*
            var _id = (new Date).getTime();
            var title = form.title;
            var newForm = {_id: _id, title: title, userId: userId};
            forms.push(newForm);
            callback(newForm);*/
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
            /*
            var formsList = [];
            for (var form in forms) {
                if (forms[form].userId === userId) {
                    formsList.push(forms[form]);
                }
            }
            callback(formsList);*/
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
            /*
            for (var form in forms) {
                if (forms[form]._id === formId) {
                    var index = forms.indexOf(forms[form]);
                    forms.splice(index, 1);
                }
            }
            callback(forms);*/
        }

        function updateFormById(formId, newForm, callback) {
            return $http.put("/api/assignment/form/" + formId);
            /*
            for (var form in forms) {
                if (forms[form]._id === formId) {
                    forms[form] = {
                        _id : formId,
                        title: newForm.title,
                        userId: newForm.userId
                    };
                }
            }
            callback(newForm);*/
        }
    }
})();