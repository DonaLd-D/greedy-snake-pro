package com.donald.kob.controller.user.account;

import com.donald.kob.service.user.account.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class LoginController {
    @Autowired
    LoginService loginService;

    @PostMapping("/user/account/token")
    public Map<String,String> getToken(@RequestBody Map<String,String> req){
        String username=req.get("username");
        String password=req.get("password");
        return loginService.getToken(username,password);
    }
}
