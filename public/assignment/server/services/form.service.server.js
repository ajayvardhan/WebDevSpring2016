module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", findFormsForUser);
    app.get("/api/assignment/form/:formId", findFormByID);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);

    function findFormsForUser(req, res){
        var forms = formModel.findFormsForUser(req.params.userId);
        res.json(forms);
    }

    function findFormByID(req, res){
        var form = formModel.findFormByID(req.params.formId);
        res.json(form);
    }

    function deleteForm(req, res){
        var forms = formModel.deleteForm(req.params.formId);
        res.json(forms);
    }

    function createForm(req, res){
        var forms = formModel.createForm(req.params.userId, req.body);
        res.json(forms);
    }

    function updateForm(req, res){
        var forms = formModel.updateForm(req.params.formId, req.body);
        res.json(forms);
    }
};