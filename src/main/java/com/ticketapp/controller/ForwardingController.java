package com.ticketapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardingController {

    // Match all non-API requests (e.g., /welcome, /login) and forward them to index.html
    // Let Angular handle the routing
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        // Forward to home page so that frontend routing is preserved
        return "forward:/";
    }
}
