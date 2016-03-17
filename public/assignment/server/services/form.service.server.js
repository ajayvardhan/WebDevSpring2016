module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", findFormsForUser);
    app.get("/api/assignment/form/:formId", findFormByID);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);

    function findFormsForUser(req, res){
        var forms = formModel.findFormsForUser(parseInt(req.params.userId));
        res.json(forms);
    }

    function findFormByID(req, res){
        var form = formModel.findFormByID(parseInt(req.params.formId));
        res.json(form);
    }

    function deleteForm(req, res){
        var forms = formModel.deleteForm(parseInt(req.params.formId));
        res.json(forms);
    }

    function createForm(req, res){
        var forms = formModel.createForm(parseInt(req.params.userId), req.body);
        res.json(forms);
    }

    function updateForm(req, res){
        var forms = formModel.updateForm(parseInt(req.params.formId), req.body);
        res.json(forms);
    }
};