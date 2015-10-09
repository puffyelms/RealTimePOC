/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.server.service;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author timge_000
 */
public class HeartBeatSingleton {

    private HeartBeatSingleton() {
    }

    /**
     * Ensures that only one instance is retrieved.
     */
    private static class SingletonHelper {

        private static final HeartBeatSingleton INSTANCE = new HeartBeatSingleton();
    }

    public static HeartBeatSingleton getInstance() {
        return SingletonHelper.INSTANCE;
    }

    private final static List<String> productsToUpdate = new ArrayList<>();

    static {
        
        

    }

  

}
