/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.marketdata.server.bean;

import com.marketdata.server.websocket.dataServer.WebSocketDataServer;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import java.io.Serializable;
import java.util.List;

/**
 *
 * @author timge_000
 */
@ManagedBean
@ViewScoped
public class NotificationManagedBean implements Serializable{

  /**
   * Creates a new instance of NotificationManagedBean
   */
  public NotificationManagedBean() {
  }
  
 
  public List getNotificationReceiverList() {
    return WebSocketDataServer.getSessions();
  }

  
  
}
