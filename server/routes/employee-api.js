const express = require('express');
const Employee = require('../models/employee');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require ('../services/error.response');

const router = express.Router();

module.exports = router;

/**
 * find employee by Id
 */
router.get('/:empId', async(req, res) => {

    try {
  
      /**
       * Use the mongoose employee model to query MongoDB Atlas by employeeId
       */
  
      Employee.findOne({'empId': req.params.empId }, function(err, employee){
  
        /**
         * If there is a database level error, handle by returing a server 500 error
         */
  
        if (err) {
          console.log(err);

          const mongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
          res.status(500).send(mongoDbErrorResponse.toObject());
  
        } else {
          /**
           * If there are no database level errors, return the employee object
           */
  
          console.log(employee);

          const employeeTasksResponse = new BaseResponse('200', 'Query successful', employee);
          res.json(employeeTasksResponse.toObject());
        }
      })
  
    } catch (e) {
      /**
       * Catch any potential errors that we didn't prepare for
       */
      console.log(e);
      const errorCatchResponse = new ErrorResponse('500','Internal Server Error', e.message);
      res.status(500).send(errorCatchResponse.toObject());
          }
  })

  /**
   * findAllTasks
   * Returns a list JSON task objects
   */
  router.get('/:empId/tasks', async(req, res) =>{

    try{
      
      Employee.findOne({'empId':req.params.empId, }, 'empId todo done', function(err,employee){//'empId todo done' projection to just access the data we need
        if(err){
            console.log(err);

            const mongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);

            res.status(500).send(mongoDbErrorResponse.toObject())

        }else{
          console.log(employee);

          const employeeTasksResponse = new BaseResponse('200', 'Query successful', employee);

          res.json(employeeTasksResponse.toObject());
        }
      })
    }catch(e){

      const errorCatchResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
      console.log(e);
      res.status(500).send(errorCatchResponse.toObject());
    }
   })
  //*end FindAllTasks

   /**
    * API: createTask
    */
router.post('/:empId/tasks', async(req, res) => {

  try {

    Employee.findOne({'empId': req.params.empId}, function(err, employee){
      if (err) {
        console.log(err);

        const createTaskMongoDBErrorResponse = new ErrorResponse('500', 'Internal server error!', err);

        res.status(500).send(createTaskMongoDBErrorResponse.toObject());
      } else {
        console.log(employee);

// create a new item object
        const item = {
         text: req.body.text 
        };

        employee.todo.push(item);

        employee.save(function(err, updatedEmployee){
          if (err) {
            console.log(err);

            const createTaskOnSaveMongoDBErrorResponse = new ErrorResponse('500', 'Internal server error', err);

            res.status(500).send(createTaskOnSaveMongoDBErrorResponse,toObject());
          } else {
            console.log(updatedEmployee);
            const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'successful entry', updatedEmployee);
            res.json(createTaskOnSaveSuccessResponse.toObject());
          }
        })
      }
    })

  }catch (e){

    console.log(e);

    const createTaskCatchErrorResponse = new ErrorResopnse('500', 'Internal server error', e.message);
    res.status(500).send(createTaskCatchErrorResponse.toObject());
  }
})

    /**
     * API: updateTask
     */

     router.put('/:empId/tasks', async(req, res) => {
       try {

        Employee.findOne({'empId': req.params.empId}, function(err, employee){

          if (err) {
            console.log(err);

            const updateTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err) ;
          
          res.status(500).send(updateTaskMongoDbErrorResponse.toObject());
        }else {
          console.log(employee);

employee.set({
  todo: req.body.todo,
  done: req.body.done
});

employee.save(function(err, updatedEmployee){
  if (err){
    console.log(err);

const updateTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

res.status(500).send(updateTaskOnSaveMongoDbErrorResponse.toObject());
}else {
  console.log(updatedEmployee);


const updatedTaskOnSaveSuccessresponse = new BaseResponse('200', "update successful", updatedEmployee);

  res.json(updatedTaskOnSaveSuccessresponse.toObject());
}
})
}
        })
       }catch (e) {

        console.log(e);

        const updateTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);

        res.status(500).send(updateTaskCatchErrorResponse.toObject());
       }
     })

     /**
      * API: deleteTask
      */
  router.delete('/:empId/tasks/:Id', async(req, res) => {

    try {

      Employee.findOne({'empId': req.params.empId}, function(err, employee){

        if (err) { 
          console.log(err);

          const deleteTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server error', err);

          res.status(500).send(deleteTaskMongoDbErrorResponse.toObject());

        } else {
          console.log(employee);

          const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
          const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

          if (todoItem) {
            employee.todo.id(todoItem._id).remove();
            employee.save(function(err, updatedTodoItemEmployee) {
              if (err) {
                console.log(err);

                const deleteToDoItemOnSaveMongoDbErrorResponse= new ErrorResponse('500', 'Internal server error', err);

                res.status(500).send(deleteToDoItemOnSaveMongoDbErrorResponse.toObject());

              } else {
                console.log(updatedTodoItemEmployee);

                const deleteToDoItemSuccessResponse = new BaseResponse('200', 'Removed item from the todo list', updatedTodoItemEmployee);

                res.json(deleteToDoItemSuccessResponse.toObject());
              }
            })
              } else if (doneItem) {
                employee.done.id(doneItem._id).remove();
                
                employee.save(function(err, updatedDoneItemEmployee){
                  if (err) {
                    console.log(err);

                    const deleteDoneItemOnSaveMongoDbErrorResponse = new ErrorResponse ('500', 'Internal server error', err);
                    
                  res.status(500).send(deleteDoneItemOnSaveMongoDbErrorResponse.toObject());
                } else {
                  console.log(updatedDoneItemEmployee);

                  const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Removed item from the done list', updatedDoneItemEmployee);

                  res.json(deleteDoneItemSuccessResponse.toObject());
                }
                })
          
              } else {
                console.log('invalid task Id');

                const deleteTaskNotFoundResponse = new ErrorResponse('200', 'Unable to locate the requested task', null);

                resp.status(200).send(deleteTaskNotFoundResponse.toObject());
              }
            }
        })
    
    } catch (e) {

  console.log(e);

  const deleteTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);

  res.status(500).send(deleteTaskCatchErrorResponse.toObject());
} 
 })


   module.exports = router;
  
