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
        var deferred = q.defer();
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
        return deferred.promise;
    }

    function updateFieldForForm(formId, fieldId, field){
        var deferred = q.defer();
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
        return deferred.promise;
    }

    function deleteFieldForForm(formId, fieldId){
        var deferred = q.defer();
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
        return deferred.promise;
    }

    function createFieldForForm(id, field){
        var deferred = q.defer();
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
        return deferred.promise;
    }

    function findFieldsForForm(id){
        var deferred = q.defer();
        form.findById(id,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc.fields);
                }

            });
        return deferred.promise;
    }

};