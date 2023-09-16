package com.donald.kob.controller.user;

import com.donald.kob.service.user.account.InfoService;
import com.donald.kob.service.user.account.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AccountController {
    @Autowired
    LoginService loginService;
    @Autowired
    InfoService infoService;

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
}
