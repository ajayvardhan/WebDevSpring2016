var data = require("./form.mock.json");

module.exports = function() {
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormByID: findFormByID,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormsForUser: findFormsForUser
    };

    return api;

    function createForm(userId, form){
        var _id = Guid.raw();
        var title = form.title;
        var newForm = {_id: _id, title: title, userId: userId, fields: []};
        data.push(newForm);
        return data;
    }

    function findAllForms(){
        return data;
    }

    function findFormByID(id){
        for (var form in data){
            if(data[form]._id === id){
                return data[form];
            }
        }
        return null;
    }

    function findFormByTitle(title){
        for (var form in data){
            if(data[form].title === title){
                return data[form];
            }
        }
        return null;
    }

    function updateForm(id, form) {
        for (var f in data){
            if(data[f]._id === id){
                data[f] = form;
            }
        }
        return data;
    }

    function deleteForm(id) {
        for (var f in data){
            if(data[f]._id === id){
                data.splice(data.indexOf(data[f]), 1);
            }
        }
        return data;
    }

    function findFormsForUser(userId){
        var forms = [];
        for (var form in data){
            if(data[form].userId === userId){
                forms.push(data[form])
            }
        }
        return forms;
    }
};