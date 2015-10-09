/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.server.websocket.dataServer;

import com.marketdata.server.websocket.Feed;

import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.spi.JsonProvider;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;
import java.io.IOException;
import java.io.Reader;

/**
 *
 * @author timge_000
 */
public class DataSocketDecoder implements Decoder.TextStream<Feed> {

    @Override
    public Feed decode(Reader reader) throws DecodeException, IOException {
        System.out.println("In decode");
        JsonProvider provider = JsonProvider.provider();
        JsonReader jsonReader = provider.createReader(reader);
        JsonObject jsonFeed = jsonReader.readObject();
        Feed feed = new Feed();
        feed.setTimestamp(jsonFeed.getString("timestamp"));
        feed.setTableToUpdate(jsonFeed.getString("tableToUpdate"));
        return feed;
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
