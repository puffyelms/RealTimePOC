/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.server.websocket;

import com.marketdata.server.domain.Product;

import java.util.List;

/**
 *
 * @author timge_000
 */
public class JmsFeedMessage {
    String timestamp;
    String productName;
    List<Product> products;

    public JmsFeedMessage(String timestamp, String productName, List<Product> products) {
        this.timestamp = timestamp;
        this.productName = productName;
        this.products = products;
    }

    public JmsFeedMessage() {
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    @Override
    public String toString() {
        return "JmsFeedMessage{" + "timestamp=" + timestamp + ", productName=" + productName + ", products=" + products + '}';
    }
    
    
    
    
}
