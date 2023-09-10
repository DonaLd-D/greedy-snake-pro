package com.donald.kob.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.donald.kob.mapper.UserMapper;
import com.donald.kob.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserMapper userMapper;

    @GetMapping("/getAll")
    public List<User> getAllUser(){
        return userMapper.selectList(null);
    }
    @GetMapping("/getUser/{userId}")
    public User getUser(@PathVariable int userId){
        QueryWrapper<User> qw=new QueryWrapper<>();
        qw.eq("id",userId);
        return userMapper.selectOne(qw);
    }
    @RequestMapping("/add/{userId}/{userName}/{password}")
    public String addUser(@PathVariable int userId,@PathVariable String userName,@PathVariable String password){
        User user=new User(userId,userName,password);
        userMapper.insert(user);
        return "add new user successfully";
    }
    @RequestMapping("/del/{userId}")
    public String delUser(@PathVariable int userId){
        userMapper.deleteById(userId);
        return "delete user successfully";
    }
}
