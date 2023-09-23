package com.donald.kob.service.impl.user.bot;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.donald.kob.mapper.BotMapper;
import com.donald.kob.pojo.User;
import com.donald.kob.service.impl.utils.UserDetailsImpl;
import com.donald.kob.service.user.bot.DeleteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DeleteServiceImpl implements DeleteService {
    @Autowired
    private BotMapper botMapper;
    @Override
    public Map<String, String> delete(Map<String, String> data) {
        UsernamePasswordAuthenticationToken authentication=
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl loginUser=(UserDetailsImpl) authentication.getPrincipal();
        User user=loginUser.getUser();

        Map<String,String> ans=new HashMap<>();
        int id=Integer.parseInt(data.get("id"));
        if(botMapper.selectById(id)==null){
            ans.put("msg","该bot不存在~");
            return ans;
        }
        if(user.getId()!=botMapper.selectById(id).getUserId()){
            ans.put("msg","您无权删除该bot~");
            return ans;
        }
        botMapper.deleteById(id);
        ans.put("msg","删除成功");
        return ans;
    }
}
