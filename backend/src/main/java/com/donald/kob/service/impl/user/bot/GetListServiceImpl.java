package com.donald.kob.service.impl.user.bot;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.donald.kob.mapper.BotMapper;
import com.donald.kob.pojo.Bot;
import com.donald.kob.pojo.User;
import com.donald.kob.service.impl.utils.UserDetailsImpl;
import com.donald.kob.service.user.bot.GetListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetListServiceImpl implements GetListService {
    @Autowired
    private BotMapper botMapper;
    @Override
    public List<Bot> getList() {
        UsernamePasswordAuthenticationToken authentication=
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl loginUser=(UserDetailsImpl) authentication.getPrincipal();
        User user=loginUser.getUser();

        QueryWrapper qw=new QueryWrapper<>();
        qw.eq("user_id",user.getId());
        List<Bot> list=botMapper.selectList(qw);
        return list;
    }
}
