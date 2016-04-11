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
        return FormModel.create(form);
    }

    function findAllForms(){
        return FormModel.find();
    }

    function findFormByID(id){
        return FormModel.findById(id);
    }

    function findFormByTitle(title){
        return FormModel.findOne({title: title});
    }

    function updateForm(id, form) {
        return FormModel.update({_id: id}, {title: form.title});
    }

    function deleteForm(id) {
        return FormModel.remove({_id: id});
    }

    function findFormsForUser(userId){
        return FormModel.find({userId : userId});
    }
};