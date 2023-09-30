package com.donald.kob.service.impl.user.bot;

import com.donald.kob.mapper.BotMapper;
import com.donald.kob.pojo.Bot;
import com.donald.kob.pojo.User;
import com.donald.kob.service.impl.utils.UserDetailsImpl;
import com.donald.kob.service.user.bot.AddService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AddServiceImpl implements AddService {
    @Autowired
    private BotMapper botMapper;

    @Override
    public Map<String, String> add(Map<String, String> data) {
        UsernamePasswordAuthenticationToken authentication=
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl loginUser=(UserDetailsImpl) authentication.getPrincipal();
        User user=loginUser.getUser();

        Map<String,String> ans=new HashMap<>();
        String title=data.get("title");
        String desc=data.get("desc");
        String code=data.get("code");

        if(title==null||title.length()==0||title.length()>100) {
            ans.put("msg", "标题必须长度在1-100之间～");
            return ans;
        }
        if(desc!=null&&desc.length()>300){
            ans.put("msg","描述的长度不能超过300～");
            return ans;
        }
        if(code!=null&&code.length()>10000){
            ans.put("msg","代码的长度不能超过10000～");
            return ans;
        }
        Date now=new Date();
        Bot bot=new Bot(null,user.getId(),title,desc,code,1500,now,now);
//        System.out.println(bot.toString());
        botMapper.insert(bot);
        ans.put("msg","添加成功～");
        return ans;
    }
}
