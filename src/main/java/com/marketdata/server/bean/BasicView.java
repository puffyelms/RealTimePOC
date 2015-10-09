/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.server.bean;

import com.marketdata.common.enums.ProductName;
import com.marketdata.common.utilities.StringUtilities;
import com.marketdata.server.domain.ProductSection;
import com.marketdata.server.service.PricingDataSingleton;
import org.primefaces.context.RequestContext;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author timge_000
 */
@ManagedBean(name = "dtBasicView")
@ViewScoped
public class BasicView implements Serializable {

    private final Map<String,ProductSection> productSections;

    private final static String UI_TABLE_ID_SUFFIX = "myForm:myDataTable_";


    public BasicView() {
        this.productSections = new LinkedHashMap<String, ProductSection>();
    }

//    @ManagedProperty("#{productService}")
//    private ProductService service;
    @PostConstruct
    public void init() {

        String products30Name = ProductName.PRODUCT30.getCode();
        String products15Name = ProductName.PRODUCT15.getCode();
        String products10Name = ProductName.PRODUCT10.getCode();

        PricingDataSingleton pricingData = PricingDataSingleton.getInstance();

        productSections.put(products30Name, new ProductSection(pricingData.getProduct(ProductName.PRODUCT30.getCode()), products30Name));
        productSections.put(products15Name, new ProductSection(pricingData.getProduct(ProductName.PRODUCT15.getCode()), products15Name));
        productSections.put(products10Name, new ProductSection(pricingData.getProduct(ProductName.PRODUCT10.getCode()), products10Name));
    }

    public List<ProductSection> getProductSectionsList() {
        return new ArrayList<>(productSections.values());
    }

    public void refreshProductGrids() {

        System.out.println("In updateAllThatChanged");

        Map < String, String > params = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();
        String updateTestGrids = params.get("updateTheseGrids");

        List<String> tablesToUpdate = new ArrayList<>();
        List<String> productNames = StringUtilities.parseCommaDelimitedString(updateTestGrids);

        for (String productName : productNames) {
            tablesToUpdate.add(UI_TABLE_ID_SUFFIX+productName);
        }

        System.out.println("tablesToUpdate" + tablesToUpdate);

        RequestContext.getCurrentInstance().update(tablesToUpdate);

    }

}
