package com.donald.kob.service.user.bot;

import org.springframework.stereotype.Service;

import java.util.Map;

public interface AddService {
    Map<String,String> add(Map<String,String> data);
}
