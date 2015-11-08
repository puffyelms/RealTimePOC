/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.server.listener;

import com.marketdata.server.websocket.dataServer.qualifier.HeartBeatMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

/**
 *
 * @author timge_000
 */
@WebListener
public class HeartbeatServletContextListener implements ServletContextListener, Runnable {

    private Thread heartBeatThread = null;
 private static final Logger logger = LoggerFactory.getLogger(HeartbeatServletContextListener.class);    
    @Inject
    @HeartBeatMessage
    Event<String> heartbeatEvent;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        if ((heartBeatThread == null) || (!heartBeatThread.isAlive())) {
            heartBeatThread = new Thread(this);
            heartBeatThread.start();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        try {
//            heartBeatThread.doShutdown();
            heartBeatThread.interrupt();
        } catch (Exception ex) {
            logger.error("contextDestroyed",ex);
        }
    }

    @Override
    public void run() {
        try {
            while (true) {
//                System.out.println("deamon working...");
                
                
                //Tell websocket to send all
                String message = "AlertTheClients";
                logger.trace("Firing Message: {}",message);
                heartbeatEvent.fire(message);
                
                Thread.sleep(1000);
            }
        } catch (InterruptedException e) {
            System.out.println("deamon stopped");
        }
    }

}
