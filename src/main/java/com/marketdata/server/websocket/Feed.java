/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.server.websocket;

import java.io.Serializable;

/**
 *
 * @author timge_000
 */
public class Feed implements Serializable{
    String timestamp;
    String tableToUpdate;
    
    public Feed() {
    }

    public Feed(String timestamp, String tableToUpdate) {
        this.timestamp = timestamp;
        this.tableToUpdate = tableToUpdate;
    }
    
    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getTableToUpdate() {
        return tableToUpdate;
    }

    public void setTableToUpdate(String tableToUpdate) {
        this.tableToUpdate = tableToUpdate;
    }

}
