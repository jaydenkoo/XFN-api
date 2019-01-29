/*
 *管理员相关路由 
 */
const express =require('express');
const pool =require('../../pool');
var router=express.Router();
module.exports=router;

/* GET请求可以有主体吗?
* API:GET /admin/login/:aname/:apwd
*完成用户登录验证(提示:有的项目中此处选择POST请求)
*返回数据:
*{code:200,msg:'login succ'}
*{code:400,msg:'aname or apwd err'}
*/
router.get('/login/:anmae/:apwd',(req,res)=>{
    var aname=req.params.anmae;
    var apwd=req.params.apwd;
    pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)',[aname,apwd],(err,result)=>{
        if(err)throw err;
        if(result.length>0){   //查询到一行数据,登录成功
            console.log(result)
            res.send({code:200,msg:'login succ'});
        }else{      //没有查询到数据
            res.send({code:400,msg:'aname or apwd err'})
        }
    });
})
/*
* API:PATCH /admin/login
*请求数据:{aname:'xxx',apwd:'xxx',newPwd:'xxx'}
*根据管理员名和密码修改管理员密码
*返回数据:
*{code:200,msg:'login succ'}
*{code:400,msg:'aname or apwd err'}
*{code:401,msg:'apwd not modified'}
*/
router.patch('/',(req,res)=>{
    var data=req.body;
    //首先根据anmae/oldPwd查询该用户是否存在
    pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)',[data.aname,data.oldPwd],(err,result)=>{
        if(err)throw err;
        if(result.length==0){
            res.send({code:400,msg:'password err'});
            return;
        }
        //如果查询到了用户,在修改其密码
        pool.query('UPDATE xfn_admin SET apwd=PASSWORD(?) WHERE aname=?',[data.newPwd,data.aname],(err,result)=>{
            if(err)throw err;
            if(result.changedRows>0){   //密码修改完成
                res.send({code:200,msg:'modifiy succ'})
            }else{  //新旧密码一样,未做修改
                res.send({code:400,msg:'pwd not modified'})
            }
        })
    })
    
})