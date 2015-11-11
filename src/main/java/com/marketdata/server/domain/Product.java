/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.server.domain;

import java.io.Serializable;
import java.util.Date;

/**
 *
 * @author timge_000
 */

public class Product implements Serializable {

    private Integer id;
    private String coupon;
    private String priceM1;
    private String priceM2;
    private String priceM3;
    private String priceM4;
        
    public Product(Integer id, String coupon, String priceM1, String priceM2, String priceM3, String priceM4) {
        long timestamp =  new Date().getTime();
        this.id = id;
        this.coupon = coupon;
        this.priceM1 = priceM1;
        this.priceM2 = priceM2;
        this.priceM3 = priceM3;
        this.priceM4 = priceM4;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCoupon() {
        return coupon;
    }

    public void setCoupon(String coupon) {
        this.coupon = coupon;
    }

    public String getPriceM1() {
        return priceM1;
    }

    public void setPriceM1(String priceM1) {
        this.priceM1 = priceM1;
    }

    public String getPriceM2() {
        return priceM2;
    }

    public void setPriceM2(String priceM2) {
        this.priceM2 = priceM2;
    }
    
    public String getPriceM3() {
        return priceM3;
    }

    public void setPriceM3(String priceM3) {
        this.priceM3 = priceM3;
    }

    public String getPriceM4() {
        return priceM4;
    }

    public void setPriceM4(String priceM4) {
        this.priceM4 = priceM4;
    }

    @Override
    public String toString() {
        return "Product{" + "id=" + id + ", coupon=" + coupon + ", priceM1=" + priceM1 + ", priceM2=" + priceM2 + ", priceM3=" + priceM3 + ", priceM4=" + priceM4 + "}";
    }

}
