package com.donald.kob.controller.user;

import com.donald.kob.pojo.Bot;
import com.donald.kob.service.user.bot.AddService;
import com.donald.kob.service.user.bot.DeleteService;
import com.donald.kob.service.user.bot.GetListService;
import com.donald.kob.service.user.bot.UpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user/bot")
public class BotController {

    @Autowired
    private AddService addService;
    @Autowired
    private DeleteService deleteService;
    @Autowired
    private UpdateService updateService;
    @Autowired
    private GetListService getListService;

    @PostMapping("/add")
    public Map<String,String> add(@RequestBody Map<String,String> data){
        return addService.add(data);
    }

    @PostMapping("/delete")
    public Map<String,String> delete(@RequestBody Map<String,String> data){
        return deleteService.delete(data);
    }
    @PostMapping("/update")
    public Map<String,String> update(@RequestBody Map<String,String> data){
        return updateService.update(data);
    }
    @GetMapping("/list")
    public List<Bot> getList(){
        return getListService.getList();
    }
}
