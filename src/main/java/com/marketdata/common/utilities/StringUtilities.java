package com.marketdata.common.utilities;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class StringUtilities {

    public static List<String> parseCommaDelimitedString(String list) {
        if (list == null || list.isEmpty()) {
            return new ArrayList<>();
        } else {
            return Arrays.asList(list.split(","));
        }
    }

    public static String convertListToCommaString( Collection<String> list ){

        String stringList = "";
        for (String item : list) {
            stringList += item + ",";
        }
        if (stringList.length() > 0) {
            stringList = stringList.replaceAll(",$", "");// remove the trailing comma
        }

        return stringList;
    }

}
