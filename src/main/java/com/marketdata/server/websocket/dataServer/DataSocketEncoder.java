/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.server.websocket.dataServer;

import com.marketdata.server.websocket.AdjustedPrices;
import com.marketdata.server.websocket.Feed;

import javax.json.*;
import javax.json.spi.JsonProvider;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;
import java.io.IOException;
import java.io.Writer;

/**
 *
 * @author timge_000
 */
public class DataSocketEncoder implements Encoder.TextStream<Feed> {

    @Override
    public void encode(Feed feed, Writer writer) throws EncodeException, IOException {

        JsonProvider provider = JsonProvider.provider();

        JsonArrayBuilder jsonArray = provider.createArrayBuilder();

        AdjustedPrices[] adjustedPrices = feed.getAdjustedPrices();

        if (adjustedPrices != null && adjustedPrices.length > 0 ) {

            for (AdjustedPrices price : adjustedPrices) {

                JsonObjectBuilder productToAdd = provider.createObjectBuilder()
                        .add("coupon", price.getCoupon())
                        .add("month1", price.getMonth1())
                        .add("month2", price.getMonth2())
                        .add("month3", price.getMonth3())
                        .add("month4", price.getMonth4());
                jsonArray.add(productToAdd);

            }
        }


        JsonObject jsonFeed = provider.createObjectBuilder()
            .add("action", "add")
            .add("timestamp", feed.getTimestamp())
            .add("tableToUpdate", feed.getTableToUpdate())
            .add("adjustedPrices", jsonArray)
                .build();
        try (JsonWriter jsonWriter = provider.createWriter(writer)) {
          jsonWriter.write(jsonFeed);
        }
    }

    @Override
    public void init(EndpointConfig ec) {
        System.out.println("init");
    }

    @Override
    public void destroy() {
        System.out.println("destroy");
    }

    
}
