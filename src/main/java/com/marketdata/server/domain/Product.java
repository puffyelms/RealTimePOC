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
    private String trendM1;
    private long priceM1TS;
    private String priceM2;
    private String trendM2;
    private long priceM2TS;
    private String priceM3;
    private String trendM3;
    private long priceM3TS;
    private String priceM4;
    private String trendM4;
    private long priceM4TS;
        
    public Product(Integer id, String coupon, String priceM1, String priceM2, String priceM3, String priceM4) {
        long timestamp =  new Date().getTime();
        this.id = id;
        this.coupon = coupon;
        this.priceM1 = priceM1;
        this.priceM2 = priceM2;
        this.priceM3 = priceM3;
        this.priceM4 = priceM4;
        this.priceM1TS = timestamp;
        this.priceM2TS = timestamp;
        this.priceM3TS = timestamp;
        this.priceM4TS = timestamp;    
        this.trendM1 = "same";
        this.trendM2 = "same";
        this.trendM3 = "same";
        this.trendM4 = "same";
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
        setTrendM1( detectTrend(this.priceM1, priceM1));
        this.priceM1 = priceM1;
        this.priceM1TS = new Date().getTime();
    }

    public String getPriceM2() {
        return priceM2;
    }

    public void setPriceM2(String priceM2) {
        setTrendM2( detectTrend(this.priceM2, priceM2));
        this.priceM2 = priceM2;
        this.priceM2TS = new Date().getTime();
    }
    
    public String getPriceM3() {
        return priceM3;
    }

    public void setPriceM3(String priceM3) {
        setTrendM3( detectTrend(this.priceM3, priceM3));
        this.priceM3 = priceM3;
        this.priceM3TS = new Date().getTime();
    }

    public String getPriceM4() {
        return priceM4;
    }

    public void setPriceM4(String priceM4) {
        setTrendM4( detectTrend(this.priceM4, priceM4));
        this.priceM4 = priceM4;
        this.priceM4TS = new Date().getTime();
    }

    public long getPriceM1TS() {
        return priceM1TS;
    }

    public void setPriceM1TS(long priceM1TS) {
        this.priceM1TS = priceM1TS;
    }

    public long getPriceM2TS() {
        return priceM2TS;
    }

    public void setPriceM2TS(long priceM2TS) {
        this.priceM2TS = priceM2TS;
    }

    public long getPriceM3TS() {
        return priceM3TS;
    }

    public void setPriceM3TS(long priceM3TS) {
        this.priceM3TS = priceM3TS;
    }

    public long getPriceM4TS() {
        return priceM4TS;
    }

    public void setPriceM4TS(long priceM4TS) {
        this.priceM4TS = priceM4TS;
    }

    public String getTrendM2() {
        return trendM2;
    }

    public void setTrendM2(String trendM2) {
        this.trendM2 = trendM2;
    }

    public String getTrendM1() {
        return trendM1;
    }

    public void setTrendM1(String trendM1) {
        this.trendM1 = trendM1;
    }

    public String getTrendM3() {
        return trendM3;
    }

    public void setTrendM3(String trendM3) {
        this.trendM3 = trendM3;
    }

    public String getTrendM4() {
        return trendM4;
    }

    public void setTrendM4(String trendM4) {
        this.trendM4 = trendM4;
    }

    @Override
    public String toString() {
        return "Product{" + "id=" + id + ", coupon=" + coupon + ", priceM1=" + priceM1 + ", trendM1=" + trendM1 + ", priceM2=" + priceM2 + ", trendM2=" + trendM2 + ", priceM3=" + priceM3 + ", trendM3=" + trendM3 + ", priceM4=" + priceM4 + ", trendM4=" + trendM4 + '}';
    }

    /**
     * Returns a string representing the trend of the existing vs new price.  (same, up, down)
     * 
     * @param existingPrice
     * @param newPrice
     * @return trend string
     */
    private String detectTrend(String existingPrice, String newPrice) {
        String trend = "same";
        
        if (newPrice != null && newPrice.isEmpty() == false && existingPrice != null && existingPrice.isEmpty() == false ) {
            Double existingPriceD = new Double(existingPrice);
            Double newPriceD = new Double(newPrice);
            if (newPriceD > existingPriceD) {
                trend = "up";
            } else if (newPriceD < existingPriceD) {
                trend = "down";
            } else {
                trend = "same";
            }
        }
        return trend;
    }
 
}
