/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.server.messageserver;

import com.marketdata.common.messagebeans.JmsFeedMessage;
import com.marketdata.server.domain.Product;
import com.marketdata.common.messagebeans.Feed;

import javax.json.*;
import javax.json.spi.JsonProvider;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author timge_000
 */
public class JsonFeedHelper {

    public static JsonObject createJson(JmsFeedMessage feed) {
        JsonProvider provider = JsonProvider.provider();

        JsonArrayBuilder jsonArray = provider.createArrayBuilder();

        if (feed.getProducts() != null && feed.getProducts().isEmpty() == false) {

            for (Product product : feed.getProducts()) {

                JsonObjectBuilder productToAdd = provider.createObjectBuilder()
                        .add("coupon", product.getCoupon())
                        .add("priceM1", product.getPriceM1())
                        .add("priceM2", product.getPriceM2())
                        .add("priceM3", product.getPriceM3())
                        .add("priceM4", product.getPriceM4());
                jsonArray.add(productToAdd);

            }

        }

        JsonObject jsonFeed = provider.createObjectBuilder()
                .add("action", "add")
                .add("timestamp", feed.getTimestamp())
                .add("productName", feed.getProductName())
                .add("products", jsonArray)
                .build();

        return jsonFeed;
    }

    public static JsonObject createJson(Feed feed) {
        JsonProvider provider = JsonProvider.provider();

        JsonObject jsonFeed = provider.createObjectBuilder()
                .add("action", "add")
                .add("timestamp", feed.getTimestamp())
                .add("tableToUpdate", feed.getTableToUpdate())
                .build();
        return jsonFeed;
    }
    
    public static JmsFeedMessage getJmsFeed(String jsonString) {

        //create JsonReader object
        JsonReader jsonReader = Json.createReader(new StringReader(jsonString));

        JsonObject jsonFeed = jsonReader.readObject();
        
        JmsFeedMessage jmsFeedMessage = new JmsFeedMessage();
        jmsFeedMessage.setTimestamp(jsonFeed.getString("timestamp"));
        jmsFeedMessage.setProductName(jsonFeed.getString("productName"));
        
        JsonArray jsonProducts = jsonFeed.getJsonArray("products");
        
        List<Product> products = new ArrayList<>();
        
        for (int i=0; i < jsonProducts.size(); i++) {
            JsonObject product = (JsonObject) jsonProducts.get(i);
            
            String test = product.getString("coupon");
            products.add(new Product(i, product.getString("coupon"), product.getString("priceM1"), product.getString("priceM2"), product.getString("priceM3"), product.getString("priceM4")));

        }
        
        
        jmsFeedMessage.setProducts(products);
        
        return jmsFeedMessage;
        
    }

    public static Feed getFeed(String jsonString) {

        //create JsonReader object
        JsonReader jsonReader = Json.createReader(new StringReader(jsonString));

        JsonObject jsonFeed = jsonReader.readObject();
        Feed feed = new Feed();
        feed.setTimestamp(jsonFeed.getString("timestamp"));
        feed.setTableToUpdate(jsonFeed.getString("tableToUpdate"));
        return feed;
    }

}
