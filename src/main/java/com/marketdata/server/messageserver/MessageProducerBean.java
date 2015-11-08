package com.marketdata.server.messageserver;

import com.marketdata.common.enums.ProductName;
import com.marketdata.server.domain.Product;
import com.marketdata.server.websocket.JmsFeedMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Resource;
import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.inject.Named;
import javax.jms.*;
import javax.json.JsonObject;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Named(value = "messageProducerBean")
@RequestScoped
public class MessageProducerBean {

    private static final Logger logger = LoggerFactory.getLogger(MessageProducerBean.class);

    @Resource(mappedName = "jms/myQueue")
    private Queue myQueue;
    @Resource(mappedName = "jms/myQueueFactory")
    private ConnectionFactory myQueueFactory;

    DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss.SSS");

    static ScheduledExecutorService timer;

    static Random randomSeeder = new Random();

    public MessageProducerBean() {

    }

    public void send() {

        FacesContext facesContext = FacesContext.getCurrentInstance();

        // Generate a feed object
        //Randomly select a product to update
        String productNameToUpdate;
//        int dieRollProd = randomSeeder.nextInt(10) + 1;
//        if (dieRollProd < 3) {
            productNameToUpdate = ProductName.PRODUCT30.getCode();
//        } else if (dieRollProd < 6) {
//            productNameToUpdate = ProductName.PRODUCT15.getCode();
//        } else {
//            productNameToUpdate = ProductName.PRODUCT10.getCode();
//        }

        int couponInt = randomSeeder.nextInt(7);
        BigDecimal bd = BigDecimal.valueOf((couponInt * 0.5) + 2.5);
        bd.setScale(1, RoundingMode.UP);
        String coupon = bd.toPlainString();

        List<Product> productList = new ArrayList<>();
        Product product1 = new Product(1, coupon, randomPriceString(), randomPriceString(), randomPriceString(), randomPriceString());

        productList.add(product1);

        JmsFeedMessage jmsFeedMessage = new JmsFeedMessage(LocalTime.now().format(timeFormatter), productNameToUpdate, productList);

        JsonObject jsonFeed = JsonFeedHelper.createJson(jmsFeedMessage);

        System.out.println("jsonFeed=" + jsonFeed);

        try {
            sendJMSMessageToMyQueue(jsonFeed.toString());
            FacesMessage facesMessage = new FacesMessage("Message sent: " + jmsFeedMessage);
            facesMessage.setSeverity(FacesMessage.SEVERITY_INFO);
            facesContext.addMessage(null, facesMessage);
        } catch (JMSException jmse) {
            FacesMessage facesMessage = new FacesMessage("Message NOT sent: " + jmsFeedMessage);
            facesMessage.setSeverity(FacesMessage.SEVERITY_ERROR);
            facesContext.addMessage(null, facesMessage);
        }
    }

    private String randomPriceString() {

        //Most time prices don't change so pass empty string for ~90% of the time
        int priceChange = randomSeeder.nextInt(10) + 1;
        if (priceChange < 8) {
            return "";
        } else {
            int priceInt = randomSeeder.nextInt(50) + 100;
            return Integer.toString(priceInt);
        }

    }

    private Message createJMSMessageForjmsMyQueue(Session session, Object messageData) throws JMSException {
        TextMessage tm = session.createTextMessage();
        tm.setText(messageData.toString());
        return tm;
    }

    private void sendJMSMessageToMyQueue(Object messageData) throws JMSException {
        Connection connection = null;
        Session session = null;
        try {
            connection = myQueueFactory.createConnection();
            session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            MessageProducer messageProducer = session.createProducer(myQueue);
            messageProducer.send(createJMSMessageForjmsMyQueue(session, messageData));
        } finally {
            if (session != null) {
                try {
                    session.close();
                } catch (JMSException e) {
                    logger.error("Cannot close session: {}", e);
                }
            }
            if (connection != null) {
                connection.close();
            }
        }
    }

    public void startFeed() {
        System.out.println("Starting Feed.");

        timer = Executors.newSingleThreadScheduledExecutor();
        timer.scheduleAtFixedRate(() -> {

            String productNameToUpdate;
//            int dieRollProd = randomSeeder.nextInt(10) + 1;
//            if (dieRollProd < 8) {
                productNameToUpdate = ProductName.PRODUCT30.getCode();
//            } else if (dieRollProd < 9) {
//                productNameToUpdate = ProductName.PRODUCT15.getCode();
//            } else {
//                productNameToUpdate = ProductName.PRODUCT10.getCode();
//            }

            int couponInt = randomSeeder.nextInt(7);
            BigDecimal bd = BigDecimal.valueOf((couponInt * 0.5) + 2.5);
            bd.setScale(1, RoundingMode.UP);
            String coupon = bd.toPlainString();

            List<Product> productList = new ArrayList<>();
            Product product1 = new Product(1, coupon, randomPriceString(), randomPriceString(), randomPriceString(), randomPriceString());

            productList.add(product1);

            JmsFeedMessage jmsFeedMessage = new JmsFeedMessage(LocalTime.now().format(timeFormatter), productNameToUpdate, productList);

            JsonObject jsonFeed = JsonFeedHelper.createJson(jmsFeedMessage);
            System.out.println("jsonFeed=" + jsonFeed);

            try {
                sendJMSMessageToMyQueue(jsonFeed.toString());
            } catch (JMSException ex) {
                logger.error("Cannot send message to queue: {}", ex);
            }

        }, 0, 200, TimeUnit.MILLISECONDS);

    }

    public void stopFeed() {
        timer.shutdown();
        System.out.println("Stopping Feed.");
    }
}
