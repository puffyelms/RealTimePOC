/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.server.mdb;

import com.marketdata.server.websocket.dataServer.qualifier.WSJMSMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.jms.Message;
import javax.jms.MessageListener;

/**
 *
 * @author timge_000
 */
@MessageDriven(mappedName = "jms/myQueue", activationConfig = {
    @ActivationConfigProperty(propertyName = "acknowledgeMode", propertyValue = "Auto-acknowledge"),
    @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Queue")
})
public class WebSocketMDB implements MessageListener {
    
    private static final Logger logger = LoggerFactory.getLogger(WebSocketMDB.class);
            
    @Inject
    @WSJMSMessage
    Event<Message> jmsEvent;
    
    
    public WebSocketMDB() {
    }
    
    @Override
    public void onMessage(Message message) {
        logger.trace("Firing Message: {}",message);
        jmsEvent.fire(message);
    }
}
