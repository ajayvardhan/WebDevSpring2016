var q = require("q");

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);

    var FormModel = mongoose.model('Form', FormSchema);

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

    function createForm(form){
        var deferred = q.defer();
        FormModel.create(form, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;

        /*var _id = uuid.v1();
        var title = form.title;
        var newForm = {_id: _id, title: title, userId: userId, fields: []};
        data.push(newForm);
        return data;*/
    }

    function findAllForms(){
        var deferred = q.defer();
        FormModel.find(function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }

    function findFormByID(id){
        var deferred = q.defer();
        FormModel.findById(id,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;

        /*for (var form in data){
            if(data[form]._id == (id)){
                return data[form];
            }
        }
        return null;*/
    }

    function findFormByTitle(title){
        var deferred = q.defer();
        FormModel.findOne({title : title},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;

        /*for (var form in data){
            if(data[form].title == (title)){
                return data[form];
            }
        }
        return null;*/
    }

    function updateForm(id, form) {
        var deferred = q.defer();
        FormModel.update(
            {_id : id}, {$set: form},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;

        /*for (var f in data){
            if(data[f]._id == id){
                data[f] = form;
            }
        }
        return data;*/
    }

    function deleteForm(id) {
        var deferred = q.defer();
        FormModel.remove({_id : id},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;

        /*for (var f in data){
            if(data[f]._id == (id)){
                data.splice(data.indexOf(data[f]), 1);
            }
        }
        return data;*/
    }

    function findFormsForUser(userId){
        var deferred = q.defer();
        FormModel.find({userId : userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }
};