package com.donald.kob.consumer.utils;

import com.donald.kob.utils.JwtUtil;
import io.jsonwebtoken.Claims;

public class JwtAuthentication {
    public static int getId(String token){
        int userid=-1;
        try {
            Claims claims = JwtUtil.parseJWT(token);
            userid =Integer.parseInt(claims.getSubject());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return userid;
    }
}
