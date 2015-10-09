/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.server.websocket.dataServer;

import com.marketdata.server.websocket.Feed;

import javax.json.JsonObject;
import javax.json.JsonWriter;
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
        
        JsonObject jsonFeed = provider.createObjectBuilder()
            .add("action", "add")
            .add("timestamp", feed.getTimestamp())
            .add("tableToUpdate", feed.getTableToUpdate())
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
