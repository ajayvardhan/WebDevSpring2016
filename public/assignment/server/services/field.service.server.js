module.exports = function(app, fieldModel) {
    app.get("/api/assignment/form/:formId/field", findFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByID);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.post("/api/assignment/form/:formId/field/:fieldId", updateField);


    function findFieldsForForm(req, res){
        fieldModel.findFieldsForForm(req.params.formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldByID(req, res){
        fieldModel.findFieldForForm(req.params.formId, req.params.fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteField(req, res){
        fieldModel.deleteFieldForForm(req.params.formId, req.params.fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function createField(req, res){
        fieldModel.createFieldForForm(req.params.formId, req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateField(req, res){
        fieldModel.updateFieldForForm(req.params.formId, req.params.fieldId, req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }
};