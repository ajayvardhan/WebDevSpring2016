module.exports = function(app) {
    app.get("/api/assignment/user/:userId/form", findFormsForUser);
    app.get("/api/assignment/form/:formId", findFormByID);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.post("/api/assignment/form/:formId", updateForm);

    function findFormsForUser(req, res){
        console.log(req.params.userId);
    }

    function findFormByID(req, res){
        console.log(req.params.formId);
    }

    function deleteForm(req, res){
        console.log(req.params.formId);
    }

    function createForm(req, res){
        console.log(req.params.userId);
    }

    function updateForm(req, res){
        console.log(req.params.formId);
    }
};