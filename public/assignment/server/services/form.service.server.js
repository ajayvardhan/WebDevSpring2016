module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", findFormsForUser);
    app.get("/api/assignment/form/:formId", findFormByID);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);

    function findFormsForUser(req, res){
        formModel.findFormsForUser(req.params.userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );

        /*var forms = formModel.findFormsForUser(req.params.userId);
        res.json(forms);*/
    }

    function findFormByID(req, res){
        formModel.findFormByID(req.params.userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );

        /*var form = formModel.findFormByID(req.params.formId);
        res.json(form);*/
    }

    function deleteForm(req, res){
        formModel.deleteForm(req.params.formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );

        /*var forms = formModel.deleteForm(req.params.formId);
        res.json(forms);*/
    }

    function createForm(req, res){
        var form  = req.body;
        form.userID = req.params.userId;

        formModel.createForm(form)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );

        /*var forms = formModel.createForm(form);
        res.json(forms);*/
    }

    function updateForm(req, res){
        formModel.updateForm(req.params.formId, req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );

        /*var forms = formModel.updateForm(req.params.formId, req.body);
        res.json(forms);*/
    }
};