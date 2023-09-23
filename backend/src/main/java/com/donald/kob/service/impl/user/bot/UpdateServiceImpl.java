package com.donald.kob.service.impl.user.bot;

import com.donald.kob.mapper.BotMapper;
import com.donald.kob.pojo.Bot;
import com.donald.kob.pojo.User;
import com.donald.kob.service.impl.utils.UserDetailsImpl;
import com.donald.kob.service.user.bot.UpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class UpdateServiceImpl implements UpdateService {
    @Autowired
    private BotMapper botMapper;
    @Override
    public Map<String, String> update(Map<String, String> data) {
        UsernamePasswordAuthenticationToken authentication=
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl loginUser=(UserDetailsImpl) authentication.getPrincipal();
        User user=loginUser.getUser();

        int id=Integer.parseInt(data.get("id"));
        Bot bot=botMapper.selectById(id);
        String title=data.get("title");
        String desc=data.get("desc");
        String code=data.get("code");

        Map<String,String> ans=new HashMap<>();
        if(user.getId()!=bot.getUserId()){
            ans.put("msg","你无权更新该bot");
            return ans;
        }
        if(bot==null){
            ans.put("msg","该bot不存在");
        }
        if(title==null||title.length()==0||title.length()>100){
            ans.put("msg","标题长度不符合要求");
            return ans;
        }
        if(desc!=null&&desc.length()>300){
            ans.put("msg","描述的长度不符合要求");
            return ans;
        }
        if(code!=null&&code.length()>10000){
            ans.put("msg","代码的长度不符合要求");
            return ans;
        }
        Bot new_bot=new Bot(id,user.getId(),title,desc,code,bot.getRating(),bot.getCreatetime(),new Date());
        botMapper.updateById(new_bot);
        ans.put("msg",id+" "+"更新成功");
        return ans;
    }
}
