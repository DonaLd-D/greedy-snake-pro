package com.donald.kob.controller.pk;

import com.donald.kob.mapper.UserMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pk")
public class PkController {
    @GetMapping("/basic")
    public String basicInfo(){
        return "pk basic info";
    }

}
