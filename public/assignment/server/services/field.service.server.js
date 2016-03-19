module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", findFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByID);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.post("/api/assignment/form/:formId/field/:fieldId", updateField);

    function findFieldsForForm(req, res){
        var fields = formModel.findFieldsForForm(req.params.formId);
        res.json(fields);
    }

    function findFieldByID(req, res){
        var field = formModel.findForm(req.params.formId, req.params.fieldId);
        res.json(field);
    }

    function deleteField(req, res){
        var fields = formModel.deleteFieldForForm(req.params.formId, req.params.fieldId);
        res.json(fields);
    }

    function createField(req, res){
        var fields = formModel.createFieldForForm(req.params.formId, req.body);
        res.json(fields);
    }

    function updateField(req, res){
        var fields = formModel.updateFieldForForm(req.params.formId, req.params.fieldId, req.body);
        res.json(fields);
    }
};