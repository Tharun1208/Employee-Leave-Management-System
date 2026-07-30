const db = require("../config/db");
const getProfile = (req,res)=>{
    const userId=req.user.id;
    const sql=`
        SELECT
            id,
            employee_id,
            name,
            username,
            email,
            phone,
            department,
            role,
            created_at
        FROM users
        WHERE id=?
    `;
    db.query(
        sql,
        [userId],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:"Database Error",
                    error:err
                });
            }
            if(result.length===0){
                return res.status(404).json({
                    message:"User not found"
                });
            }
            res.status(200).json(result[0]);
        }
    );
};
const getAllEmployees=(req,res)=>{
    const sql=`
        SELECT
            id,
            employee_id,
            name,
            username,
            email,
            phone,
            department,
            role,
            created_at
        FROM users
        WHERE role='employee'
        ORDER BY id ASC
    `;
    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({
                message:"Database Error",
                error:err
            });
        }
        res.status(200).json(result);
    });
};
const updateEmployee=(req,res)=>{
    const {id}=req.params;
    const {
        employee_id,
        name,
        email,
        phone,
        department
    }=req.body;
    const sql=`
        UPDATE users
        SET
            employee_id=?,
            name=?,
            email=?,
            phone=?,
            department=?
        WHERE id=?
    `;
    db.query(
        sql,
        [
            employee_id,
            name,
            email,
            phone,
            department,
            id
        ],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:"Database Error",
                    error:err
                });
            }
            res.status(200).json({
                message:"Employee updated successfully"
            });
        }
    );
};
const deleteEmployee=(req,res)=>{
    const {id}=req.params;
    const sql=`
        DELETE FROM users
        WHERE id=?
    `;
    db.query(sql,[id],(err,result)=>{
        if(err){
            return res.status(500).json({
                message:"Database Error",
                error:err
            });
        }
        res.status(200).json({
            message:"Employee deleted successfully"
        });
    });
};
module.exports={
    getProfile,
    getAllEmployees,
    updateEmployee,
    deleteEmployee
};