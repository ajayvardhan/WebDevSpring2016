var q = require("q");

module.exports = function(formModel) {

    var api = {
        findFieldsForForm : findFieldsForForm,
        createFieldForForm : createFieldForForm,
        deleteFieldForForm : deleteFieldForForm,
        updateFieldForForm : updateFieldForForm,
        findFieldForForm : findFieldForForm
    };

    return api;

    function findFieldForForm(formId, fieldId){
        return formModel
            .findById(formId)
            .then(
                function(form){
                    return form.fields.id(fieldId);
                }
            );


        /*for (var form in data){
            if(data[form]._id == formId){
                for (var f in data[form].fields){
                    if(data[form].fields[f]._id == fieldId){
                        return data[form].fields[field];
                    }
                }
            }
        }*/
    }

    function updateFieldForForm(formId, fieldId, field){
        return formModel
            .findById(formId)
            .then(
                function(form){
                    var new_field = form.fields.id(fieldId);
                    new_field.label  = field.label;
                    new_field.type  = field.type;
                    new_field.placeholder  = field.placeholder;
                    new_field.options  = field.options;
                    return form.save();
                }
            );

        /*for (var form in data){
            if(data[form]._id == formId){
                for (var f in data[form].fields){
                    if(data[form].fields[f]._id == fieldId){
                        data[form].fields[field] = field;
                    }
                }
                return data[form].fields;
            }
        }*/
    }

    function deleteFieldForForm(formId, fieldId){
        return formModel
            .findById(formId)
            .then(
                function(form){
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            );

        /*for (var form in data){
            if(data[form]._id == formId){
                for (var field in data[form].fields){
                    if(data[form].fields[field]._id == fieldId){
                        data[form].fields.splice(data[form].fields.indexOf(data[form].fields[field]), 1);
                    }
                }
                return data[form].fields;
            }
        }*/
    }

    function createFieldForForm(id, field){
        return formModel.findById(id)
            .then(
                function(form) {
                    form.fields.push(field);
                    return form.save();
                }
            );

        /*for (var form in data){
            if(data[form]._id == id){
                var f = field;
                f._id = uuid.v1();
                data[form].fields.push(f);
                return data[form].fields;
            }
        }*/
    }

    function findFieldsForForm(id){
        return formModel.findById(id).select("fields");

        /*for (var form in data){
            if(data[form]._id == (id)){
                return data[form].fields;
            }
        }
        return null;*/
    }

};