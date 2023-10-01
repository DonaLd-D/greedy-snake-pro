package com.donald.kob.consumer;

import com.alibaba.fastjson2.JSONObject;
import com.donald.kob.consumer.utils.Game;
import com.donald.kob.consumer.utils.JwtAuthentication;
import com.donald.kob.mapper.UserMapper;
import com.donald.kob.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
@ServerEndpoint("/websocket/{token}")  // 注意不要以'/'结尾
public class WebSocketServer {

    final private static ConcurrentHashMap<Integer,WebSocketServer> users=new ConcurrentHashMap<>();
    final private static CopyOnWriteArraySet<User> matchPools=new CopyOnWriteArraySet<>();
    private User user;
    private Session session=null;
    private static UserMapper userMapper;

    @Autowired
    public void setUserMapper(UserMapper userMapper){
        WebSocketServer.userMapper=userMapper;
    }
    @OnOpen
    public void onOpen(Session session, @PathParam("token") String token) throws IOException {
        this.session=session;
        System.out.println("connected!");
        int userId= JwtAuthentication.getId(token);
        this.user=userMapper.selectById(userId);

        if(this.user!=null){
            users.put(userId,this);
        }else{
            this.session.close();
        }
    }

    @OnClose
    public void onClose() {
        System.out.println("disconnected!");
        if(this.user!=null){
            users.remove(this.user.getId());
        }
    }

    public void startMatching(){
        matchPools.add(this.user);
        while(matchPools.size()>1) {
            Iterator<User> it = matchPools.iterator();
            User a = it.next(), b = it.next();
            matchPools.remove(a);
            matchPools.remove(b);

            Game game = new Game(13, 13, 20);
            game.createMap();

            JSONObject resA = new JSONObject();
            resA.put("event", "start");
            resA.put("opponent_username", b.getUsername());
            resA.put("opponent_avatar", b.getAvatar());
            resA.put("map", game.getG());
            users.get(a.getId()).sendMessage(resA.toJSONString());

            JSONObject resB = new JSONObject();
            resB.put("event", "start");
            resB.put("opponent_username", a.getUsername());
            resB.put("opponent_avatar", a.getAvatar());
            resB.put("map", game.getG());
            users.get(b.getId()).sendMessage(resB.toJSONString());
        }
    }

    public void stopMatching(){
        matchPools.remove(this.user);
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("receive msg!");
        JSONObject data=JSONObject.parseObject(message);
        String ev=data.getString("event");
        if("start".equals(ev)){
            startMatching();
        }else if("stop".equals(ev)){
            stopMatching();
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }

    public void sendMessage(String msg){
        synchronized (this.session){
            try{
                this.session.getBasicRemote().sendText(msg);
            }catch (IOException e){
                e.printStackTrace();
            }
        }
    }
}
