module.exports = function(app) {
    app.get("/api/assignment/form/:formId/field", findFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByID);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.post("/api/assignment/form/:formId/field/:fieldId", updateField);

    function findFieldsForForm(req, res){
        console.log(req.params.formId);
    }

    function findFieldByID(req, res){
        console.log(req.params.formId, req.params.fieldId);
    }

    function deleteField(req, res){
        console.log(req.params.formId, req.params.fieldId);
    }

    function createField(req, res){
        console.log(req.params.formId);
    }

    function updateField(req, res){
        console.log(req.params.formId);
    }
};