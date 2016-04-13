var q = require("q");

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);

    var form = mongoose.model('FormModel', FormSchema);

    var api = {
        findFieldsForForm : findFieldsForForm,
        createFieldForForm : createFieldForForm,
        deleteFieldForForm : deleteFieldForForm,
        updateFieldForForm : updateFieldForForm,
        findFieldForForm : findFieldForForm
    };

    return api;

    function findFieldForForm(formId, fieldId){
        return form
            .findById(formId)
            .then(
                function(f){
                    return f.fields.id(fieldId);
                }
            );

        /*var deferred = q.defer();
        form.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    for (var field in doc.fields){
                        if (doc.fields[field]._id == fieldId){
                            deferred.resolve(doc.fields[field]);
                        }
                    }
                }
            });
        return deferred.promise;*/
    }

    function updateFieldForForm(formId, fieldId, field){
        return form
            .findById(formId)
            .then(
                function(f){
                    var new_field = f.fields.id(fieldId);
                    new_field.label  = field.label;
                    new_field.placeholder = field.placeholder;
                    new_field.options = field.options;
                    return f.save();
                }
            );
    }

    function deleteFieldForForm(formId, fieldId){
        return form
            .findById(formId)
            .then(
                function(f){
                    f.fields.id(fieldId).remove();
                    return f.save();
                }
            );
    }

    function createFieldForForm(id, field){
        return form.findById(id)
            .then(
                function(f) {
                    f.fields.push(field);
                    return f.save();
                }
            );
    }

    function findFieldsForForm(id){
        return form.findById(id).select("fields");
    }

};