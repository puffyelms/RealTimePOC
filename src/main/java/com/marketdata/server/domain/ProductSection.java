/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.server.domain;

import java.io.Serializable;
import java.util.List;

/**
 *
 * @author timge_000
 */
public class ProductSection implements Serializable {
    
    private List<Product> productGrid;
    private String productName;

    public ProductSection(List<Product> productGrid, String productName) {
        this.productGrid = productGrid;
        this.productName = productName;
    }

    public List<Product> getProductGrid() {
        return productGrid;
    }

    public void setProductGrid(List<Product> productGrid) {
        this.productGrid = productGrid;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
    
    
}
