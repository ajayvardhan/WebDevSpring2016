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

        /*var fields = fieldModel.findFieldsForForm(req.params.formId);
        res.json(fields);*/
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

        /*var field = fieldModel.findFieldForForm(req.params.formId, req.params.fieldId);
        res.json(field);*/
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

        /*var fields = fieldModel.deleteFieldForForm(req.params.formId, req.params.fieldId);
        res.json(fields);*/
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

        /*var fields = fieldModel.createFieldForForm(req.params.formId, req.body);
        res.json(fields);*/
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

        /*var fields = fieldModel.updateFieldForForm(req.params.formId, req.params.fieldId, req.body);
        res.json(fields);*/
    }
};