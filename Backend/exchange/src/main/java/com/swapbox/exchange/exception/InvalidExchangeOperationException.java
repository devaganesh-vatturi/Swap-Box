package com.swapbox.exchange.exception;

public class InvalidExchangeOperationException extends RuntimeException {
    public InvalidExchangeOperationException(String message) {
        super(message);
    }
}