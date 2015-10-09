/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.common.enums;

/**
 *
 * @author timge_000
 */
public enum ProductName {
    PRODUCT30("Product30"),
    PRODUCT15("Product15"),
    PRODUCT10("Product10");
    
    private final String code;
    
    private ProductName(String code) {
        this.code = code;
    }
    
    public String getCode() {
        return code;
    }
}
