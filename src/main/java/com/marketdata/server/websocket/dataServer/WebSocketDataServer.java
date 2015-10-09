package com.marketdata.server.websocket.dataServer;

import com.marketdata.common.utilities.StringUtilities;
import com.marketdata.server.messageserver.JsonFeedHelper;
import com.marketdata.server.service.PricingDataSingleton;
import com.marketdata.server.websocket.Feed;
import com.marketdata.server.websocket.JmsFeedMessage;
import com.marketdata.server.websocket.dataServer.qualifier.HeartBeatMessage;
import com.marketdata.server.websocket.dataServer.qualifier.WSJMSMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ejb.Stateless;
import javax.enterprise.event.Observes;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.TextMessage;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;

/**
 *
 * @author timge_000
 */
@Stateless
@ServerEndpoint(value = "/dataSocket", encoders = {DataSocketEncoder.class}, decoders = {DataSocketDecoder.class})
public class WebSocketDataServer {

    // All open WebSocket sessions
    private static final Set<Session> allSessions = Collections.synchronizedSet(new HashSet<>());

    private static final Logger logger = LoggerFactory.getLogger(WebSocketDataServer.class);

    private static Map<String, String> tableUpdateMap = new ConcurrentHashMap<>();
    private static String lastTimeStamp = "";

    private final static Object lock = new Object();
    
    @OnOpen
    public void onOpen(Session session) {
//        allSessions = session.getOpenSessions();
        allSessions.add(session);
        session.setMaxIdleTimeout(0);

        logger.info("onOpen: Session list size: {}, idleTimeout={}", allSessions.size(), session.getMaxIdleTimeout());
    }

    @OnClose
    public void onClose(Session session, CloseReason reason) {
        allSessions.remove(session);
        logger.info("onClose: Session closed.  list size: {} : {}", allSessions.size(), reason.getReasonPhrase());
    }

    @OnError
    public void onError(Session session, Throwable t) {
        try {
            session.close();
        } catch (Exception ex) {
            logger.error("onError caught: {}", ex);
        }
    }

    public static List<Session> getSessions() {
        return new ArrayList<>(allSessions);
    }

    public void onAlertAllClients(@Observes @HeartBeatMessage String message) {
//        logger.debug("MESSAGE RECEIVED!!!!!! message=" + message);
//        System.out.println("What should i do??? message=" + message);

        if (tableUpdateMap != null && !tableUpdateMap.isEmpty()) {
            synchronized(lock) {



                String uiUpdateList = StringUtilities.convertListToCommaString(tableUpdateMap.values());

                System.out.println("uiUpdateList="+uiUpdateList);
                
                //                for (String tableUpdate : myForm:myDataTable_#{productData.productName})

                
                Feed feed = new Feed(lastTimeStamp, uiUpdateList);

                try {
                    for (Session s : allSessions) {
                        //s.getAsyncRemote().sendObject(feed);  //Test with Async to see performance difference.
                        s.getBasicRemote().sendObject(feed);

                    }
                } catch (IOException | EncodeException ex) {
                    java.util.logging.Logger.getLogger(WebSocketDataServer.class.getName()).log(Level.SEVERE, null, ex);
                }

                tableUpdateMap.clear();
                lastTimeStamp = "";
            }
        }

    }

    public void onJMSMessage(@Observes @WSJMSMessage Message message) {

        try {
            if (message instanceof TextMessage) {
                String tm = ((TextMessage) message).getText();

                PricingDataSingleton pricingDataSingleton = PricingDataSingleton.getInstance();

                JmsFeedMessage jmsFeedMessage = JsonFeedHelper.getJmsFeed(tm);

                // Process products
                jmsFeedMessage.getProducts().stream().forEach((product) -> pricingDataSingleton.updateProduct(jmsFeedMessage.getProductName(), product));
                
                synchronized(lock) {
                    tableUpdateMap.put(jmsFeedMessage.getProductName(), jmsFeedMessage.getProductName());
                    lastTimeStamp = jmsFeedMessage.getTimestamp();
                }

            } else {
                throw new IllegalArgumentException("message isn't a feed object");
            }

        } catch (JMSException ex) {
            logger.error("Error sending websocket message: {}", ex);

            java.util.logging.Logger.getLogger(WebSocketDataServer.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
