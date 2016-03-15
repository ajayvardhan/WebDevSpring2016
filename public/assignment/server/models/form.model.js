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
        console.log(form);
    }

    function findAllForms(){
        console.log(data);
    }

    function findFormByID(id){
        console.log(id);
    }

    function findFormByTitle(title){
        console.log(title);
    }

    function updateForm(id, user) {
        console.log(id, user);
    }

    function deleteForm(id) {
        console.log(id);
    }
};