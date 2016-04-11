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


        /*var deferred = q.defer();
        form.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    for (var f in doc.fields){
                        if (doc.fields[f]._id == fieldId){
                            doc.fields[f] = field;
                        }
                    }
                    doc.save(function(err,doc){
                        if (err){
                            deferred.reject(err);
                        }
                        else{
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;*/
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

        /*var deferred = q.defer();
        form.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    for (var field in doc.fields){
                        if (doc.fields[field]._id == fieldId){
                            doc.fields.splice(doc.fields.indexOf(doc.fields[field]), 1);
                        }
                    }
                    doc.save(function(err,doc){
                        if (err){
                            deferred.reject(err);
                        }
                        else{
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;*/
    }

    function createFieldForForm(id, field){
        return form.findById(id)
            .then(
                function(f) {
                    f.fields.push(field);
                    return f.save();
                }
            );

        /*var deferred = q.defer();
        form.findById(id,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    doc.fields.push(field);
                    doc.save(function(err,doc){
                        if (err){
                            deferred.reject(err);
                        }
                        else{
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;*/
    }

    function findFieldsForForm(id){
        return form.findById(id).select("fields");

        /*var deferred = q.defer();
        form.findById(id,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc.fields);
                }

            });
        return deferred.promise;*/
    }

};