package com.marketdata.server.websocket.dataServer;

import com.marketdata.common.enums.ProductName;
import com.marketdata.common.utilities.StringUtilities;
import com.marketdata.server.domain.Product;
import com.marketdata.server.messageserver.JsonFeedHelper;
import com.marketdata.server.pricingcache.PricingDataSingleton;
import com.marketdata.common.messagebeans.AdjustedPrices;
import com.marketdata.common.messagebeans.Feed;
import com.marketdata.common.messagebeans.JmsFeedMessage;
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

//    @OnMessage
//    public v

    public static List<Session> getSessions() {
        return new ArrayList<>(allSessions);
    }

    public void onAlertAllClients(@Observes @HeartBeatMessage String message) {

        if (tableUpdateMap != null && !tableUpdateMap.isEmpty()) {
            synchronized(lock) {

                String uiUpdateList = StringUtilities.convertListToCommaString(tableUpdateMap.values());

                System.out.println("uiUpdateList="+uiUpdateList);

                List<Product> productToSend = PricingDataSingleton.getInstance().getProduct(ProductName.PRODUCT30.getCode());

                AdjustedPrices[] adjPriceList = new AdjustedPrices[productToSend.size()];
                int index = 0;
                for (Product product : productToSend) {
                    AdjustedPrices adjPrice = new AdjustedPrices(product.getCoupon(), product.getPriceM1(), product.getPriceM2(), product.getPriceM3(), product.getPriceM4());
                    adjPriceList[index] = adjPrice;
                    index++;
                }

                Feed feed = new Feed(lastTimeStamp, uiUpdateList,adjPriceList);

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
