const { response } = require("express");
const ToDo = require("../db/model/todo");
const { success_function, error_function } = require("../utils/responsehandler");


exports.createTodo = async function (req, res) {
    try {
        let body = req.body;

        if (body.title && body.description) {
            let todo = await ToDo.create(body);
            if (todo) {
                let response = success_function({
                    message: "Todo added successfully",
                    data: todo,
                });
                return res.status(response.statuscode).json(response);
            } 
        } else {
            let response = error_function({
                message: "title and description are required",
            });
            return res.status(response.statuscode).json(response);
        }
    } catch (error) {
        console.error("Error:", error);
        let response = error_function({
            message: "An error occurred while adding the todo",
        });
        return res.status(response.statuscode).json(response);
    }
};

exports.getTodo = async function (req, res) {
    try {
         
        let alltodo = await ToDo.find(); 

        if (alltodo && alltodo.length > 0) {
            let response = success_function({
                data: alltodo, 
                message: " Todos fetched  sucess"
            });
            return res.status(response.statuscode).json(response);
        } else {
            let response = error_function({
                message: "Todos not fetched"
            });
            return res.status(response.statuscode).json(response);
        }
    } catch (error) {
        console.log("Error: ", error);
        let response = error_function({
            message: "Error fetching todos"
        });
        return res.status(response.statuscode).json(response);
    }
};


exports.editTodo = async function(req, res) {
    try {
        let id = req.params.id;
        let { title, description, stage } = req.body;

        if (!title && !description && !stage) {
            let response = error_function({
                message: "There is nothing to update"
            });
            return res.status(response.statuscode).json(response);
        } else {
            let updateFields = {};
            if (title) updateFields.title = title;
            if (description) updateFields.description = description;
            if (stage) updateFields.stage = stage;

            let edit_todo = await ToDo.updateMany({ _id: id }, { $set: updateFields });
            
            if (edit_todo.modifiedCount > 0) {
                let response = success_function({
                    data: edit_todo,
                    message: "Todo updated successfully"
                });
                return res.status(response.statuscode).json(response);
            } else {
                let response = error_function({
                    message: "No changes were made"
                });
                return res.status(response.statuscode).json(response);
            }
        }

    } catch (error) {
        console.log("error : ", error);
        let response = error_function({
            message: "todos not edited"
        });
        return res.status(response.statuscode).json(response);
    }
}
exports.deleteTodo = async function(req,res){
    try {
        let id = req.params.id;
        if(id){
            let delete_todo = await ToDo.deleteOne({_id : id});
            if(delete_todo){
                let response = success_function({
                    message: "TODO delted successfully"
                })
                return res.status(response.statuscode).send(response)
            }
        }else{
            let response = error_function({
                messgae: "enable to find TODO to delete"
            })
            return res.status(response.statuscode).json(response)
        }
    } catch (error) {
        console.log("error : ", error)
        let response = error_function({
            messgae: "todos not deleted"
        })
        return res.status(response.statuscode).json(response)
    }
}



