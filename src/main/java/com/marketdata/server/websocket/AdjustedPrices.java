package com.marketdata.server.websocket;

/**
 * Created by timge on 10/19/2015.
 */
public class AdjustedPrices
{
    private String month1;

    private String month2;

    private String month3;

    private String month4;

    private String coupon;

    public AdjustedPrices(String coupon, String month1, String month2, String month3, String month4) {
        this.coupon = coupon;
        this.month1 = month1;
        this.month2 = month2;
        this.month3 = month3;
        this.month4 = month4;
    }

    public String getMonth4 ()
    {
        return month4;
    }

    public void setMonth4 (String month4)
    {
        this.month4 = month4;
    }

    public String getMonth1 ()
    {
        return month1;
    }

    public void setMonth1 (String month1)
    {
        this.month1 = month1;
    }

    public String getMonth3 ()
    {
        return month3;
    }

    public void setMonth3 (String month3)
    {
        this.month3 = month3;
    }

    public String getMonth2 ()
    {
        return month2;
    }

    public void setMonth2 (String month2)
    {
        this.month2 = month2;
    }

    public String getCoupon ()
    {
        return coupon;
    }

    public void setCoupon (String coupon)
    {
        this.coupon = coupon;
    }

    @Override
    public String toString()
    {
        return "ClassPojo [month4 = "+month4+", month1 = "+month1+", month3 = "+month3+", month2 = "+month2+", coupon = "+coupon+"]";
    }
}
