package com.donald.kob.consumer;

import com.donald.kob.mapper.UserMapper;
import com.donald.kob.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.imageio.IIOException;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component
@ServerEndpoint("/websocket/{token}")  // 注意不要以'/'结尾
public class WebSocketServer {

    private static ConcurrentHashMap<Integer,WebSocketServer> users=new ConcurrentHashMap<>();
    private User user;
    private Session session=null;
    private static UserMapper userMapper;

    @Autowired
    public void setUserMapper(UserMapper userMapper){
        WebSocketServer.userMapper=userMapper;
    }
    @OnOpen
    public void onOpen(Session session, @PathParam("token") String token) {
        this.session=session;
        System.out.println("connected!");
        int userId=Integer.parseInt(token);
        this.user=userMapper.selectById(userId);

        if(this.user!=null){
            users.put(userId,this);
        }else{
//            this.session.close();
        }
    }

    @OnClose
    public void onClose() {
        System.out.println("disconnected!");
        if(this.user!=null){
            users.remove(this.user.getId());
        }
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("receive msg!");

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
