package be.stijnhooft.portal.core.exceptions;

public class HttpException extends RuntimeException {

    public HttpException(String message, Throwable cause) {
        super(message, cause);
    }

}
