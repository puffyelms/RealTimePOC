/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.server.service;

import com.marketdata.common.enums.ProductName;
import com.marketdata.server.domain.Product;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author timge_000
 */
public class PricingDataSingleton {

    private PricingDataSingleton() {
    }

    /**
     * Ensures that only one instance is retrieved.
     */
    private static class SingletonHelper {

        private static final PricingDataSingleton INSTANCE = new PricingDataSingleton();
    }

    public static PricingDataSingleton getInstance() {
        return SingletonHelper.INSTANCE;
    }

    private final static List<Product> product30 = new ArrayList<>();
    private final static List<Product> product15 = new ArrayList<>();
    private final static List<Product> product10 = new ArrayList<>();

    private final static Map<String, List<Product>> productMap = new LinkedHashMap<>();

    static {

        product30.add(new Product(0, "2.5", "100", "101", "102", "103"));
        product30.add(new Product(1, "3.0", "101", "102", "103", "104"));
        product30.add(new Product(2, "3.5", "102", "103", "104", "105"));
        product30.add(new Product(3, "4.0", "103", "104", "105", "106"));
        product30.add(new Product(4, "4.5", "104", "105", "106", "107"));
        product30.add(new Product(5, "5.0", "105", "106", "107", "108"));
        product30.add(new Product(6, "5.5", "106", "107", "108", "109"));

        product15.add(new Product(0, "2.5", "100", "101", "102", "103"));
        product15.add(new Product(1, "3.0", "101", "102", "103", "104"));
        product15.add(new Product(2, "3.5", "102", "103", "104", "105"));
        product15.add(new Product(3, "4.0", "103", "104", "105", "106"));
        product15.add(new Product(4, "4.5", "104", "105", "106", "107"));
        product15.add(new Product(5, "5.0", "105", "106", "107", "108"));
        product15.add(new Product(6, "5.5", "106", "107", "108", "109"));

        product10.add(new Product(0, "2.5", "100", "101", "102", "103"));
        product10.add(new Product(1, "3.0", "101", "102", "103", "104"));
        product10.add(new Product(2, "3.5", "102", "103", "104", "105"));
        product10.add(new Product(3, "4.0", "103", "104", "105", "106"));
        product10.add(new Product(4, "4.5", "104", "105", "106", "107"));
        product10.add(new Product(5, "5.0", "105", "106", "107", "108"));
        product10.add(new Product(6, "5.5", "106", "107", "108", "109"));

        productMap.put(ProductName.PRODUCT30.getCode(), product30);
        productMap.put(ProductName.PRODUCT15.getCode(), product15);
        productMap.put(ProductName.PRODUCT10.getCode(), product10);

    }

    public List<Product> getProduct(String productName) {
        return productMap.get(productName);
    }

    public Product getProductLine(String productName, String coupon) {
        List<Product> productLines = productMap.get(productName);
        for (Product product : productLines) {
            if (product.getCoupon().equals(coupon)) {
                return product;
            }
        }
        throw new IllegalArgumentException("Combination of productName and coupon doesn't exist");
    }

    public void updateProduct(String productName, Product newProduct) {

        String coupon = newProduct.getCoupon();

        List<Product> productList = productMap.get(productName);
        for (Product product : productList) {

            if (product.getCoupon().equals(coupon)) {

                if (newProduct.getPriceM1().isEmpty() == false) {
                    product.setPriceM1(newProduct.getPriceM1());
                } else {
                    product.setTrendM1("same");
                }

                if (newProduct.getPriceM2().isEmpty() == false) {
                    product.setPriceM2(newProduct.getPriceM2());
                } else {
                    product.setTrendM2("same");
                }

                if (newProduct.getPriceM3().isEmpty() == false) {
                    product.setPriceM3(newProduct.getPriceM3());
                } else {
                    product.setTrendM3("same");
                }

                if (newProduct.getPriceM4().isEmpty() == false) {
                    product.setPriceM4(newProduct.getPriceM4());
                } else {
                    product.setTrendM4("same");
                }

            } else {
//                product.setTrendM1("same");
//                product.setTrendM2("same");
//                product.setTrendM3("same");
//                product.setTrendM4("same");
            }
        }
    }

}
