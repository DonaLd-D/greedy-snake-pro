package com.donald.kob.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.donald.kob.mapper.UserMapper;
import com.donald.kob.pojo.User;
import com.donald.kob.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RegisterServiceImpl implements RegisterService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public Map<String,String> register(String username, String password, String password0){
        Map<String,String> ans=new HashMap<>();
        if(username==null){
            ans.put("msg","用户名不能为空");
            return ans;
        }
        if(password==null||password0==null){
            ans.put("msg","密码不能为空");
            return ans;
        }
        username=username.trim();
        if(username.length()==0||username.length()>50){
            ans.put("msg","用户名太短或者太长");
            return ans;
        }
        if(password.length()==0||password0.length()==0||password.length()>50||password0.length()>50){
            ans.put("msg","密码太短或者密码太长");
            return ans;
        }
        if(!password.equals(password0)){
            ans.put("msg","密码不一致");
            return ans;
        }
        QueryWrapper<User> qw=new QueryWrapper<>();
        qw.eq("username",username);
        List<User> user=userMapper.selectList(qw);
        if(!user.isEmpty()){
            ans.put("msg","用户已存在");
            return ans;
        }

        String encodedPassword=passwordEncoder.encode(password);
        String avatar="https://cdn.acwing.com/media/user/profile/photo/209574_lg_34375d9c1b.jpg";
        User newUser=new User(null,username,encodedPassword,avatar);
        userMapper.insert(newUser);
        ans.put("msg","success");
        return ans;
    }
}
