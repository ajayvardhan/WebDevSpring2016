var data = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports = function() {
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormByID: findFormByID,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormsForUser: findFormsForUser,
        findFieldsForForm : findFieldsForForm,
        createFieldForForm : createFieldForForm,
        deleteFieldForForm : deleteFieldForForm,
        updateFieldForForm : updateFieldForForm,
        findFieldForForm : findFieldForForm
    };

    return api;

    function findFieldForForm(formId, fieldId){
        for (var form in data){
            if(data[form]._id == formId){
                for (var f in data[form].fields){
                    if(data[form].fields[f]._id == fieldId){
                        return data[form].fields[field];
                    }
                }
            }
        }
    }

    function updateFieldForForm(formId, fieldId, field){
        for (var form in data){
            if(data[form]._id == formId){
                for (var f in data[form].fields){
                    if(data[form].fields[f]._id == fieldId){
                        data[form].fields[field] = field;
                    }
                }
                return data[form].fields;
            }
        }
    }

    function deleteFieldForForm(formId, fieldId){
        for (var form in data){
            if(data[form]._id == formId){
                for (var field in data[form].fields){
                    if(data[form].fields[field]._id == fieldId){
                        data[form].fields.splice(data[form].fields.indexOf(data[form].fields[field]), 1);
                    }
                }
                return data[form].fields;
            }
        }
    }

    function createFieldForForm(id, field){
        for (var form in data){
            if(data[form]._id == id){
                var f = field;
                f._id = uuid.v1();
                data[form].fields.push(f);
                return data[form].fields;
            }
        }
    }

    function findFieldsForForm(id){
        for (var form in data){
            if(data[form]._id == (id)){
                return data[form].fields;
            }
        }
        return null;
    }

    function createForm(userId, form){
        var _id = uuid.v1();
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
            if(data[form]._id == (id)){
                return data[form];
            }
        }
        return null;
    }

    function findFormByTitle(title){
        for (var form in data){
            if(data[form].title == (title)){
                return data[form];
            }
        }
        return null;
    }

    function updateForm(id, form) {
        for (var f in data){
            if(data[f]._id == id){
                data[f] = form;
            }
        }
        return data;
    }

    function deleteForm(id) {
        for (var f in data){
            if(data[f]._id == (id)){
                data.splice(data.indexOf(data[f]), 1);
            }
        }
        return data;
    }

    function findFormsForUser(userId){
        var forms = [];
        for (var form in data){
            if(data[form].userId == (userId)){
                forms.push(data[form])
            }
        }
        return forms;
    }
};