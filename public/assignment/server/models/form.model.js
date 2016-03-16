var data = require("./form.mock.json");

module.exports = function(app) {
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormByID: findFormByID,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle
    };

    return api;

    function createForm(form){
    }

    function findAllForms(){
    }

    function findFormByID(id){
    }

    function findFormByTitle(title){
    }

    function updateForm(id, user) {
    }

    function deleteForm(id) {
    }
};