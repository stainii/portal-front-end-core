package be.stijnhooft.portal.core.services;

import be.stijnhooft.portal.core.exceptions.HttpException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class HttpService {

    public boolean doesUrlExist(String url) {
        HttpURLConnection connection = null;
        try {
             connection = (HttpURLConnection) new URL(url).openConnection();
             connection.setRequestMethod("HEAD");
             return connection.getResponseCode() == HttpURLConnection.HTTP_OK;
        } catch (IOException e) {
            throw new HttpException("Could not check the existence of " + url, e);
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

}
