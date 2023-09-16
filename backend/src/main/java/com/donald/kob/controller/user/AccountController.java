package com.donald.kob.controller.user;

import com.donald.kob.service.user.account.InfoService;
import com.donald.kob.service.user.account.LoginService;
import com.donald.kob.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AccountController {
    @Autowired
    LoginService loginService;
    @Autowired
    InfoService infoService;
    @Autowired
    RegisterService registerService;

    @PostMapping("/user/account/token")
    public Map<String,String> getToken(@RequestBody Map<String,String> req){
        String username=req.get("username");
        String password=req.get("password");
        return loginService.getToken(username,password);
    }
    @GetMapping("/user/account/info")
    public Map<String,String> getInfo(){
        return infoService.getinfo();
    }

    @PostMapping("/user/account/register")
    public Map<String,String> register(@RequestBody Map<String,String> req){
        return registerService.register(req.get("username"),req.get("password"),req.get("password0"));
    }
}
