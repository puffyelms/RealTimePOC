/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.common.messagebeans;

import java.io.Serializable;

/**
 *
 * @author timge_000
 */
public class Feed implements Serializable{

    private String timestamp;
    private String tableToUpdate;
    private AdjustedPrices[] adjustedPrices;
    
    public Feed() {
    }

    public Feed(String timestamp, String tableToUpdate, AdjustedPrices[] adjustedPrices) {
        this.timestamp = timestamp;
        this.tableToUpdate = tableToUpdate;
        this.adjustedPrices = adjustedPrices;
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

    public AdjustedPrices[] getAdjustedPrices() {
        return adjustedPrices;
    }

    public void setAdjustedPrices(AdjustedPrices[] adjustedPrices) {
        this.adjustedPrices = adjustedPrices;
    }

    @Override
    public String toString()
    {
        return "ClassPojo [timestamp = "+timestamp+", adjustedPrices = "+adjustedPrices+", tableToUpdate = "+tableToUpdate+"]";
    }
}
