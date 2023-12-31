package com.donald.kob.service.impl.user.account;

import com.donald.kob.pojo.User;
import com.donald.kob.service.impl.utils.UserDetailsImpl;
import com.donald.kob.service.user.account.LoginService;
import com.donald.kob.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Override
    public Map<String, String> getToken(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken=
                new UsernamePasswordAuthenticationToken(username,password);
        Authentication authenticate=authenticationManager.authenticate(authenticationToken);
        UserDetailsImpl loginUser= (UserDetailsImpl) authenticate.getPrincipal();
        User user=loginUser.getUser();
        String jwt= JwtUtil.createJWT(user.getId().toString());

        Map<String,String> ans=new HashMap<>();
        ans.put("msg","success");
        ans.put("token",jwt);
        return ans;
    }
}
